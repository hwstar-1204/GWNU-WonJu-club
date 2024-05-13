import { useState, useEffect } from "react";
import axios from "axios";
import ClubHeader from "./Club_Component/Club_head";
import ClubMembers from "./Club_Component/Club_members";
import ClubBackground from "./Club_Component/Club_background";
import ClubBoard from "./Club_Component/Club_board";
import ClubGallery from "./Club_Component/Club_gallery";
import ClubSchedule from "./Club_Component/Club_schedule";

const ClubPage = ({ clubName }) => {
  const [clubInfo, setClubInfo] = useState({});
  const [clubBoardData, setClubBoardData] = useState([]);
  const [clubGalleryData, setClubGalleryData] = useState([]);
  const [clubScheduleData, setClubScheduleData] = useState([]);

  useEffect(() => {
    axios
      .get(`/club_managemnt/club/${clubName}`)
      .then((response) => {
        setClubInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club info:", error);
      });
    axios
      .get(`/club_board/club_posts/`)
      .then((response) => {
        setClubBoardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club board data:", error);
      });

    axios
      .get(`/club_information/club/${clubName}/albums/`)
      .then((response) => {
        setClubGalleryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club gallery data:", error);
      });

    axios
      .get(`/club_information/club/${clubName}/events/`)
      .then((response) => {
        setClubScheduleData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching club schedule event data:", error);
      });
  }, [clubName]);


  return (
    <div>
      <ClubHeader
        clublogo={clubInfo.logo}
        isPresident={clubInfo.isPresident} // 서버에서 회장의 이메일을 넘겨준다는 가정, Redux 이용하여 현재 이용자의 이메일과 대조하여 회장인지 식별할 예정//
      />
      <ClubBackground
        background={clubInfo.background}
        introduction={clubInfo.introduction}
      />
      <ClubMembers member={clubInfo.member} />
      <ClubGallery data={clubGalleryData} />
      <ClubBoard data={clubBoardData} />
      <ClubSchedule data={clubScheduleData} />
    </div>
  );
};

export default ClubPage;

// 백엔드와 토론후 변경예정
