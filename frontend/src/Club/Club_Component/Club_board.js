import React from "react";

//게시글 클릭시 게시글로 이동

const BulletinBoard = ({ posts }) => {
  return (
    <div className="bulletin-board-container">
      <h2>게시판</h2>
      <div className="posts">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <div className="post-title">{post.title}</div>
            <div className="post-content">{post.content}</div>
            <div className="post-meta">
              <span className="post-author">작성자: {post.author}</span>
              <span className="post-date">작성일: {post.date}</span>
              <span className="post-views">조회수: {post.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BulletinBoard;
