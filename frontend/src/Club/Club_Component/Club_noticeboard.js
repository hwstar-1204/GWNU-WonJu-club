import React from 'react';

const ClubNoticeBoard = ({ post }) => {
  return (
    <div className="members">
      {post.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
           <p>{post.views}</p>
        </div>
      ))}
    </div>
  );
};

export default ClubNoticeBoard;