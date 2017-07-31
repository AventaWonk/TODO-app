import fetch from 'isomorphic-fetch';
import 'es6-promise/auto';

export function _getTasks() {
  fetch('http://localhost:8000/task/get')
    .then(response => response.json())
    .then(responseData => {
      if (responseData.response) {
        this.setState({
          tasks: responseData.response,
        });
      } else {
        alert('Fatal server error');
      }
    })
    .catch(
      // alert('The server is temporarily unavailable');
    );
}

export function _addTask(text, onAddingDone) {
  fetch(`http://localhost:8000/task/add/${text}`)
    .then(response => response.json())
    .then(result => {
      if (!result.response) {
        alert('Fatal server error');
      }
      return result.response
    })
    .then(addedTaskId => onAddingDone(addedTaskId));
}

export function _deleteTask(id) {
    fetch(`http://localhost:8000/task/delete/${id}`)
      .then(response => response.json())
      .then(result => {
        if (!result.response) {
          //TODO
        }
      });
  }

export function _setDoneTask(id) {
    fetch(`http://localhost:8000/task/setdone/${id}`)
      .then(response => response.json())
      .then(result => {
        if (!result.response) {
          //TODO
        }
      });
  }
