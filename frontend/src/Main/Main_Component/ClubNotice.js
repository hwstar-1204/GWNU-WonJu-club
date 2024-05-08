import React from 'react';
import '../Main_Style/ClubNotice.css';

const ClubNotice = () => {
  return (
    <div className="club-notice">
      <h2 className="notice-title">동아리 공지</h2>
      <div className="notice-board">
        <div className="notice-item">
          <div className="notice-header">
            <span className="notice-date">2024년 4월 18일</span>
            <span className="notice-author">운영자</span>
          </div>
          <div className="notice-content">
            <p>안녕하세요, 강릉원주대 원주캠퍼스 동아리에 오신 여러분들을 환영합니다!</p>
          </div>
        </div>
        <div className="notice-item">
          <div className="notice-header">
            <span className="notice-date">2024년 4월 25일</span>
            <span className="notice-author">운영자</span>
          </div>
          <div className="notice-content">
            <p>오늘부터 우리 동아리에서는 매주 목요일 오후 4시에 정기 모임을 가질 예정입니다.</p>
            <p>이번 주 모임은 새로운 동아리 회원을 환영하고, 다음 학기에 준비할 프로젝트에 대한 논의를 진행할 예정입니다.</p>
            <p>참석하실 분들은 미리 준비된 Zoom 링크로 접속해주세요.</p>
            <p>감사합니다!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClubNotice;
