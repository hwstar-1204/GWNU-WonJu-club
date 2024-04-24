import "./Mypage.css";
import MypageHome from "./MypageHome.js";
import userData from "./Mypage.js";
import CategoryPage from "../Main/CategoryPage.js";
import MypageNav from "./MypageNav.js";
import React, { useState } from "react";
import "./Mypage.css";
import "../Main/TopScreen.js";
import TopScreen from "../Main/TopScreen.js";
import { Container, Form, Button } from "react-bootstrap";
import "./ChangePassword.css";
import { Link } from "react-router-dom";

// Import a library for password encryption
import bcrypt from "bcryptjs";

const Changepassword = () => {
  // State variables to hold the values of password fields
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Function to handle changes in the password fields
  const handleCurrentPasswordChange = (event) => {
    setCurrentPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  // Function to handle password change
  const handleChangePassword = () => {
    // Check if the new password and its confirmation match
    if (newPassword !== confirmNewPassword) {
      setPasswordsMatch(false);
      return;
    }

    // Encrypt the new password before saving it (you can adjust the salt and rounds)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    // Here, you can handle password change logic, such as sending the encrypted password to the server

    // Reset password fields and show success message
    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setPasswordsMatch(true);
    alert("비밀번호가 성공적으로 변경되었습니다.");
  };


  return (
    <div className="changepassword-page">
      <TopScreen />
      <CategoryPage />

      <h1 className = "mypage-header">마이페이지 </h1>

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
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </Form.Group>


          <Form.Group controlId="formNewPassword">
            <Form.Label>새 비밀번호</Form.Label>
            <Form.Control
              type="password"
              placeholder="새로운 비밀번호를 입력하세요"

              value={newPassword}
              onChange={handleNewPasswordChange}

            />
          </Form.Group>
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Label>새 비밀번호 확인</Form.Label>
            <Form.Control
              type="password"
              placeholder="새로운 비밀번호를 다시 입력하세요"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
            />
          </Form.Group>

          {/* Show a message if passwords do not match */}
          {!passwordsMatch && (
            <p className="password-mismatch">비밀번호가 일치하지 않습니다.</p>
          )}

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
              <Link to="/mypage" className="cancel" >
                취소
              </Link>

            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};

export default Changepassword;
