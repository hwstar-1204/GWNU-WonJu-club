// Data.js


const postList = [
  {
    "no": 1,
    "title": "첫번째 게시글입니다.",
    "content": "첫번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 6,
    "author": "작성자1",
    "recommendCount": 0 // 추가: 추천 수
  },
  {
    "no": 2,
    "title": "두번째 게시글입니다.",
    "content": "두번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 2,
    "author": "작성자2",
    "recommendCount": 0 // 추가: 추천 수
  },
  {
    "no": 3,
    "title": "세번째 게시글입니다.",
    "content": "세번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 1,
    "author": "작성자2",
    "recommendCount": 0 // 추가: 추천 수
  },
  {
    "no": 4,
    "title": "네번째 게시글입니다.",
    "content": "네번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 3,
    "author": "작성자2",
    "recommendCount": 0 // 추가: 추천 수
  },
  {
    "no": 5,
    "title": "다섯번째 게시글입니다.",
    "content": "다섯번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 8,
    "author": "작성자2",
    "recommendCount": 0 // 추가: 추천 수
  }
];

const getPostByNo = no => {
  const array = postList.filter(x => x.no == no);
  if (array.length == 1) {
    return array[0];
  }
  return null;
}

const increaseRecommendCount = (no) => {
  const post = postList.find(item => item.no === no);
  if (post) {
    post.recommendCount += 1;
  }
}

export {
  postList,
  getPostByNo,
  increaseRecommendCount
};


export async function deletePost(postId) {
  // postId를 사용하여 게시물을 삭제하는 로직을 구현합니다.
  // 예를 들어:
  // 서버 API를 호출하여 해당 postId를 가진 게시물을 삭제합니다.
  try {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    console.log(`Post with ID ${postId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }
}
