import React from 'react';
import '../Main_Style/MainPage.css';
import BannerCarousel from './BannerCarousel';
import ClubNotice from './ClubNotice';
import chatbotImage from '../Main_assets/chatbot.png'; // AI 챗봇 이미지 추가
import EventCard from '../../Event/Event_Component/EventCard'; 

function MainPage() {
  // Redux store에서 isLoggedIn 상태를 가져옴


  return (
    <div className="MainPage">
      <BannerCarousel className="banner-carousel"/>

      <div className="content-wrapper">
        <EventCard />
        <EventCard />
        <div className="club-notice-container">
          <ClubNotice />
        </div>
      </div>
      
      <img src={chatbotImage} alt="AI 챗봇" className="chatbot-image" />
    </div>
  );
}

export default MainPage;
