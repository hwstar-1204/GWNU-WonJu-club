import React, { useState } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import "../Main/TopScreen.js";
import "./Editinf.css";
import defaultImage from "./profile.jpg";
import logo from "./logo.png";


const Editinf = ({ userData, onPhoneChange, onDepartmentChange }) => {
  const [editedPhone, setEditedPhone] = useState(userData.phone);
  const [editedDepartment, setEditedDepartment] = useState(userData.department);

  // Function to handle phone number change
  const handlePhoneChange = (event) => {
    setEditedPhone(event.target.value);
  };

  // Function to handle department change
  const handleDepartmentChange = (event) => {
    setEditedDepartment(event.target.value);
  };

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
                <p>{userData.intro}</p>
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
              <form className="phone-num-form">
                <label htmlfor="phone-num">
                  <strong>휴대전화</strong>
                </label>
                <input
                  type="text"
                  placeholder="휴대전화를 입력하세요"
                  value={editedPhone}
                  onChange={handlePhoneChange}
                  className="form-control"
                />
              </form>
              <form className="department-form">
                <label htmlfor="department">
                  <strong>소속학과</strong>
                </label>
                <input
                  type="text"
                  placeholder="소속학과를 선택하세요"
                  value={editedDepartment}
                  onChange={handleDepartmentChange}
                  className="form-control"
                />
              </form>

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

export default Editinf;
