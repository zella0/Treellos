import {
  FETCH_TREES,
  ADD_TREE,
  REMOVE_TREE
} from '../actions/types';

const initialState = [];

export default (state = initialState, action) => {
  switch(action.type){
    case FETCH_TREES:
    return action.payload;

    case ADD_TREE:
    let result = {
      id: action.payload.id,
      project_name: action.payload.postBody.project_name
    }
    console.log(result)
    return [...state, result];

    case REMOVE_TREE:
    return state.filter(ele => ele.id !== action.payload);

    default:
    return state;
  }
}