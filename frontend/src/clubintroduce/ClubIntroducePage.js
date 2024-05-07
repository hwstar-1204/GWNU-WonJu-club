import React, { useState } from 'react';
import './ClubintroducePage.css';
import Kakao from '../clubintroduce/Assets/kakao.png';
import InstagramIcon from '../clubintroduce/Assets/instagram.jpg';


const ClubIntroducePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체"); // 선택된 카테고리 상태 추가
  const [selectedType, setSelectedType] = useState("전체"); // 선택된 종류 상태 추가

  // 카테고리 필터링 함수
  const filterClubs = (clubs) => {
    if (selectedCategory === "전체" && selectedType === "전체") {
      return clubs; // 모든 동아리 반환
    } else if (selectedCategory === "전체") {
      return clubs.filter(club => club.type === selectedType); // 선택된 종류에 따라 필터링
    } else if (selectedType === "전체") {
      return clubs.filter(club => club.category === selectedCategory); // 선택된 카테고리에 따라 필터링
    } else {
      return clubs.filter(club => club.category === selectedCategory && club.type === selectedType); // 선택된 카테고리와 종류에 따라 필터링
    }
  };

  // 동아리 목록 데이터
  const clubs = [
    { name: "댄스 동아리", category: "운동/스포츠", type: "정규동아리" },
    { name: "게임 동아리", category: "자기계발/학습/독서", type: "가등록동아리" },
    { name: "축구 동아리", category: "운동/스포츠", type: "학습동아리" },
    { name: "요리 동아리", category: "기타", type: "소모임" },
    { name: "영화 동아리", category: "기타", type: "소모임" } ,
    { name: "독서 동아리", category: "자기계발/학습/독서", type: "학습동아리" }, 
    { name: "미술 동아리", category: "미술/음악", type: "소모임" }
    // 나머지 동아리 데이터도 추가
  ];

  return (
    <div className="ClubintroducePage">
      <div className="content-wrapper">
        <section id="clubIntroducePage" className="section">
          <div className="filters">
            {/* 카테고리 선택상자 */}
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="전체">전체</option>
              <option value="운동/스포츠">운동/스포츠</option>
              <option value="자기계발/학습/독서">자기계발/학습/독서</option>
              <option value="패션/뷰티">패션/뷰티</option>
              <option value="여행/레저">여행/레저</option>
              <option value="종교">종교</option>
              <option value="기타">기타</option>
              {/* 나머지 카테고리 추가 */}
            </select>
            {/* 종류 선택상자 */}
            <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
              <option value="전체">전체</option>
              <option value="정규동아리">정규동아리</option>
              <option value="가등록동아리">가등록동아리</option>
              <option value="학습동아리">학습동아리</option>
              <option value="취업/창업동아리">취업/창업동아리</option>
              <option value="소모임">소모임</option>
            </select>
          </div>
          <div className="card__inner container">
            {/* 필터링된 동아리 카드 표시 */}
            {filterClubs(clubs).map((club, index) => (
              <article key={index} className="card">
                <figure className="card__header">
                  <img src={club.imageUrl} alt={club.name} />
                </figure>
                <div className="card__contents">
                  <p>{club.description}</p>
                  <div className="club-info">
                    <img src={club.logoUrl} alt={`${club.name} 로고`} className="club-logo" />
                    <h3>{club.name}</h3>
                  </div>
                  <div className="social-icons">
                  <a href="#"><img src={Kakao} alt="Kakao Talk" /></a>
                    <a href="#"><img src={InstagramIcon} alt="Instagram" /></a>
                  </div>
                </div>
                <div className="card__footer">
                  <button className="apply-button">가입 신청</button>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default ClubIntroducePage;
