import {
  FETCH_LEAFS,
  ADD_LEAF,
  REMOVE_LEAF
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEAFS:
      return action.payload;

    case ADD_LEAF:
      return [...state, ...action.payload];

    case REMOVE_LEAF:
    return state.filter(ele => ele.leaf_id !== action.payload);

    default:
      return state;
  }
}