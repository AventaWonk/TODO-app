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

function deleteTaskWithoutId(tasksState) {
  let newTaskState = [...tasksState];
  for (var i = 0; i < newTaskState.length; i++) {
    if (!newTaskState[i].id) {
      newTaskState.splice(i, 1);
      return newTaskState;
    }
  }
}

function markTaskAsRemoved(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState[i].isRemoved = true;
  return newTaskState;
}

function deleteMarkedTask(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState.splice(i, 1);
  return newTaskState;
}

function restoreMarkedTask(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  delete newTaskState[i].isRemoved;
  return newTaskState;
}

function setTaskAsDone(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState[i].isDone = true;
  return newTaskState;
}

function setTaskAsNotDone(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState[i].isDone = false;
  return newTaskState;
}

function editTask(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState[i].isChanging = true;
  return newTaskState;
}

function editTaskCancel(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  delete newTaskState[i].isChanging;
  return newTaskState;
}

function changeTaskText(tasksState, id, newText) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState[i].previousText = text;
  newTaskState[i].text = newText;
  delete newTaskState[i].isChanging;
  return newTaskState;
}

function deletePreviousTaskText(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  delete newTaskState[i].previousText;
  return newTaskState;
}

function restorePreviousTaskText(tasksState, id) {
  let newTaskState = [...tasksState];
  let i = TaskShell.getTaskIndexById(newTaskState, id);
  newTaskState[i].text = previousText;
  delete newTaskState[i].previousText;
  return newTaskState;
}

export default function (tasksState = [], action) {
  switch (action.type) {
    case types.RECEIVE_TASKS: return receiveTasks(tasksState, action.tasks);
    case types.ADD_TASK: return addTask(tasksState, action.text);
    case types.ADD_TASK_SUCCEED: return setTaskId(tasksState, action.id);
    case types.ADD_TASK_FAILED: return deleteTaskWithoutId(tasksState, action.id);
    case types.DELETE_TASK:  return markTaskAsRemoved(tasksState, action.id);
    case types.DELETE_TASK_SUCCEED:  return deleteMarkedTask(tasksState, action.id);
    case types.DELETE_TASK_FAILED:  return restoreMarkedTask(tasksState, action.id);
    case types.SET_TASK_DONE: return setTaskAsDone(tasksState, action.id);
    case types.SET_TASK_DONE_FAILED: return setTaskAsNotDone(tasksState, action.id);
    case types.EDIT_TASK: return editTask(tasksState, action.id);
    case types.EDIT_TASK_CANCEL: return editTaskCancel(tasksState, action.id);
    case types.CHANGE_TASK_TEXT: return changeTaskText(tasksState, action.id, action.newText);
    case types.CHANGE_TASK_TEXT_SUCCEED: return deletePreviousTaskText(tasksState, action.id);
    case types.CHANGE_TASK_TEXT_FAILED: return restorePreviousTaskText(tasksState, action.id);

    default: return tasksState;
  }
}
