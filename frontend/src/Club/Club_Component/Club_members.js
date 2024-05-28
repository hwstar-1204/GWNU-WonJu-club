import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Axios를 import합니다.
import {ProfileImage} from './StyledComponents';
import '../Club_Style/Club_members.css'; // CSS 파일을 import합니다.

const ClubMembers = () => {
  const { clubName } = useParams();
  const [members, setMembers] = useState([]); // 회원 정보를 저장할 상태

  useEffect(() => {
    // 클럽 이름을 이용하여 API를 호출하고 회원 정보를 가져옵니다.
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/club_information/club/${clubName}/members`);
        setMembers(response.data); // 가져온 회원 정보를 상태에 설정합니다.
      } catch (error) {
        console.error('Error fetching club members:', error);
      }
    };

    fetchMembers(); // useEffect가 처음 렌더링될 때 한 번 실행됩니다.
  }, [clubName]); // clubName이 변경될 때마다 API를 호출하도록 설정합니다.

  return (
    <div className="member-info-container">
      <h2>회원정보</h2>
      {members.length === 0 ? (
        <p>회원 정보가 없습니다.</p>
      ) : (
        <div className="members">
          {members.map((member) => (
            <div key={member.id} className="member-card">
              {/* 프로필 이미지가 있다면 이미지를 표시합니다. */}
              {member.profileImage && <ProfileImage src={member.profileImage} alt="Profile" />}
              <div className="member-details">
                <div className="member-job">{member.job}</div>
                <div className="member-name">{member.name}</div> {/* 이름을 직책 아래에 표시합니다. */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ClubMembers;
