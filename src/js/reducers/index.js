import { combineReducers } from 'redux';
import task from './task-reducer';
import global from './global-reducer';

const appReducer = combineReducers({
  task,
  global
});

export default appReducer;
