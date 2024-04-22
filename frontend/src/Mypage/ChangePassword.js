import "./Mypage.css";
import MypageHome from "./MypageHome";
import userData from "./userdata";
import CategoryPage from "../Main/CategoryPage";
import MypageNav from "./MypageNav";
import React, { useState } from "react";
import "./Mypage.css";
import "../Main/TopScreen.js";
import TopScreen from "../Main/TopScreen.js";
import { Container, Form, Button } from "react-bootstrap";
import "./ChangePassword.css";

const Changepassword = () => {
  const handleChangePassword = () => {
    alert("비밀번호가 성공적으로 변경되었습니다.");
  };
  return (
    <div className="changepassword-page">
      <TopScreen />
      <CategoryPage />
      <MypageNav userData={userData} />
      <MypageHome userData={userData} />
      <Container>
        <h1 className="head-change-password">비밀번호 변경</h1>
        <Form>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label>현재 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="현재 비밀번호를 입력하세요"
            />
          </Form.Group>
          <Form.Group controlId="formConfirmCurrentPassword">
            <Form.Label>현재 비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="현재 비밀번호를 다시 입력하세요"
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label>새 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="새로운 비밀번호를 입력하세요"
            />
          </Form.Group>
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Label>새 비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="새로운 비밀번호를 다시 입력하세요"
            />
          </Form.Group>

          {/* 폼 컨트롤들 */}
          <div className="change-button-container">
            {/* 비밀번호 변경 버튼 */}
            <Button
              variant="primary"
              type="button"
              className="password-button"
              onClick={handleChangePassword}
            >
              비밀번호 변경
            </Button>
            {/* 취소 버튼 */}
            <Button variant="secondary" className="change-cancel-button">
              취소
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Changepassword;
