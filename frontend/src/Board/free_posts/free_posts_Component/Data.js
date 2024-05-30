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

// 댓글 수정 삭제 함수
export const handleComment = async(method, comment_id, token, data='') => {
  const url = `http://127.0.0.1:8000/club_board/comment_detail/${comment_id}/`
  const options = {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`
    }
  };
  if (method != 'DELETE') {

    options.body = JSON.stringify({content: data});
  }

  try {
    const res = await fetch(url, options);
    console.log(res.ok);
    // const data = await res.json();
    // return res.status;
  } catch (err) {
    console.log(err);
  }
}

export const createComment = async(post_id, content,token) => { // TODO post_id back front 수정
  const url = `http://127.0.0.1:8000/club_board/comment_create/`;
  const options = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      Authorization: `Token ${token}`
    },
    body: JSON.stringify({
      content: content,
      post_id: post_id
    })
  };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}



export {
  getPostByNo,
  increaseRecommendCount
};