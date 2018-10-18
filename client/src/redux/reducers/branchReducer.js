import {
  FETCH_BRANCHES,
  FETCH_BRANCH,
  ADD_BRANCH,
  REMOVE_BRANCH
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BRANCHES:
      return action.payload;

    case FETCH_BRANCH:
      return  action.payload;

    case ADD_BRANCH:
      return action.payload

    case REMOVE_BRANCH:
      return action.payload;

    default:
      return state;
  }
}