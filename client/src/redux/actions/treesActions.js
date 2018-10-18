import {
  FETCH_TREES,
  ADD_TREE,
  REMOVE_TREE
} from './types';
import axios from 'axios';

export const fetchTrees = () => dispatch => {
  axios.get('http://localhost:8001/dashboard')
    .then((response) => {
      dispatch({
        type: FETCH_TREES,
        payload: response.data
      })
    })
}

export const addTree = (postBody) => dispatch => {
  axios.post('http://localhost:8001/dashboard/add', postBody)
    .then((response) => {
      let result = {
        id: response.data[0].tree_pid,
        postBody
      }
      dispatch({
        type: ADD_TREE,
        payload: result
      })
    })
}

export const removeTree = (tree_id) => dispatch => {
  axios.get(`http://localhost:8001/dashboard/${tree_id}/remove`)
    .then(() => {
      dispatch({
        type: REMOVE_TREE,
        payload: tree_id
      })
    })
}