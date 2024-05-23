import React from "react";
import '../Club_Style/Club_background.css';


const ClubBackground = ({ introduction, Background }) => {
  // Ensure introduction has a fallback if it's undefined or empty
  const safeIntroduction = introduction || 'No introduction provided.'; // Provide a default introduction text
  
  return (
    <div className="club-info-container">
      {/* 동아리 로고를 표시합니다. */}
      <div className="club-logo-container">
        <img src={Background} alt="ClubBackgtround" className="club-logo" />
      </div>
      <div className="introduction">{safeIntroduction}</div>
    </div>
  );
};

export default ClubBackground;
