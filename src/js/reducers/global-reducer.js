import * as types from '../constants/types';

const INITIAL_STATE = {
  isLoading: true
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case types.LOADING_SUCCEED:
      return Object.assign(state, {
          isLoading: false
      });
    default:
      return state;
  }
}
