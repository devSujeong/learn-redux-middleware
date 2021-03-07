import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";

const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';
const INCREASE_ASYNC = 'counter/INCREASE_ASYNC';
const DECREASE_ASYNC = 'counter/DECREASE_ASYNC';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const increaseAsync = () => ({ type: INCREASE_ASYNC});
export const decreaseAsync = () => ({ type: DECREASE_ASYNC});

function* increaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(increase()); // 디스패치
}

function* decreaseSaga() {
  yield delay(1000); // 1초 기다림
  yield put(decrease()); // 디스패치
}

export function* counterSaga() {
  yield takeEvery(INCREASE_ASYNC, increaseSaga);
  yield takeLatest(DECREASE_ASYNC, decreaseSaga);
}

// thunk example
// export const increaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(increase());
//   }, 1000);
// }
// export const decreaseAsync = () => dispatch => {
//   setTimeout(() => {
//     dispatch(decrease());
//   }, 1000);
// }

const initialState = 0;

export default function counter(state = initialState, action) {
  switch(action.type) {
    case INCREASE:
      return state + 1;
    case DECREASE:
      return state - 1;
    default:
        return state;
  }
}