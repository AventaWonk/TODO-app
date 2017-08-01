import fetch from 'isomorphic-fetch';
import 'es6-promise/auto';

export function _getTasks(setTasks) {
  fetch('http://localhost:8000/task/get')
    .then(response => response.json())
    .then(responseData => {
      if (responseData.response) {
         setTasks(responseData.response);
      } else {
        alert('Fatal server error');
      }
    })
    .catch(error => {
        alert('The server is temporarily unavailable ');
    });
}

export function _addTask(text, onDone, onFailed) {
  fetch(`http://localhost:8000/task/add/${text}`)
    .then(response => response.json())
    .then(result => {
      if (!result.response) {
        alert('Fatal server error');
      }
      return result.response
    })
    .then(addedTaskId => onAddingDone(addedTaskId))
    .catch(error => {
      onFailed();
      alert('The server is temporarily unavailable ');
    });
}

export function _deleteTask(id, onFailed) {
    fetch(`http://localhost:8000/task/delete/${id}`)
      .then(response => response.json())
      .then(result => {
        if (!result.response) {
          alert('Fatal server error');
          onFailed();
        }
      })
      .catch(error => {
        onFailed();
        alert('The server is temporarily unavailable ');
      });
  }

export function _setDoneTask(id, onFailed) {
    fetch(`http://localhost:8000/task/setdone/${id}`)
      .then(response => response.json())
      .then(result => {
        if (!result.response) {
          alert('Fatal server error');
          onFailed();
        }
      })
      .catch(error => {
        onFailed();
        alert('The server is temporarily unavailable ');
      });
  }
