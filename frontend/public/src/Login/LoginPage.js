import React, { useState } from 'react';
import { Container, Form, Button, Alert, Row, Col, FormGroup, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [studentID, setStudentID] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const validateUser = (studentID, password) => {
    const registeredStudentID = '123456';
    const registeredPassword = 'password';

    return studentID === registeredStudentID && password === registeredPassword;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!studentID.trim() || !password.trim()) {
      setErrorMessage('아이디(학번)와 비밀번호를 입력하세요.');
      return;
    }

    if (validateUser(studentID, password)) {
      console.log('로그인 성공');
      setShowModal(true);
    } else {
      setErrorMessage('아이디(학번)와 비밀번호가 일치하지 않습니다.');
    }
  };

  const hideModal = () => {
    setShowModal(false);
    navigate('/main'); // 확인 버튼을 클릭하면 메인 페이지로 이동
  };

  return (
    <div className="login-background">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={6}>
            <div className="login-container">
              <h2 className="login-header">로그인</h2>
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Control
                  type="text"
                  placeholder="아이디(학번)을 입력하세요"
                  value={studentID}
                  onChange={(e) => setStudentID(e.target.value)}
                  className="input-field"
                />
                <Form.Control
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                />
                <FormGroup>
                  <Row>
                    <Col>
                      <Form.Check
                        type="checkbox"
                        label="아이디 저장"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                    </Col>
                    <Col>
                      <Link to="/login/reset-password" className="reset-password-link">비밀번호를 잊으셨나요?</Link>
                    </Col>
                  </Row>
                </FormGroup>
                <Button variant="primary" type="submit" className="login-button">
                  로그인
                </Button>
                <div className="signup-link-container">
                  <Link to="/signup" className="signup-button">회원가입</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Modal show={showModal} onHide={hideModal}>
        <Modal.Header closeButton>
          <Modal.Title>로그인 성공</Modal.Title>
        </Modal.Header>
        <Modal.Body>로그인이 성공적으로 완료되었습니다.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={hideModal}>
            확인
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginPage;
