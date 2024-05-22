import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import { Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom";
import EventCard from "../Event_Component/EventCard";
import "../Event_Style/EventList.css";

const EventList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const eventsPerPage = 3; // 한 페이지당 카드 수 변경
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const token = localStorage.getItem('token')

  
  useEffect(() => {
    let url = `http://127.0.0.1:8000/club_board/event/`;
    let options = {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Token ${token}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        const count = data.count;
        const results = data.results;
        console.log(results);
        setEvents(results);
        // 여기서 results에는 실제 데이터 배열이 들어 있습니다.
        // 원하는 작업을 수행하세요.
      })
      .catch(error => console.error('Error:', error));
  }, []);




  const handleCreateClubClick = () => {
    if (!isLoggedIn) {
      alert("회원만 사용할 수 있습니다. 로그인하시겠습니까?");
      navigate('/login'); // 로그인 페이지 경로가 '/login'이라고 가정
      return;
    }
    // 로그인이 되어 있다면 동아리 만들기 페이지로 이동
    navigate('/create_event');
  };
  return (
    <div className="event-list-container">
      <Row className="align-items-center">
        <Col className="create-event">
          <NavLink to="create_event">
            <Button onClick = {handleCreateClubClick} variant="primary">+ 이벤트 </Button >
          </NavLink>
        </Col>
      </Row>
      <Row className="justify-content-center">
        {currentEvents.map((event) => (
          <Col key={event.id} className="event-card-col text-center">
            <EventCard event={event} />
          </Col>
        ))}
      </Row>

      <div className="pagination-container">
        <Pagination className="pagination-container">
          <Pagination.Prev
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({
            length: Math.ceil(events.length / eventsPerPage),
          }).map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(events.length / eventsPerPage)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default EventList;
