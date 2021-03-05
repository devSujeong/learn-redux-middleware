import * as postsAPI from '../api/posts';
import { createPromiseThunk, handleAsyncAcitons, reducerUtils } from '../lib/asyncUtils';

const GET_POSTS = 'post/GET_POSTS';
const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS';
const GET_POSTS_FAILURE = 'post/GET_POSTS_FAILURE';

const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';

const CLEAR_POST = 'post/CLEAR_POST';

export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);
export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
};

const getPostsReducer = handleAsyncAcitons(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncAcitons(GET_POST, 'post');
export default function posts(state = initialState, action) {
  switch(action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_FAILURE:
      return getPostsReducer(state, action)
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_FAILURE:
      return getPostReducer(state, action)
    case CLEAR_POST:
      return {
        ...state,
        post: reducerUtils.initial()
      }
    default:
      return state;
  }
}