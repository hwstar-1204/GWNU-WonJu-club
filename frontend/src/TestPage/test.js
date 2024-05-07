import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SignupDetailPage2 = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 데이터를 받아오는 비동기 함수
    const fetchData = async () => {
      try {
        // 토큰 정보
        const token = 'd32eb90d5e600cfc4281f77d2a8a9ce0880cb221';

        // 백엔드 URL 설정
        const url = 'http://localhost:8000/club_board/free_posts/';
        // const url = 'http://localhost:8000/club_account/login/';

        
        // 헤더에 토큰 추가
        const headers = {
            Authorization: `Token ${token}`, // 중괄호 안에 토큰 변수를 직접 삽입합니다.
        };
        
        // 보낼 데이터 객체
        // const requestData = {
        //     username: '',
        //     email: 'hwstar1204@naver.com',
        //     password: 'lhw7291000@',
        // };
        
      // 데이터 요청
    //   const response = await axios.post(url, requestData);
    //   const response = await axios.get(url);

          // 요청에 포함할 파라미터 설정
        const params = {
            club_name: 'FreeBoard',    
            category: '일반',
            order: 'created_date',
            // 필요한 다른 파라미터를 추가하세요
        };
  
      // GET 요청 보내기
      const response = await axios.get(url, { params });


        // 응답 데이터를 userData 상태로 설정
        setUserData(response.data);
        console.log(response.data);

        setLoading(false); // 로딩 상태 변경
      } catch (error) {
        console.error('데이터를 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    // fetchData 함수 호출
    fetchData();
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 호출되도록 빈 배열을 의존성으로 설정

  return (
    <div>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <div>
          <h2>회원 정보</h2>
          <p>ddd: {userData.title}</p>
          <p>이름: {userData.board}</p>
          <p>이메일: {userData.content}</p>
          <p>이메일: {userData.author}</p>
          {/* 기타 회원 정보를 여기에 추가 */}
        </div>
      )}
    </div>
  );
};

export default SignupDetailPage2;
