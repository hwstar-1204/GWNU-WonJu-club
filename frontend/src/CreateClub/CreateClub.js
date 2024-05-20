import React, { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateClub.css";
import defaultImage from "../Assets/default_image.png";
import defaultLogo from "../Assets/club_logo.png";

<<<<<<< Updated upstream
  const navigate = useNavigate();

const CreateClubPage = ({ addClub }) => {
  const navigate = useNavigate();  // 이동된 useNavigate 훅
  const [club_name, setClubName] = useState("");
=======
const CreateClubPage = () => {
  const [clubName, setClubName] = useState("");
>>>>>>> Stashed changes
  const [clubType, setClubType] = useState("");
  const [clubCategory, setClubCategory] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [logo, setLogo] = useState(defaultLogo);
  const [background, setBackground] = useState(defaultImage);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !clubName.trim() ||
      !clubType.trim() ||
      !clubCategory.trim() ||
      !introduction.trim()
    ) {
      alert("모든 필드를 작성해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("name", clubName);
    formData.append("type", clubType);
    formData.append("category", clubCategory);
    formData.append("introduction", introduction);
    formData.append("logo", logo);
    formData.append("background", background);

    try {
      const response = await axios.post(
        "http://localhost:8000/club_information/apply_club/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("동아리가 등록되었습니다!");
        navigate("/club_list"); // 예시로 클럽 리스트 페이지로 이동
      } else {
        throw new Error("Failed to add club");
      }
<<<<<<< Updated upstream

      const data = response.data;
      addClub(data);
      alert("동아리가 등록되었습니다!");
=======
>>>>>>> Stashed changes
      navigate('/somewhere'); // Example path, change accordingly
    } catch (error) {
      console.error("Error adding club:", error);
      alert("동아리 등록에 실패했습니다.");
    }
  };

<<<<<<< Updated upstream
  const handleCancel = () => {
    alert("등록이 취소되었습니다.");
    navigate(-1); // 페이지 뒤로가기 
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
=======
  return (
    <Container style={{ padding: "5%" }}>
      <h1 className="create-head">동아리 만들기</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="clubName">
          <Form.Label>동아리 이름</Form.Label>
          <Form.Control
            type="text"
            value={clubName}
            onChange={(e) => {
              console.log(e.target.value); // 현재 입력된 값 로그 출력
              setClubName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group controlId="clubType">
>>>>>>> Stashed changes
          <Form.Label>동아리 유형</Form.Label>
          <Form.Control
            as="select"
            value={clubType}
<<<<<<< Updated upstream
            onChange={handleTypeChange}
            style={{ width: "30%" }}
          >
            <option>선택</option>
=======
            onChange={(e) => setClubType(e.target.value)}
          >
>>>>>>> Stashed changes
            <option value="regular">정규 동아리</option>
            <option value="membership">가등록 동아리</option>
            <option value="learning">학습 동아리</option>
            <option value="employment">취업/창업 동아리</option>
            <option value="community">소모임</option>
          </Form.Control>
        </Form.Group>
<<<<<<< Updated upstream

        <Form.Group controlId="clubCategory" style={{ marginBottom: "5%" }}>
=======
        <Form.Group controlId="clubCategory">
>>>>>>> Stashed changes
          <Form.Label>동아리 분류</Form.Label>
          <Form.Control
            as="select"
            value={clubCategory}
<<<<<<< Updated upstream
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
=======
            onChange={(e) => setClubCategory(e.target.value)}
          >
            <option value="sports">운동/스포츠</option>
            <option value="music">음악/예술</option>
            <option value="academic">학술/교육</option>
            <option value="social">사회/봉사</option>
            <option value="others">기타</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="introduction">
          <Form.Label>소개글</Form.Label>
>>>>>>> Stashed changes
          <Form.Control
            as="textarea"
            rows={3}
            value={introduction}
<<<<<<< Updated upstream
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
=======
            onChange={(e) => setIntroduction(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="logo">
          <Form.Label>로고 이미지</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setLogo(e.target.files[0])}
          />
          {logo && typeof logo === 'object' && (
            <Image src={URL.createObjectURL(logo)} alt="club-logo" thumbnail style={{ width: '80px', height: '80px' }} />
          )}
        </Form.Group>
        <Form.Group controlId="background">
          <Form.Label>배경 이미지</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setBackground(e.target.files[0])}
          />
          {background && typeof background === 'object' && (
            <Image src={URL.createObjectURL(background)} alt="club-background" thumbnail style={{ width: '200px', height: '150px' }} />
          )}
        </Form.Group>
        <Button variant="primary" type="submit">
          동아리 등록
>>>>>>> Stashed changes
        </Button>
      </Form>
      {/* 컴포넌트 내용 */}
    </Container>
  );
};

export default CreateClubPage;
