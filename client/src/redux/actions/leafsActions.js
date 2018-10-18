import {
  FETCH_LEAFS,
  ADD_LEAF,
  REMOVE_LEAF
} from './types';
import axios from 'axios';

export const fetchLeafs = () => dispatch => {
  axios.get(`http://localhost:8001/dashboard/leafs`)
    .then((response) => {
      dispatch({
        type: FETCH_LEAFS,
        payload: response.data
      })
    })
}

export const addLeaf = (postBody, branch_id) => dispatch => {
  axios.post(`http://localhost:8001/dashboard/leafs/add/${branch_id}`, {
    todoItem_content: postBody
})
    .then((response) => {
      dispatch({
        type: ADD_LEAF,
        payload: response.data
      })
    })
}

export const removeLeaf = (leaf_id) => dispatch => {
  axios.get(`http://localhost:8001/dashboard/leafs/remove/${leaf_id}`)
    .then(() => {
      dispatch({
        type: REMOVE_LEAF,
        payload: leaf_id
      })
    })
}
