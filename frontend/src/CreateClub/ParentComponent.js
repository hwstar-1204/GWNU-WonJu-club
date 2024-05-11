import React, { useState } from 'react';
import CreateClubPage from './CreateClubPage';

const ParentComponent = () => {
  // addClub 함수 정의
  const addClub = (newClub) => {
    // 새로운 동아리를 추가하는 로직을 작성합니다.
    console.log('새로운 동아리 정보:', newClub);
  };

  return (
    <div>
      {/* CreateClubPage 컴포넌트에 addClub 함수를 props로 전달합니다. */}
      <CreateClubPage addClub={addClub} />
    </div>
  );
};

export default ParentComponent;
