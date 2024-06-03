import React, { useEffect, useState } from 'react';
import '../Main_Style/MainPage.css';
import BannerCarousel from './BannerCarousel';
import ClubNotice from './ClubNotice';
// import EventCard from '../../Event/Event_Component/EventCard'; 
import ClubAnalytics from './ClubAnalytics';

function MainPage() {
  const [categoryData, setCategoryData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
      // Fetch category data
      fetch('http://localhost:8000/club_introduce/count_club_category/')
          .then(response => response.json())
          .then(data => setCategoryData(data.results))
          .catch(error => console.error('Error fetching category data:', error));

      // Fetch type data
      fetch('http://localhost:8000/club_introduce/count_club_type/')
          .then(response => response.json())
          .then(data => setTypeData(data.results))
          .catch(error => console.error('Error fetching type data:', error));
  }, []);




  return (
    <div className="MainPage">
      <BannerCarousel className="banner-carousel"/>

      
      <div className="content-wrapper">
        {/* <EventCard /> */}
        {/* <EventCard /> */}
        <div className="analytics-container">
          <ClubAnalytics data={categoryData} title="동아리 카테고리별 비율" />
          <ClubAnalytics data={typeData} title="동아리 분야별 비율" />
        </div>

        <div className='notice'>
          <ClubNotice />
        </div>
      </div>
      

    </div>
  );
}

export default MainPage;
