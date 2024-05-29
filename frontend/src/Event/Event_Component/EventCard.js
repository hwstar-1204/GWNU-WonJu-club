import React from "react";
import Card from "react-bootstrap/Card";
import example_img from '../../Assets/default_event.jpeg'

function EventCard({ event }) {
  return (
    <Card>
      {/* 옵셔널 체이닝 연산자를 사용하여 event.thumbnail이 존재하는 경우에만 이미지를 렌더링합니다. */}
      {/* <Card.Img variant="top" src={event?.thumbnail} alt={event?.title} /> */}
      <Card.Img variant="top" src={example_img} alt={event?.title} />

      
      <Card.Body>
        {/* 옵셔널 체이닝 연산자를 사용하여 event.title이 존재하는 경우에만 제목을 표시합니다. */}
        <Card.Title>{event?.title}</Card.Title>
        <Card.Text>
          작성자: {event?.author_name}
          {/* <br /> */}
          {/* 좋아요 수: {event?.likes} */}
          <br />
          기간: {event?.start_time} ~ {event?.end_time}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default EventCard;
