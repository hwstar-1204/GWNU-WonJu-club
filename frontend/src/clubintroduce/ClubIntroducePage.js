import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ClubintroducePage.css';
import TopScreen from '../Main/TopScreen';
import CategoryPage from '../Main/CategoryPage';
import { useParams, useNavigate } from 'react-router-dom';

const ClubIntroducePage = () => {
  const [clubs, setClubs] = useState([]);
  const { category_id } = useParams(); // useParams 훅을 통해 URL 파라미터 접근
  const navigate = useNavigate();
  const [localCategoryId, setLocalCategoryId] = useState(''); // 로컬 카테고리 ID 상태
  const categories = [
    //'운동', '문화/예술/디자인', '자기계발/학습/독서', '패션/뷰티', '여행/레저', '종교', '기타'
    'Category1', 'Category2', 'Category3', 'Category4', 'Category5', 'Category6', 'Category7'
  ];

  useEffect(() => {
    fetchData(category_id);
  }, [category_id]);

  const fetchData = async (category_id) => {
    const url = category_id ?
      `http://localhost:8000/club_introduce/club_list/category_club/${category_id}` :
      `http://localhost:8000/club_introduce/club_list/`;

    try {
      const response = await axios.get(url);
      setClubs(response.data);
    } catch (error) {
      console.error('Failed to fetch clubs:', error);
    }
  };

  const handleCategorySelect = async (category) => {
    setLocalCategoryId(category);
    console.log(`Selected category: ${category}`);
    // URL을 업데이트하기 전에 데이터를 가져옵니다.
    await fetchData(category);
    // 데이터 가져오기가 완료된 후 URL을 업데이트합니다.
    navigate(`/club_introduce/club_list/category_club/${category}`);
  };

  const handleSubmit = async (clubName) => {
    const studentId = "123456"; // 예시 학번
    try {
      const response = await axios.post('http://localhost:8000/club_introduce/apply_club/', {
        student_id: studentId,
        club_name: clubName
      });
      console.log('Application successful:', response.data);
      // 추가적인 성공 처리 로직 (예: 알림 메시지 등)
    } catch (error) {
      console.error('Application failed:', error);
      // 실패 처리 로직 (예: 에러 메시지 표시)
    }
  };


   return (
    <div className="ClubintroducePage">
      <TopScreen />
      <div className="category-selector">
        카테고리 선택
        <div className="category-menu">
          {categories.map((category, index) => (
            <a key={index} onClick={() => handleCategorySelect(category)}>
              {category}
            </a>
          ))}
        </div>
      </div>
      <CategoryPage />
      <section id="clubIntroducePage" className="card__wrap score section">
        <div className="card__inner container">
          {clubs.map(club => (
            <article className="card" key={club.club_name}>
              <figure className="card__header">
                <img src={club.photo || 'default-image-url.jpg'} alt={club.club_name} />
              </figure>
              <div className="card__contents">
                <p>{club.introducation}</p>
                <div className="club-info">
                  <img src={club.logo || 'default-logo-url.png'} alt={`${club.club_name} 로고`} className="club-logo" />
                  <h3>{club.club_name}</h3>
                </div>
              </div>
              <div className="card__footer">
                <button className="apply-button" onClick={() => handleSubmit(club.club_name)}>가입 신청</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ClubIntroducePage;
