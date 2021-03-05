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
export const getPost = id => async (dispatch) => {
  dispatch({ type: GET_POST, meta: id });

  try {
    const payload = await postsAPI.getPostById(id);

    dispatch({ type: GET_POST_SUCCESS, payload, meta: id});
  } catch(e) {
    dispatch({ type: GET_POST_FAILURE, payload: e, meta: id, error: true });
  }
}
export const clearPost = () => ({ type: CLEAR_POST });

const initialState = {
  posts: reducerUtils.initial(),
  post: {}
};

const getPostsReducer = handleAsyncAcitons(GET_POSTS, 'posts', true);
const getPostReducer = (state, action) => {
  const id = action.meta;

  switch(action.type) {
    case GET_POST:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.loading(state.post[id] && state.post[id].data)
        }
      }
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.success(action.payload)
        }
      }
    case GET_POST_FAILURE:
      return {
        ...state,
        post: {
          ...state.post,
          [id]: reducerUtils.error(action.payload)
        }
      }
    default:
      return state
  }
};

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