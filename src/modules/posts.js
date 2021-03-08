import * as postsAPI from '../api/posts';
import { handleAsyncAcitons, handleAsyncAcitonsById, reducerUtils, createPromiseSaga, createPromiseSagaById } from '../lib/asyncUtils';
import { takeEvery, getContext, select } from "redux-saga/effects";

const GET_POSTS = 'post/GET_POSTS';
const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS';
const GET_POSTS_FAILURE = 'post/GET_POSTS_FAILURE';

const GET_POST = 'post/GET_POST';
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS';
const GET_POST_FAILURE = 'post/GET_POST_FAILURE';

const GO_TO_HOME = 'post/GO_TO_HOME';
const CLEAR_POST = 'post/CLEAR_POST';
const PRINT_STATE = 'post/PRINT_STATE';

// thunk
// export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
// export const getPost = createPromiseThunkById(GET_POST, postsAPI.getPostById);

export const clearPost = () => ({ type: CLEAR_POST });

export const getPosts = () => ({ type: GET_POSTS });
export const getPost = (id) => ({
  type: GET_POST,
  payload: id,
  meta: id,
});
export const goToHome = () => ({ type: GO_TO_HOME });
export const printState = () => ({ type: PRINT_STATE });


const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts);
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById);
function* goToHomeSaga() {
  const history = yield getContext('history');
  history.push('/');
}
function* printStateSaga() {
  const state = yield select(state => state.posts);
  console.log(state);
}

export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga);
  yield takeEvery(GET_POST, getPostSaga);
  yield takeEvery(GO_TO_HOME, goToHomeSaga);
  yield takeEvery(PRINT_STATE, printStateSaga);
}

// thunk
// export const goToHome = () => (dispatch, getState, {history}) => {
//   history.push('/');
// };

const initialState = {
  posts: reducerUtils.initial(),
  post: {}
};

const getPostsReducer = handleAsyncAcitons(GET_POSTS, 'posts', true);
const getPostReducer = handleAsyncAcitonsById(GET_POST, 'post', true);

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