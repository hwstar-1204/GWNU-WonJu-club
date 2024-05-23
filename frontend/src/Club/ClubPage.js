import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import ClubHeader from "./Club_Component/Club_head.js";
import ClubBody from "./Club_Component/Club_body.js";

const ClubPage = () => {
  const { club_name } = useParams();  // URL에서 clubName 추출
  const [clubInfo, setClubInfo] = useState({});

  useEffect(() => {
    if (club_name) {
      const fetchClubData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/club_information/club/${club_name}/home`);
          setClubInfo(response.data);  // 클럽 정보 업데이트

        } catch (error) {
          console.error('Error fetching club data:', error);
        }
      };

      fetchClubData();
    }
  }, [club_name]);

  return (
    <div>
      <ClubHeader clubName={club_name} />
      <ClubBody clubData={clubInfo} clubName={club_name} />
    </div>
  );

};

export default ClubPage;
