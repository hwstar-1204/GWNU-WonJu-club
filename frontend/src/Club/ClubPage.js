import ClubHeader from "./Club_Component/Club_head";
import ClubMembers from "./Club_Component/Club_members";
import ClubBackground from "./Club_Component/Club_background";
import ClubBoard from "./Club_Component/Club_board";
import ClubGallery from "./Club_Component/Club_gallery";


const ClubPage = () => {
  return (
    <div>
      <ClubHeader />
      <ClubBackground />
      <ClubMembers />
      <ClubBoard />
      <ClubGallery />
    </div>
  );
};

export default ClubPage;