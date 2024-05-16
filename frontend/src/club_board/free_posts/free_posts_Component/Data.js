// Data.js

// 공지사항 목록
const noticeList = [
  {
    "no": 6,
    "title": "공지사항 첫번째 게시글입니다.",
    "content": "공지사항 첫번째 게시글 내용입니다.",
    "createDate": "2020-10-26",
    "readCount": 10,
    "author": "관리자",
    "recommendCount": 0 // 추가: 추천 수
  },

];


// 일반 게시글 목록
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
  },
];

// 게시글 번호에 해당하는 게시글 또는 공지사항 가져오기
const getPostByNo = async (postId,token) => {
  let url = 'http://127.0.0.1:8000/club_board/post_detail/'+postId;
  let options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Token ${token}`
    },
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 추천 수 증가 함수
const increaseRecommendCount = (no) => {
  const post = postList.find(item => item.no === no);
  if (post) {
    post.recommendCount += 1;
  }
}

// 게시글 삭제 함수
export async function deletePost(postId,token) {
  try {
    const response = await fetch(`http://127.0.0.1:8000/club_board/post_detail/${postId}/`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        Authorization: `Token ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to delete post');
    }
    console.log(`Post with ID ${postId} deleted successfully.`);
  } catch (error) {
    console.error('Error deleting post:', error.message);
  }
}


export {
  postList,
  noticeList,
  getPostByNo,
  increaseRecommendCount
};