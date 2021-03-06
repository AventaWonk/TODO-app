export default class TaskShell {

  static getTaskIndexById(taskArray, id) {
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].id == id) {
        return i;
      }
    }
  }

  static getLoadingTaskIndex(taskArray) {
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].isLoading) {
        return i;
      }
    }
  }

  static doWithTaskById(taskArray, id, callback) {
    let newTaskArray = [...taskArray];
    for (let i = 0; i < array.length; i++) {
      if (newTaskArray[i].id == id) {
        newTaskArray[i] = callback(newTaskArray[i]);
        break
      }
    }
    return newTaskArray;
  }

  static deleteFailedTask(taskArray) {
    let newTaskArray = [...taskArray];
    for (let i = 0; i < newTaskArray.length; i++) {
      if (newTaskArray[i].isLoading || newTaskArray[i].isDelivering) { // Task.isDelivering @TODO
        newTaskArray.splice(i, 1)
        return newTaskArray;
      }
    }
    return newTaskArray;
  }
}
