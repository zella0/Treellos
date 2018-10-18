import {
  FETCH_BRANCHES,
  FETCH_BRANCH,
  ADD_BRANCH,
  REMOVE_BRANCH
} from './types';
import axios from 'axios';

export const fetchBranches = () => dispatch => {
  axios.get(`http://localhost:8001/dashboard/branches`)
    .then((response) => {
      dispatch({
        type: FETCH_BRANCHES,
        payload: response.data
      })
    })
}

export const fetchBranch = (tree_id) => dispatch => {
  axios.get(`http://localhost:8001/dashboard/${tree_id}`)
    .then((response) => {
      dispatch({
        type: FETCH_BRANCH,
        payload: response.data
      })
    })
}

export const addBranch = (branch_id, tree_id) => dispatch => {
  axios.post(`http://localhost:8001/dashboard/branch/add/${branch_id}/${tree_id}`, {
    tree_pid: tree_id,
    branch_pid: branch_id
  }).then(() => {
    return axios.get(`http://localhost:8001/dashboard/${tree_id}`)
  }).then((response) => {
    dispatch({
      type: ADD_BRANCH,
      payload: response.data
    })
  });
}

export const removeBranch = (branch_id, tree_id) => dispatch => {
  axios.get(`http://localhost:8001/dashboard/branch/remove/${branch_id}`)
  .then(() => {
    return axios.get(`http://localhost:8001/dashboard/${tree_id}`)
  }).then((response) => {
    dispatch({
      type: REMOVE_BRANCH,
      payload: response.data
    })
  });
}