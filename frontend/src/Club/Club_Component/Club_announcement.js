// Notices.js

import React from 'react';

const ClubAnnouncement = ({ notices }) => {
  return (
    <div className="notices">
      {notices.map((notice) => (
        <div key={notice.id}>
          <p>{notice.title}</p>
        </div>
      ))}
    </div>
  );
};

export default ClubAnnouncement;