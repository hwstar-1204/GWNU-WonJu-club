import React from 'react';


const ClubMembers = () => {
  // 더미 데이터
  const members = [
    { id: 1, name: 'John', profileImage: 'url_to_image_1', membershipLevel: 'Gold' },
    { id: 2, name: 'Jane', profileImage: 'url_to_image_2', membershipLevel: 'Silver' },
    // 나머지 멤버들...
  ];

  return (
    <div className="members">
      <h1 style={{ fontWeight: 'bold' }}>회원 정보</h1>
      {members.map((member) => (
        <div key={member.id}>
          <img src={member.profileImage} alt={member.name} />
          <p>{member.name}</p>
          <p>{member.membershipLevel}</p>
        </div>
      ))}
    </div>
  );
};

export default ClubMembers;