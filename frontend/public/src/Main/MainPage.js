import './MainPage.css';
import CategoryPage from './CategoryPage';
import BannerCarousel from './BannerCarousel';
import EventCard from './EventCard';
import ClubNotice from './ClubNotice';
import chatbotImage from './chatbot.png'; // AI 챗봇 이미지 추가
import TopScreen from './TopScreen';

function MainPage() {
  return (
    <div className="MainPage">
      <TopScreen isLoggedIn={false} /> {/* 로그인 상태를 false로 설정하여 TopScreen 컴포넌트 추가 */}

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
