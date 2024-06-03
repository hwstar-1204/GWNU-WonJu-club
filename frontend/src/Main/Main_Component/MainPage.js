// src/components/MainPage.js
import React, { useEffect } from 'react';
import BannerCarousel from './BannerCarousel';
import ClubNotice from './ClubNotice';
import '../Main_Style/MainPage.css';
import '../Main_Style/Responsive.css';

function MainPage() {
  useEffect(() => {
    const handleScroll = (event) => {
      if (window.innerWidth <= 768) return; // 모바일에서는 기본 스크롤 사용

      const delta = Math.sign(event.deltaY);
      const scrollHeight = window.innerHeight;
      const currentSection = Math.round(window.scrollY / scrollHeight);
      const nextSection = Math.min(
        Math.max(currentSection + delta, 0),
        document.querySelectorAll('.section').length - 1
      );

      window.scrollTo({
        top: nextSection * scrollHeight,
        behavior: 'smooth',
      });

      event.preventDefault();
    };

    window.addEventListener('wheel', handleScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScroll);
    };
  }, []);

  return (
    <div className="MainPage" >
      <div className="section section1">
        <BannerCarousel />
      </div>
      <div className="section section2">
        <ClubNotice />
      </div>
      <div className="section section3">
        <h2>Empty Section</h2>
      </div>
    </div>
  );
}

export default MainPage;
