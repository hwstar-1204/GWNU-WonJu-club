import React from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import "../Main/TopScreen.js";
import "./MypageHome.css";
import defaultImage from "./profile.jpg";
import logo from "./logo.png";

import userData from "./MypageHome.js";

const MypageHome = () => {

  return (
    <Container>
      <Row>
        {/* 첫 번째 열 */}
        <Col md={4}>
          {/* 프로필 정보 패널 */}
          <div className="profile-panel">
            {/* 프로필 사진과 버튼 */}
            <div className="profile">
              <img
                src={defaultImage}
                alt="프로필 사진"
                className="profile-image"
              />
              <div className="inroduction">
                <p>
                  <strong>{userData.name}</strong> 
                </p>
                <p>
                 {userData.intro}
                </p>
                
                
              </div>
              <div className="button-container">
                <Button variant="primary" type="submit" className="edit-button">
                  프로필 수정
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  className="delete-button"
                >
                  사진 삭제
                </Button>
              </div>
            </div>
          </div>
        </Col>

        {/* 두 번째 열 */}
        <Col md={4}>
          {/* 사용자 정보 */}
          <div className="details">
            <h2 className="details-head">사용자 정보</h2>
            <div className="details-info">
            <p>
              <strong>이름:</strong> {userData.name}
            </p>
            <p>
              <strong>이메일:</strong> {userData.email}
            </p>
            <p>
              <strong>휴대전화:</strong> {userData.phone}
            </p>
            <p>
              <strong>소속 학과:</strong> {userData.department}
            </p>
            <p>
              <strong>가입일:</strong> {userData.joinDate}
            </p>
            </div>
          </div>
        </Col>

        {/* 세 번째 열 */}
        <Col md={4}>
          {/* 나의 동아리 패널 */}
          <div className="myclub-panel">
            <div className="my-club">
              <h2 className="myclub-head">나의 동아리</h2>
              <div className="club-details">
                <div className="club-info-container">
                  <img src={logo} alt="동아리 로고" className="club-logo" />
                  <div className="club-info">
                    <p className="club-name">{userData.myclubname}</p>
                    <p className="membership-level">
                      {userData.membershipLevel}

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MypageHome;
