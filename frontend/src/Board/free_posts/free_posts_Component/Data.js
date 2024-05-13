// Data.js

const postList = [
  {
    "no": 1,
    "title": "첫번째 게시글입니다.",
    "content": "첫번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 6,
    "author": "작성자1",
    "recommendCount": 33 // 추가: 추천 수
  },
  {
    "no": 2,
    "title": "두번째 게시글입니다.",
    "content": "두번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 2,
    "author": "작성자2",
    "recommendCount": 22 // 추가: 추천 수
  },
  {
    "no": 3,
    "title": "세번째 게시글입니다.",
    "content": "세번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 1,
    "author": "작성자2",
    "recommendCount": 11 // 추가: 추천 수
  },
  {
    "no": 4,
    "title": "네번째 게시글입니다.",
    "content": "네번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 3,
    "author": "작성자2",
    "recommendCount": 55 // 추가: 추천 수
  },
  {
    "no": 5,
    "title": "다섯번째 게시글입니다.",
    "content": "다섯번째 게시글 내용입니다.",
    "createDate": "2020-10-25",
    "readCount": 8,
    "author": "작성자2",
    "recommendCount": 66 // 추가: 추천 수
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
