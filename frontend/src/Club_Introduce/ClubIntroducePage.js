import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import './ClubIntroducePage.css';
import axios from 'axios';
import { LogoImage } from '../styles';
import {Button} from 'react-bootstrap'
import club_logo from '../Assets/club_logo.png'
import club_background from '../Assets/image.jpg';
import club_profile from '../Assets/profile.jpg';

function Dropdown({ value, onChange, options, label }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <select value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.label} value={option.label}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

const ClubIntroducePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    const debouncedFetchClubs = debounce(async () => {
      setIsLoading(true);
      const categoryPath = selectedCategory !== "전체" || selectedType !== "전체" ? `/category_club/${selectedCategory}/${selectedType}` : '/';
      const url = `http://localhost:8000/club_introduce/club_list${categoryPath}`;
      try {
        const response = await axios.get(url);
        setClubs(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setIsLoading(false);
      }
    }, 300);
    debouncedFetchClubs();
  }, [selectedCategory, selectedType]);

  const handleApplyClick = async (clubName, event) => {
    event.stopPropagation(); // 이벤트 전파를 막습니다.
    try {
      const token = localStorage.getItem('token');  // 예시: 토큰이 localStorage에 저장되어 있다고 가정
      const response = await axios.post(`${BASE_URL}/club_introduce/apply_club/`, 
        { club_name: clubName },
        { headers: { Authorization: `Token ${token}` } }
      );
      if (response.status === 200) {
        alert('가입 신청이 완료되었습니다.');
      } else {
        alert('가입 신청에 실패하였습니다. 다시 시도해주세요.');
      }
    } catch (error) {
      console.error('Error applying for club:', error);
      alert('가입 신청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const handleCategoryChange = e => {
    const categoryLabel = e.target.value;
    setSelectedCategory(categoryLabel);
  };

  const handleTypeChange = e => {
    const typeLabel = e.target.value;
    setSelectedType(typeLabel);
  };

  const handleClubClick = (clubName) => {
    navigate(`/club_information/club/${clubName}/home`);
  };

  const filteredClubs = clubs.filter(club => {
    return (selectedCategory === "전체" || club.category === selectedCategory) &&
           (selectedType === "전체" || club.type === selectedType);
  });

  const getAbsolutePath = (relativePath) => {
    return `${BASE_URL}${relativePath}`;
  };

  return (
    <div className="club-introduce-page">
      <div className="club-content-wrapper">
        <section id="clubIntroducePage" className="club-section">
          <div className="club-filters">
            <Dropdown
              label="카테고리 선택"
              value={selectedCategory}
              onChange={handleCategoryChange}
              options={[
                { label: "전체" },
                { label: "정규동아리" },
                { label: "가등록동아리" },
                { label: "학습동아리" },
                { label: "취업/창업동아리" },
                { label: "소모임" }
              ]}
            />
            <Dropdown
              label="동아리 유형 선택"
              value={selectedType}
              onChange={handleTypeChange}
              options={[
                { label: "전체" },
                { label: "운동/스포츠" },
                { label: "자기계발/학습/독서" },
                { label: "패션/뷰티" },
                { label: "여행/레저" },
                { label: "종교" },
                { label: "기타" }
              ]}
            />
          </div>
          {isLoading ? <p>Loading...</p> : (
            <div className="club-introduce-card-container">
              {filteredClubs.map((club, index) => (
                <article key={index} className="club-introduce-card" onClick={() => handleClubClick(club.club_name)}>
                  <figure className="club-introduce-card-header">
                    {/* <img src={getAbsolutePath(club.photo)} alt={club.name} className="club-logo" /> */}
                    <img src={club_background}  className="club-introduce-backgrund" />
                  </figure>
                  <div className="club-introduce-card-contents">
                    <p>{club.introducation}</p>
                    <div className="club-info">
                      {/* <LogoImage src={getAbsolutePath(club.logo)} className="club-logo" /> */}
                       <LogoImage src={club_logo} className="club-introduce-logo" />
                      <h3>{club.club_name}</h3>
                    </div>
                  </div>
                  <div className="club-introduce-card-footer">
                    <button className="club-apply-button" onClick={(event) => handleApplyClick(club.club_name, event)}>가입 신청</button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default ClubIntroducePage;