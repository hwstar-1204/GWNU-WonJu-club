import React, { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import './ClubIntroducePage.css';
import axios from 'axios';
import { LogoImage } from '../styles';


const categoryCodes = {
  "전체": "0",
  "운동/스포츠": "1",
  "자기계발/학습/독서": "2",
  "패션/뷰티": "3",
  "여행/레저": "4",
  "종교": "5",
  "기타": "6"
};

function getCategoryLabelByCode(code) {
  return Object.keys(categoryCodes).find(key => categoryCodes[key] === code);
}

function Dropdown({ value, onChange, options, label }) {
  return (
    <div>
      {label && <label>{label}</label>}
      <select value={value} onChange={onChange}>
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}

const ClubIntroducePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("0");
  const [selectedType, setSelectedType] = useState("전체");
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:8000";
  useEffect(() => {
    const debouncedFetchClubs = debounce(async () => {
      setIsLoading(true);
      const categoryPath = selectedCategory !== "0" ? `/category_club/${selectedCategory}` : '/';
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

  const handleCategoryChange = e => {
    const categoryLabel = e.target.value;
    setSelectedCategory(categoryCodes[categoryLabel]);
  };

  const handleTypeChange = e => setSelectedType(e.target.value);

  const handleClubClick = (clubName) => {
    navigate(`/club_information/club/${clubName}/home`);
};

  const filteredClubs = clubs.filter(club => {
    return (selectedCategory === "0" || club.category === selectedCategory) &&
           (selectedType === "전체" || club.type === selectedType);
  });

  const getAbsolutePath = (relativePath) => {
    return `${BASE_URL}${relativePath}`;
  };

  return (
    <div className="ClubintroducePage">
      <div className="content-wrapper">
        <section id="clubIntroducePage" className="section">
          <div className="filters">
            <Dropdown
              label="카테고리 선택"
              value={getCategoryLabelByCode(selectedCategory)}
              onChange={handleCategoryChange}
              options={Object.keys(categoryCodes).map(key => ({ value: key, label: key }))}
            />
            <Dropdown
              label="동아리 유형 선택"
              value={selectedType}
              onChange={handleTypeChange}
              options={["전체", "정규동아리", "가등록동아리", "학습동아리", "취업/창업동아리", "소모임"].map(type => ({ value: type, label: type }))}
            />
          </div>
          {isLoading ? <p>Loading...</p> : (
            <div className="card__inner container">
              {filteredClubs.map((club, index) => (
                <article key={index} className="card" onClick={() => handleClubClick(club.club_name)}>
                  <figure className="card__header">
                  <img src={getAbsolutePath(club.photo)} alt={club.name} className="club-logo" />
                  </figure>
                  <div className="card__contents">
                    <p>{club.introducation}</p>
                    <div className="club-info">
                      <LogoImage src={getAbsolutePath(club.logo)} className="club-logo" />
                      <h3>{club.club_name}</h3>
                    </div>
                  </div>
                  <div className="card__footer">
                    <button className="apply-button">가입 신청</button>
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
