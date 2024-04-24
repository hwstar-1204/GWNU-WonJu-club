import React from 'react';
import './ClubintroducePage.css';
import TopScreen from '../Main/TopScreen'; // TopScreen 컴포넌트를 가져옵니다.
import CategoryPage from '../Main/CategoryPage';

const ClubIntroducePage = () => {
  return (
     <div className="ClubintroducePage">
<TopScreen />
  <CategoryPage />
    <section id="clubIntroducePage" className="card__wrap score section">
      <div className="card__inner container">
        {/* 댄스 동아리 카드 */}
        <article className="card">
          <figure className="card__header">
            <img src="https://www.ksponco.or.kr/sports/files/view?id=61d6634a-b462-43fa-8aac-6ed4c68177af&seq=1" alt="Surfing" />
          </figure>
          <div className="card__contents">
            <p>댄스 동아리는 다양한 음악과 춤으로 회원들이 즐거운 시간을 보낼 수 있는 동아리입니다. 다양한 장르의 댄스를 배우고 공연할 수 있습니다.</p>
            <div className="club-info">
              <img src="img/club_logo_dance.png" alt="댄스 동아리 로고" className="club-logo" />
              <h3>댄스 동아리</h3>
            </div>
            <div className="social-icons">
              <a href="#"><img src="img/kakao_icon.png" alt="Kakao Talk" /></a>
              <a href="#"><img src="img/instagram_icon.png" alt="Instagram" /></a>
            </div>
          </div>
          <div className="card__footer">
            <span><img src="img/card_bg03_icon01.png" alt="Chris" /></span>
            <button className="apply-button">가입 신청</button>
          </div>
        </article>

        {/* 게임 동아리 카드 */}
        <article className="card">
          <figure className="card__header">
            <img src="https://newsimg.sedaily.com/2020/08/03/1Z6FOL2KGQ_1.jpg" alt="Rafting" />
          </figure>
          <div className="card__contents">
            <p>게임 동아리는 게임을 즐기고 관련된 이야기를 나누는 동아리입니다. 다양한 게임을 플레이하고 대회를 개최하여 실력을 겨룰 수 있습니다.</p>
            <div className="club-info">
              <img src="img/club_logo_game.png" alt="게임 동아리 로고" className="club-logo" />
              <h3>게임 동아리</h3>
            </div>
            <div className="social-icons">
              <a href="#"><img src="img/kakao_icon.png" alt="Kakao Talk" /></a>
              <a href="#"><img src="img/instagram_icon.png" alt="Instagram" /></a>
            </div>
          </div>
          <div className="card__footer">
            <span><img src="img/card_bg03_icon02.png" alt="Chris" /></span>
            <button className="apply-button">가입 신청</button>
          </div>
        </article>

        {/* 축구 동아리 카드 */}
        <article className="card">
          <figure className="card__header">
            <img src="https://hs.e-school.or.kr/webzine/vol13/assets/images/sub/sub07/sub07_img01.png" alt="Diving" />
          </figure>
          <div className="card__contents">
            <p>축구 동아리는 축구를 사랑하는 회원들이 모여서 함께 축구를 즐기는 동아리입니다. 정기적인 연습과 친선경기를 통해 실력을 향상시킬 수 있습니다.</p>
            <div className="club-info">
              <img src="img/club_logo_soccer.png" alt="축구 동아리 로고" className="club-logo" />
              <h3>축구 동아리</h3>
            </div>
            <div className="social-icons">
              <a href="#"><img src="img/kakao_icon.png" alt="Kakao Talk" /></a>
              <a href="#"><img src="img/instagram_icon.png" alt="Instagram" /></a>
            </div>
          </div>
          <div className="card__footer">
            <span><img src="img/card_bg03_icon03.png" alt="Chris" /></span>
            <button className="apply-button">가입 신청</button>
          </div>
        </article>
        {/* 나머지 동아리 카드들도 동일한 구조로 추가 */}
      </div>
    </section>
    </div>
  );
}

export default ClubIntroducePage;
