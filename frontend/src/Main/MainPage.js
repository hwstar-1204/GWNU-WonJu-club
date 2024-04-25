// MainPage.js
import React from 'react';

import './MainPage.css';
import CategoryPage from './CategoryPage';
import BannerCarousel from './BannerCarousel';
import EventCard from './EventCard';
import ClubNotice from './ClubNotice';
import chatbotImage from './chatbot.png'; // AI 챗봇 이미지 추가
import TopScreen from './TopScreen';

import { useUser } from '../UserContext'; // UserContext 가져오기

function MainPage() {
  
  const { isLoggedIn } = useUser(); // 로그인 상태 가져오기

  return (
    <div className="MainPage">
      {/* 항상 TopScreen 컴포넌트를 렌더링하고, 로그인 상태에 따라 내용이 변경됩니다. */}

      <TopScreen />

      <CategoryPage />

      <BannerCarousel />

      <div className="content-wrapper">
        <div className="event-card-container">
          <EventCard />
        </div>
        <div className="club-notice-container">
          <ClubNotice />
        </div>
      </div>
      
      {/* AI 챗봇 이미지 추가 */}
      <img src={chatbotImage} alt="AI 챗봇" className="chatbot-image" />
    </div>
  );
}

export default MainPage;