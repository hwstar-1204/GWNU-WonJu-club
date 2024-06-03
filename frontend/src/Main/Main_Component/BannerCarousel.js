import React from 'react';
import { Carousel } from 'react-bootstrap';
import '../Main_Style/BannerCarousel.css';
import banner1 from "../Main_assets/banner1.jpeg"
import banner2 from "../Main_assets/banner2.jpeg"

const BannerCarousel = () => {
  return (
<div className="carousel-container">
  <Carousel interval={3000}> {/* 3초마다 이미지 전환 */}
    <Carousel.Item>
      <img
        className="carousel-image"
        src={banner1}
        alt="First slide"
        
      />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="carousel-image"
        src={banner2}
        alt="Second slide"
        
      />
    </Carousel.Item>
    {/* 추가적인 슬라이드들 */}
  </Carousel>
</div>

  );
}

export default BannerCarousel;
