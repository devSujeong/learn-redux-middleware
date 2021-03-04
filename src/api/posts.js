const sleep = n => new Promise((resolve) => setTimeout(resolve, n));

const posts = [
  {
    id: 1,
    title: 'sjsjsjsjs',
    body: 'a;a;a;a;a;a;aa;a;a;a;'
  },
  {
    id: 2,
    title: 'example',
    body: 'redux thunk'
  },
  {
    id: 3,
    title: 'redux saga써보고 싶은데',
    body: '잘 이해할 수 있을까'
  },
  {
    id: 4,
    title: '재미있는 놀이',
    body: '벨로퍼트 짱'
  },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
}

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find(post => post.id === id);
}