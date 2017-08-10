import * as types from '../constants/types';
import TaskShell from '../lib/TaskShell';

function receiveTasks(tasksState, tasks) {
  return tasksState.concat(tasks);
}

function addTask(tasksState, text) {
  return tasksState.concat({
    text: text,
    isDone: false,
    isLoading: true,
  });
}

function setTaskId(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getLoadingTaskIndex(newTaskState);
  newTaskState[i].id = id;
  delete newTaskState[i].isLoading;
  return newTaskState;
}

function removeTask(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState.splice(i, 1);
  return newTaskState;
}

function setTaskAsDone(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState[i].isDone = true;
  return newTaskState;
}

export default function (tasksState = [], action) {
  switch (action.type) {
    case types.RECEIVE_TASKS: return receiveTasks(tasksState, action.tasks);
    case types.ADD_TASK: return addTask(tasksState, action.text);
    case types.ADD_TASK_SUCCEED: return setTaskId(tasksState, action.id);
    case types.DELETE_TASK:  return removeTask(tasksState, action.id);
    case types.SET_TASK_DONE: return setTaskAsDone(tasksState, action.id);

    /*
    * @TODO
    *
    * case types.ADD_TASK_FAILED:
    * case types.DELETE_TASK_FAILED:
    * case types.SET_TASK_DONE_FAILED:
    */

    default: return tasksState;
  }
}
