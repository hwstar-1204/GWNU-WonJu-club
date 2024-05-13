import React from "react";
import "../Club_Style/Club_members.css";


const ClubMembers = ({ member }) => {
  return (
    <div className="member-info-container">
      <h2>회원정보</h2>
      <div className="members">
        {member.map((member, index) => (
          <div key={index} className="member-card">
            <img src={member.profileImage} alt="Profile" />
            <div className="member-details">
              <div className="member-name">{member.name}</div>
              <div className="member-membership-level">{member.membershipLevel}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubMembers;
