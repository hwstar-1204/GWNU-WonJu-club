import React, { useState } from "react";
import CreateClub from "./CreateClub";

const CreateClubPage = () => {
  // 동아리를 추가하는 함수 정의
  const addClub = (newClub) => {
    // 동아리를 추가하는 로직을 작성합니다.
    console.log("새로운 동아리 정보:", newClub);
  };

  return (
    <div>
      {/* CreateClub 컴포넌트에 addClub 함수를 전달합니다. */}
      <CreateClub addClub={addClub} />
    </div>
  );
};

export default CreateClubPage;
