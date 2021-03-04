import * as postsAPI from '../api/posts';

const GET_POSTS_REQUEST = 'post/GET_POSTS_REQUEST';
const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS';
const GET_POSTS_FAILURE = 'post/GET_POSTS_FAILURE';

const GET_POST_REQUEST = 'post/GET_POST_REQUEST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';

export const getPosts = () => async (dispatch) => {
  // 요청이 시작됨
  dispatch({type: GET_POSTS_REQUEST});

  // api호출
  try {
    const posts = await postsAPI.getPosts();

    // 성공
    dispatch({type: GET_POSTS_SUCCESS, posts});
  } catch(e) {
    // 실패
    dispatch({type: GET_POSTS_FAILURE, error: e});
  }
}

export const getPost = (id) => async (dispatch) => {
  // 요청이 시작됨
  dispatch({type: GET_POST_REQUEST});

  // api호출
  try {
    const post = await postsAPI.getPost(id);

    // 성공
    dispatch({type: GET_POST_SUCCESS, post});
  } catch(e) {
    // 실패
    dispatch({type: GET_POST_FAILURE, error: e});
  }
}