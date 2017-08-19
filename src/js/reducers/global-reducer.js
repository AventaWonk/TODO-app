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
    case types.LOADING_FAILED:
    return Object.assign(state, {
        isLoading: false,
        loadingFailed: true,
    });
      break;
    default:
      return state;
  }
}
