import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main_Style/MainPage.css';
import BannerCarousel from './BannerCarousel';
import ClubNotice from './ClubNotice';
import chatbotImage from '../Main_assets/chatbot.png'; // AI 챗봇 이미지 추가
import { useUser } from '../../UserContext'; // UserContext 가져오기
import EventCard from '../../Event/Event_Component/EventCard'; 

function MainPage() {
  const { isLoggedIn } = useUser(); // 로그인 상태 가져오기
  const navigate = useNavigate();

  return (
    <div className="MainPage">
      {/* 항상 TopScreen 컴포넌트를 렌더링하고, 로그인 상태에 따라 내용이 변경됩니다. */}

      <BannerCarousel />

      <div className="content-wrapper">
        {/*EventCard를 3개 렌더링 */}
        <EventCard />
        <EventCard />
        <EventCard />
        <div className="club-notice-container">
          <ClubNotice />
        </div>
      </div>
      
      {/* AI 챗봇 이미지 추가 */}
      {/* <img src={chatbotImage} alt="AI 챗봇" className="chatbot-image" onClick={() => navigate('/chatbot')}/> */}
    </div>
  );
}

export default MainPage;
