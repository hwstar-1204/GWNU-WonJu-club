import ClubHeader from "./Club_Component/Club_head";
// import ClubMembers from "./Club_Component/memebers";
// import ClubBackground from "./Club_Component/Club_background";
import ClubNotice from "../Main/Main_Component/ClubNotice";
// import ClubPhotoalbum from "../Main/Main_Component/ClubPhotoalbum";
import ClubIntroduce from "./Club_Component/Club_introduce";

const ClubPage = () => {
  return (
    <div>
      <ClubHeader />
      {/* <ClubBackground /> */}
      <ClubIntroduce />
      {/* <ClubMembers /> */}
      <ClubNotice />
      {/* <ClubPhotoalbum /> */}
    </div>
  );
};

export default ClubPage;