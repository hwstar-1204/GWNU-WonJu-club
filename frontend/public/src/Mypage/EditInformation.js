import CategoryPage from '../Main/CategoryPage';
import MypageNav from './MypageNav';
import React, { useState } from 'react';
import MypageHome from './MypageHome';
import './Mypage.css';
import '../Main/TopScreen.js'
import TopScreen from '../Main/TopScreen.js';
import userData from './userdata.js';
import { Container, Form, Button } from 'react-bootstrap';
import'./Editinformation.css';

const Editinformation = () => {
  // 더미 데이터


  return (
       
    <div className="my-page">
        <TopScreen />
        <CategoryPage />
        
         <h1 className = "mypage-header">마이페이지 </h1>
        <MypageNav userData={userData} />
        <MypageHome userData={userData} />

         <Container>
      <h1 className="register-info">이용정보 등록</h1>
      <Form>
        <GenderSelection>
        </GenderSelection>

        <BirthdayInput>
          </BirthdayInput>
       
       
        <div className="edit-button-container">
          <Button variant="primary" type="submit" className="editif-button">수정 완료</Button>
          <Button variant="secondary" className="cancel-button">취소</Button>
        </div>
      </Form>
    </Container>

        </div>
      
  );
};

export default Editinformation;


/* 성별 */
const GenderSelection = () => {
  const [gender, setGender] = useState('');

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
}
const BirthdayInput = () => {
  const [birthdate, setBirthdate] = useState('');

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
}

