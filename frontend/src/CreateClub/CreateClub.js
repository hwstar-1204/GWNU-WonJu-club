import React, { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import "./CreateClub.css";

const CreateClubPage = () => {
  const [clubName, setClubName] = useState("");
  const [clubType, setClubType] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [logo, setLogo] = useState("");
  const [background, setBackground] = useState("");
  const token = localStorage.getItem('token');


  const handleNameChange = (e) => setClubName(e.target.value);
  const handleTypeChange = (e) => setClubType(e.target.value);
  const handleIntroductionChange = (e) => setIntroduction(e.target.value);
  const handleLogoChange = (e) =>
    setLogo(URL.createObjectURL(e.target.files[0]));
  const handleBackgroundChange = (e) =>
    setBackground(URL.createObjectURL(e.target.files[0]));

  const handleSubmit = () => {
    const newClub = {
      club_name: clubName,
      category: clubType,
      introducation: introduction,
      // logo: logo,
      // photo: background,
    };

    // API 호출 부분 추가
    fetch('http://127.0.0.1:8000/club_introduce/create_club/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(newClub),
    })
    // .then(response => response.json())
    .then(res => {
      // addClub(data);
      console.log("생성된 동아리: ",res.status);
      alert("동아리가 등록되었습니다!");
      // TODO 해당 동아리 페이지로 이동 
    })
    .catch(error => {
      console.error('Error adding club:', error);
      alert("동아리 등록에 실패했습니다.");
    });
  };

  const handleCancel = () => {
    // 취소 로직을 구현합니다.
    alert("등록이 취소되었습니다.");
  };

  return (
    <Container style={{ padding: "5%" }}>
      <h1 className="create-head">동아리 만들기</h1>
      <Form>
        {/* 동아리 이름 입력 */}
        <Form.Group controlId="clubName" style={{ marginBottom: "5%" }}>
          <Form.Label>동아리 이름</Form.Label>
          <Form.Control
            type="text"
            value={clubName}
            onChange={handleNameChange}
            style={{ width: "30%" }}
          />
        </Form.Group>

        <Form.Group controlId="clubType" style={{ marginBottom: "5%" }}>
          <Form.Label>동아리 유형</Form.Label>
          <Form.Control
            as="select"
            value={clubType}
            onChange={handleTypeChange}
            style={{ width: "30%" }}
          >
            <option>선택</option>
            <option value="정규">정규 동아리</option>
            <option value="가등록">가등록 동아리</option>
            <option value="학습">학습 동아리</option>
            <option value="취업">취업/창업 동아리</option>
            <option value="소모임">소모임</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="introduction" style={{ marginBottom: "5%" }}>
          <Form.Label>동아리소개글</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={introduction}
            onChange={handleIntroductionChange}
            style={{ width: "70%", height: "200px" }}
          />
        </Form.Group>

        <Form.Group controlId="logo" style={{ marginBottom: "5%" }}>
          <Form.Label>로고 이미지</Form.Label>
          <Form.Control
            type="file"
            onChange={handleLogoChange}
            style={{ width: "30%" }}
          />
          {logo && <Image src={logo} thumbnail />}
        </Form.Group>

        <Form.Group controlId="background" style={{ marginBottom: "5%" }}>
          <Form.Label>배경 사진</Form.Label>
          <Form.Control
            type="file"
            onChange={handleBackgroundChange}
            style={{ width: "30%" }}
          />
          {background && <Image src={background} thumbnail />}
        </Form.Group>

        <Button variant="primary" onClick={handleSubmit}>
          등록
        </Button>
        <Button
          variant="secondary"
          onClick={handleCancel}
          style={{ marginLeft: "10px" }}
        >
          취소
        </Button>
      </Form>
    </Container>
  );
};

export default CreateClubPage;
