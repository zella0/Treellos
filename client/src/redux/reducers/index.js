import { combineReducers } from 'redux';
import treeReducer from './treeReducer';
import branchReducer from './branchReducer';
import leafReducer from './leafReducer';

export default combineReducers({
  trees: treeReducer,
  branches: branchReducer,
  leafs: leafReducer
})