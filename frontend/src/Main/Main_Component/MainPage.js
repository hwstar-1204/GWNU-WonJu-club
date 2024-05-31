//MainPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Main_Style/MainPage.css';
import BannerCarousel from './BannerCarousel';
import ClubNotice from './ClubNotice';
import EventCard from '../../Event/Event_Component/EventCard';
import '../../global.css';

function MainPage() {
  return (
    <div className="MainPage">
      <BannerCarousel className="banner-carousel"/>
      <div className="content-wrapper">
        <EventCard />
        <EventCard />
        <div className='notice'>
          <ClubNotice />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
