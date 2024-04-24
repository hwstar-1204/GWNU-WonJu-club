import React, { useState, useEffect, useRef } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import './EventCard.css';

const EventCard = () => {
  const [cards, setCards] = useState([
    {  date: '2024년 5월 15일', author: '홍길동' },
    {  date: '2024년 6월 15일', author: '이순신' },
    {  date: '2024년 7월 15일', author: '홍길동' },
    {  date: '2024년 8월 15일', author: '이순신' }
  ]);

  const addCard = () => {
    const newCard = { title: '새로운 이벤트', date: '2024년 7월 20일', author: '작성자 정보' };
    setCards([...cards, newCard]);
  };

  const carouselRef = useRef(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.next();
      }
    }, 10000); // 10초마다 자동으로 다음 슬라이드로 이동
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="event-card-container">
      <div className="carousel-wrapper">
        <Carousel ref={carouselRef} interval={null} indicators={false} wrap={true} pause="hover" slide={true}>
          {cards.map((card, index) => (
            <Carousel.Item key={index}>
              <Card className="event-card">
                <Card.Header className="event-card-header">
                  <h4 className="event-title"> EVENT{card.title}</h4>
                </Card.Header>
                <div className="event-card-image">
                  <Card.Img src="https://jjingosu.com/wp-content/uploads/2023/12/%EC%98%A4%EC%9D%B4%EC%83%9D%EC%9C%A1-1536x768.webp" alt="이벤트 사진" className="event-card-event-image" />
                </div>
                <Card.Body>
                  <div className="event-card-meta">
                    <Card.Text className="event-card-date">{card.date}</Card.Text>
                    <div className="event-card-author">
                      <Card.Img src="https://img.tvreportcdn.de/cms-content/uploads/2023/06/12/7bed2ee2-bda4-4a49-b5d3-d1a89b37b074.jpg" alt={card.author} className="event-card-profile" style={{ borderRadius: '50%', width: '50px', height: '50px', marginRight: '5px' }} />
                      <Card.Text className="event-card-author-name">{card.author}</Card.Text>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <Button variant="primary" className="add-card-button" onClick={addCard}>+</Button>
    </div>
  );
}

export default EventCard;
