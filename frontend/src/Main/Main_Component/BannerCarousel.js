import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../Main_Style/BannerCarousel.css';

const BannerCarousel = () => {
  return (
<div className="carousel-container">
  <Carousel interval={3000}> {/* 3초마다 이미지 전환 */}
    <Carousel.Item>
      <img
        className="carousel-image"
        src="/photo/bannerimg1.jpg"
        alt="First slide"
        
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="carousel-image"
        src="/photo/bannerimg2.jpg"
        alt="Second slide"
        
      />
    </Carousel.Item>
    {/* 추가적인 슬라이드들 */}
  </Carousel>
</div>

  );
}

export default BannerCarousel;
