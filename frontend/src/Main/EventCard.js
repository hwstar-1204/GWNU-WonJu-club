import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './EventCard.css';

const EventCard = () => {
  return (
    <Card className="event-card">
      <Card.Body>
        <Card.Title className="event-card-title">강릉원주대 원주캠퍼스 동아리 이벤트</Card.Title>
        <Card.Text className="event-card-description">
          강릉원주대 원주캠퍼스 동아리에서 개최하는 다음 이벤트에 참여해보세요! 다양한 활동과 프로그램이 기다리고 있습니다.
        </Card.Text>
        <Card.Text className="event-card-date">날짜: 2024년 5월 15일</Card.Text>
        <Button variant="primary" className="event-card-link">자세히 보기</Button>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
