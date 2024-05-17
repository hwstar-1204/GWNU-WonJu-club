import React, { useState } from "react";
import { Container, Form, Button, Image } from "react-bootstrap";
import "./CreateClub.css";
import defaultimage from "../Assets/default_image.png";
import defaultlogo from "../Assets/club_logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateClubPage = ({ addClub }) => {
  const navigate = useNavigate();  // 이동된 useNavigate 훅
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
      navigate('/somewhere'); // Example path, change accordingly
    } catch (error) {
      console.error("Error adding club:", error);
      alert("동아리 등록에 실패했습니다.");
    }
  };

  const handleCancel = () => {
    alert("등록이 취소되었습니다.");
    navigate(-1); // 페이지 뒤로가기 
  };

  return (
    <Container style={{ padding: "5%" }}>
      {/* 컴포넌트 내용 */}
    </Container>
  );
};

export default CreateClubPage;
