import CategoryPage from "../Main/CategoryPage.js";
import MypageNav from "./MypageNav.js";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Editinf from "./Editinf.js";
import "./Mypage.css";
import "../Main/TopScreen.js";
import TopScreen from "../Main/TopScreen.js";
import userData from "./Mypage.js";
import { Container, Form, Button, } from "react-bootstrap";
import "./Editinformation.css";

const Editinformation = () => {
  const [editCompleted, setEditCompleted] = useState(false);

  const handleEditComplete = () => {
    setEditCompleted(true);
    // 수정 완료 알림 호출
    alert("수정 완료되었습니다");
  };

  return (
    <div className="my-page">
      <TopScreen />
      <CategoryPage />
      <h1 className="mypage-header">마이페이지</h1>
      <MypageNav userData={userData} />
      <Editinf userData={userData} />

      <Container>
        <h1 className="register-info">이용정보 등록</h1>
        <Form>
          <GenderSelection />
          <BirthdayInput />

          <div className="edit-button-container">
            <Button
              variant="primary"
              type="button"
              className="editif-button"
              onClick={handleEditComplete}
            >
              수정 완료
            </Button>
            <Button variant="secondary" type="button" className="cancel-button">
               <Link to="/mypage" className="cancel">
                취소
              </Link>
            </Button>
          </div>
        </Form>
        {/* 수정 완료 시 알림 표시 */}
      </Container>
    </div>

  );
};

export default Editinformation;


// 성별 선택 컴포넌트
const GenderSelection = () => {
  const [gender, setGender] = useState("");

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <Form>
      <Form.Group controlId="formGender">
        <Form.Label>성별</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="남성"
            value="male"
            checked={gender === "male"}
            onChange={handleGenderChange}
          />
          <Form.Check
            inline
            type="radio"
            label="여성"
            value="female"
            checked={gender === "female"}
            onChange={handleGenderChange}
          />
        </div>
      </Form.Group>
    </Form>
  );

};

// 생일 입력 컴포넌트
const BirthdayInput = () => {
  const [birthdate, setBirthdate] = useState("");

  const handleBirthdateChange = (e) => {
    setBirthdate(e.target.value);
  };

  return (
    <Form>
      <Form.Group controlId="formBirthdate">
        <Form.Label>생년월일</Form.Label>
        <Form.Control
          type="date"
          value={birthdate}
          onChange={handleBirthdateChange}
          placeholder="생년월일을 선택하세요."
        />
      </Form.Group>
    </Form>
  );

};
