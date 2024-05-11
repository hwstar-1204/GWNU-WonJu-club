import React from "react";

const Schedule = ({ events }) => {
  return (
    <div className="schedule-container">
      <h2>일정</h2>
      <div className="events">
        {events.map((event, index) => (
          <div key={index} className="event">
            <div className="event-title">{event.title}</div>
            <div className="event-date">{event.date}</div>
            <div className="event-time">{event.time}</div>
            <div className="event-description">{event.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
