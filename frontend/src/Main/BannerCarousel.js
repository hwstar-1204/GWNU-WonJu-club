import React from 'react';
import { Carousel } from 'react-bootstrap';
import './BannerCarousel.css';

const BannerCarousel = () => {
  return (
    <div className="carousel-container">
      <Carousel>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://via.placeholder.com/800x400"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>카테고리 설명이나 추가 내용</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="carousel-image"
            src="https://via.placeholder.com/800x400"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>다른 카테고리 설명이나 추가 내용</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* 추가적인 슬라이드들 */}
      </Carousel>
    </div>
  );
}

export default BannerCarousel;
