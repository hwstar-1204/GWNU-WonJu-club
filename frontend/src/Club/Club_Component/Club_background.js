import React from "react";
import '../Club_Style/Club_background.css';

const ClubBackground = ({ background, introduction }) => {
  return (
    <div className="club-info-container" style={{ background: `url(${background})` }}>
      <div className="introduction">{introduction}</div>
    </div>
  );
};

export default ClubBackground;
