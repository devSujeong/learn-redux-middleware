import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Post from '../components/Post';
import { reducerUtils } from '../lib/asyncUtils';
import { getPost, goToHome, printState } from '../modules/posts';

function PostContainer({ postId }) {
  const {data, loading, error} = useSelector(
    state => state.posts.post[postId] || reducerUtils.initial()
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(data) return;
    dispatch(getPost(postId));
  }, [postId, dispatch, data]);

  if(loading && !data) return <div>loading...</div>
  if(error) return <div>error!!!!!</div>
  if(!data) return null;

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>go to home</button>
      <button onClick={() => dispatch(printState())}>상태 출력</button>
      <Post post={data} />
    </>
  );
}

export default PostContainer