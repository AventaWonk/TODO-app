import fetch from 'isomorphic-fetch';
import * as types from '../constants/types';

export function fetchTasks() {
  return (dispatch, getState) => {
    dispatch({
      type: types.REQUEST_TASKS,
    });

    return fetch(`http://localhost:8000/task/get`)
      .then(
        response => response.json(),
        error => {
          dispatch({
            type: types.REQUEST_FAILD
          });
        }
      )
      .then(data => data.response)
      .then(tasks => {
        dispatch({
          type: types.LOADING_SUCCEED,
        });
        dispatch({
          type: types.RECEIVE_TASKS,
          tasks,
        });
      }
    );
  };
}

export function addTask(text) {
  return (dispatch, getState) => {
    dispatch({
      type: types.ADD_TASK,
      text
    });

    return fetch(`http://localhost:8000/task/add/${text}`)
      .then(
        response => response.json(),
        error => {
          dispatch({
            type: types.ADD_TASK_FAILED
          });
        }
      )
      .then(data => data.response)
      .then(id => {
        dispatch({
          type: types.ADD_TASK_SUCCEED,
          id,
        });
      }
    );
  };
}

export function deleteTask(id) {
  return (dispatch, getState) => {
    dispatch({
      type: types.DELETE_TASK,
      id
    });

    return fetch(`http://localhost:8000/task/delete/${id}`)
      .then(
        response => response.json(),
        error => {
          dispatch({
            type: types.DELETE_TASK_FAILED,
            id
          });
        }
      )
      .then(code => {
        if (code == 1) {
          return types.DELETE_TASK_SUCCEED;
        } else {
          return types.DELETE_TASK_FAILED;
        }
      })
      .then(type => {
        dispatch({
          type: type,
          id
        });
      });
  };
}

export function setTaskAsDone(id) {
  return (dispatch, getState) => {
    dispatch({
      type: types.SET_TASK_DONE,
      id
    });

    return fetch(`http://localhost:8000/task/setdone/${id}`)
      .then(
        response => response.json(),
        error => {
          dispatch({
            type: types.SET_TASK_DONE_FAILED
          });
        }
      )
  };
}

export function editTask(id) {
  return {
    type: types.EDIT_TASK,
    id
  };
}

export function editTaskCancel(id) {
  return {
    type: types.EDIT_TASK_CANCEL,
    id
  };
}

export function changeTaskText(id, newText) {
  return (dispatch, getState) => {
    dispatch({
      type: types.CHANGE_TASK_TEXT,
      id,
      newText
    });

    return fetch(`http://localhost:8000/task/update/${id}/${newText}`)
      .then(
        response => response.json(),
        error => {
          dispatch({
            type: types.CHANGE_TASK_TEXT_FAILED
          });
        }
      )
  };
}
