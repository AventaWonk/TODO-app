<?php

namespace AppBundle\Controller;

use AppBundle\Entity\Task;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Doctrine\ORM\EntityManagerInterface;

class TaskController extends Controller
{
    /**
     * @Route("task/get", name="homepage")
     */
    public function getAction()
    {
        $tasks = $this->getDoctrine()
          ->getRepository(Task::class)
          ->findAll();

        $callback = function($dateTime) {
            return $dateTime->format(\DateTime::ISO8601);
        };

        $normalizer = new ObjectNormalizer();
        $normalizer->setCallbacks(['date' => $callback]);

        $serializer = new Serializer(
          [$normalizer],
          [new JsonEncoder()]
        );

        $jsonTasks = $serializer->serialize(
          ['response' => $tasks],
          'json'
        );

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');
        $response->setContent($jsonTasks);

        return $response;
    }

    /**
     * @Route("task/add/{text}")
     */
    public function addAction($text)
    {
        $em = $this->getDoctrine()->getManager();

        $task = new Task();
        $task->setText($text);
        $task->setIsDone(false);
        $task->setDate( new \DateTime());

        $em->persist($task);
        $em->flush();

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        $response->setContent(
          json_encode([
            'response' => $task->getId(),
          ])
        );
        return $response;
    }

    /**
     * @Route("task/update/{id}/{text}")
     */
    public function updateAction($id, $text)
    {
        $em = $this->getDoctrine()
          ->getManager();
        $task = $em->getRepository(Task::class)
          ->findOneById($id);

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

          if ($task) {
            $task->setText($text);

            $em->persist($task);
            $em->flush();


            $response->setContent([
              'response' => 1,
            ]);
            return $response;
          }

        $response->setContent('error');
        return $response;
    }

    /**
     * @Route("task/delete/{id}")
     */
    public function deleteAction($id)
    {
        $em = $this->getDoctrine()
          ->getManager();
        $task = $em->getRepository(Task::class)
          ->findOneById($id);

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        if ($task) {
          $em->remove($task);
          $em->flush();

          $response->setContent([
            'response' => 1,
          ]);
          return $response;
        }

        $response->setContent('error');
        return $response;
    }

    /**
     * @Route("task/setdone/{id}")
     */
    public function setDoneAction($id)
    {
        $em = $this->getDoctrine()
          ->getManager();
        $task = $em->getRepository(Task::class)
          ->findOneById($id);

        $response = new Response();
        $response->headers->set('Content-Type', 'application/json');
        $response->headers->set('Access-Control-Allow-Origin', '*');

        if ($task) {
          $task->setIsDone(true);

          $em->persist($task);
          $em->flush();

          $response->setContent([
            'response' => 1,
          ]);
          return $response;
        }

        $response->setContent('error');
        return $response;
    }
}
