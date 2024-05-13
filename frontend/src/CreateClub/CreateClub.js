import React, { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import "./CreateClub.css";
import defaultimage from "../Assets/default_image.png";
import defaultlogo from "../Assets/club_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  const navigate = useNavigate();

const CreateClubPage = ({ addClub }) => {
  const [club_name, setClubName] = useState("");
  const [clubType, setClubType] = useState("");
  const [clubCategory, setClubCategory] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [logo, setLogo] = useState("");
  const [background, setBackground] = useState("");

  const handleNameChange = (e) => setClubName(e.target.value);
  const handleTypeChange = (e) => setClubType(e.target.value);
  const handleCategoryChange = (e) => setClubCategory(e.target.value);
  const handleIntroductionChange = (e) => setIntroduction(e.target.value);
  const handleLogoChange = (e) =>
    setLogo(URL.createObjectURL(e.target.files[0]));
  const handleBackgroundChange = (e) =>
    setBackground(URL.createObjectURL(e.target.files[0]));

   const handleSubmit = async (e) => {
    e.preventDefault();

    const newClub = {
      name: club_name,
      type: clubType,
      category: clubCategory,
      introduction: introduction,
      logo: logo,
      background: background,
    };

    if (!club_name || !clubType || !clubCategory || !introduction) {
      alert("모든 필드를 작성해주세요.");
      return;
    }
    if (!logo || !background) {
      alert("로고 또는 배경이미지를 선택해주세요.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/club_inntroduce/apply_club/", newClub);

      if (response.status !== 201) {
        throw new Error("Failed to add club");
      }

      const data = response.data;
      addClub(data);
      alert("동아리가 등록되었습니다!");
    } catch (error) {
      console.error("Error adding club:", error);
      alert("동아리 등록에 실패했습니다.");
    }
  };
// 동아리에 입력된 필드를 확인하고 서버에 전달

  const handleCancel = () => {
    alert("등록이 취소되었습니다.");
    navigate(-1); // 페이지 뒤로가기 (현재 안됨) 
  };

  return (
    <Container style={{ padding: "5%" }}>
      <h1 className="create-head">동아리 만들기</h1>
      <Form>
        {/* 동아리 이름 입력 */}
        <Form.Group controlId="club_name" style={{ marginBottom: "5%" }}>
          <Form.Label>동아리 이름</Form.Label>
          <Form.Control
            type="text"
            value={club_name}
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
            <option value="regular">정규 동아리</option>
            <option value="membership">가등록 동아리</option>
            <option value="learning">학습 동아리</option>
            <option value="employment">취업/창업 동아리</option>
            <option value="community">소모임</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="clubCategory" style={{ marginBottom: "5%" }}>
          <Form.Label>동아리 분류</Form.Label>
          <Form.Control
            as="select"
            value={clubCategory}
            onChange={handleCategoryChange}
            style={{ width: "30%" }}
          >
            <option>선택</option>
            <option value="운동/스포츠">운동/스포츠</option>
            <option value="자기계발/학습/독서">자기계발/학습/독서</option>
            <option value="패션/뷰티">패션/뷰티</option>
            <option value="여행/레져">여행/레져</option>
            <option value="종교">종교</option>
            <option value="음악/댄스">음악/댄스</option>
            <option value="기타">기타</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="introduction" style={{ marginBottom: "5%" }}>
          <Form.Label>동아리소개글</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={introduction}
            onChange={handleIntroductionChange}
            style={{ width: "70px", height: "200px" }}
          />
        </Form.Group>

        <Form.Group controlId="logo" style={{ marginBottom: "5%" }}>
          <Form.Label>로고 이미지</Form.Label>
          <Form.Control
            type="file"
            onChange={handleLogoChange}
            style={{ width: "30%" }}
          />
          {logo ? (
            <Image
              src={logo}
              thumbnail
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            /> // 크기 조정
          ) : (
            <Image
              src={defaultlogo}
              thumbnail
              style={{ maxWidth: "100px", maxHeight: "100px" ,width: "100px", height: "100px"}}
            /> // 로고가 업로드되지 않은 경우 기본 이미지
          )}
        </Form.Group>

        <Form.Group controlId="background" style={{ marginBottom: "5%" }}>
          <Form.Label>배경 사진</Form.Label>
          <Form.Control
            type="file"
            onChange={handleBackgroundChange}
            style={{ width: "30%" }}
          />
          {background ? (
            <Image
              src={background}
              thumbnail
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            /> // 크기 조정
          ) : (
            <Image
              src={defaultimage}
              thumbnail
              style={{ maxWidth: "300px", maxHeight: "200px" }}
            /> // 배경이미지가 업로드되지 않은 경우 기본 이미지
          )}
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
