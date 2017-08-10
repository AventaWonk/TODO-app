import { combineReducers } from 'redux';
import task from './task-reducer';

const appReducer = combineReducers({
  task
});

export default appReducer;
