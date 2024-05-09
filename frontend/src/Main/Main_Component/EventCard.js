import React, { useState, useEffect, useRef } from 'react';
import { Card, Carousel } from 'react-bootstrap';
import '../Main_Style/EventCard.css';

const EventCard = ({ events }) => {
  // events가 없거나 비어있을 때를 처리합니다.
  if (!events || events.length === 0) {
    return <div>No events to display</div>;
  }

  const carouselRef = useRef(null); // carouselRef를 초기화합니다.

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }, 10000); // 10초마다 자동으로 다음 슬라이드로 이동
    return () => clearInterval(intervalId);
  }, []);

  const chunkedCards = events.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // 시작부터 새로운 chunk를 만들어라
    }

    resultArray[chunkIndex].push(item);

    return resultArray;
  }, []);

  return (
    <div className="event-card-container">
      <div className="carousel-wrapper">
        <Carousel ref={carouselRef} interval={null} indicators={false} wrap={true} pause="hover" slide={true}>
          {chunkedCards.map((chunk, chunkIndex) => (
            <Carousel.Item key={chunkIndex}>
              <div className="d-flex justify-content-around">
                {chunk.map((card, index) => (
                  <Card key={index} className="event-card">
                    <Card.Header className="event-card-header">
                      <h4 className="event-title"> EVENT {card.title}</h4>
                    </Card.Header>
                    <div className="event-card-image">
                      <Card.Img src={card.image} alt="이벤트 사진" className="event-card-event-image" />
                    </div>
                    <Card.Body>
                      <div className="event-card-meta">
                        <Card.Text className="event-card-date">{card.date}</Card.Text>
                        <div className="event-card-author">
                          <Card.Img src={card.profileImage} alt={card.author} className="event-card-profile" style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '5px' }} />
                          <Card.Text className="event-card-author-name">{card.author}</Card.Text>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default EventCard;
