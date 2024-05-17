import React, { useState } from "react";
import CreateClub from "./CreateClub";

const CreateClubPage = () => {
  const [clubs, setClubs] = useState([]); // 동아리 목록 상태를 추가합니다.

  // 동아리를 추가하는 함수 정의
  const addClub = (newClub) => {
    // 새 동아리를 목록에 추가하는 로직을 작성합니다.
    setClubs([...clubs, newClub]);
    console.log("새로운 동아리 정보:", newClub);
  };

  return (
    <div>
      {/* CreateClub 컴포넌트에 addClub 함수를 전달합니다. */}
      <CreateClub addClub={addClub} />
      {/* 추가적으로 동아리 목록을 보여줄 수 있는 컴포넌트가 여기에 추가될 수 있습니다. */}
    </div>
  );
};

export default CreateClubPage;
