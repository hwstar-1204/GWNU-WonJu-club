import React from 'react';
import '../Club_Style/Club_head.css';
import ClubBackground from "./Club_background";;
import { useNavigate } from 'react-router-dom'; // useHistory를 react-router-dom에서 불러옵니다.

const ClubHeader = ({ clubData, clubName }) => {
  const navigate = useNavigate();
  
  if (!clubData || !clubData.club_data) {
    return <div>클럽 정보를 로딩 중...</div>;
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  const handleClick = (section) => {
    if (section === 'members') {
      navigate(`/club_information/club/${clubName}/members/`);
    } 
    else if (section === 'album') {
      navigate(`/club_information/club/${clubName}/albums/`);
    }
    else if (section === 'posts') {
      navigate(`/club_board/club_posts/?clubName=${clubName}`);
    }
    else if (section === 'event') {
      navigate(`/club_information/club/${clubName}/events/`);
    }
  }
  
  const buttonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '0',
    margin: '0'
  };

  const sectionHeaderStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };

  return (
    <div className="header-container">
      <ClubBackground
        introduction={clubData.club_introduction}
        logo={clubData.club_data.logo}
      />

      <div className="club-members-container">
        <div style={sectionHeaderStyle}>
          <h3>회원 정보</h3>
          <button onClick={() => handleClick('members')} style={buttonStyle}>+</button>
        </div>
        <div className="horizontal-list">
          {clubData.club_members.map(member => (
            <div key={member.id} className="member">
              <div className="member-job">{member.job}</div>
              <div className="member-id">{member.id}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="club-albums-container">
        <div style={sectionHeaderStyle}>
          <h3>사진첩</h3>
          <button onClick={() => handleClick('album')} style={buttonStyle}>+</button>
        </div>
        <div className="horizontal-list">
          {clubData.club_album.map(album => (
            <div key={album.id} className="album">
              <div className="album-title">
                <span
                  className="album-title-link"
                  onClick={() => navigate(`/club_board/post_detail/${album.id}/`)}
                  style={{ cursor: 'pointer', color: 'black' }}
                >
                  {album.title}
                </span>
              </div>
              <div className="album-stats">
                <span className="views">{`Views: ${album.view_cnt}`}</span>
                <span className="recommended">{`Recommended: ${album.recommended_cnt}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="club-posts-container">
        <div style={sectionHeaderStyle}>
          <h3>최신 쓴 글</h3>
          <button onClick={() => handleClick('posts')} style={buttonStyle}>+</button>
        </div>
        <table className="posts-table">
          <thead>
            <tr>
              <th>번호</th>
              <th>작성일</th>
              <th>제목</th>
              <th>작성자</th>
              <th>조회수</th>
              <th>추천수</th>
            </tr>
          </thead>
          <tbody>
            {clubData.club_posts.map(post => (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{formatDate(post.created_date)}</td>
                <td>
                  <span
                    className="post-title-link"
                    onClick={() => navigate(`/club_board/post_detail/${post.id}/`)}
                    style={{ cursor: 'pointer', color: 'black' }}
                  >
                    {post.title}
                  </span>
                </td>
                <td>{post.author}</td>
                <td>{post.view_cnt}</td>
                <td>{post.recommended_cnt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="club-events-container">
        <div style={sectionHeaderStyle}>
          <h3>이벤트</h3>
          <button onClick={() => handleClick('event')} style={buttonStyle}>+</button>
        </div>
        <div className="horizontal-list">
          {clubData.club_event.map(event => (
            <div key={event.id} className="event">
              <div className="event-title">
                <span
                  className="album-title-link"
                  onClick={() => navigate(`/club_board/post_detail/${event.id}/`)}
                  style={{ cursor: 'pointer', color: 'black' }}
                >
                  {event.title}
                </span>
              </div>
              <div className="event-stats">
                <span className="views">{`Views: ${event.view_cnt}`}</span>
                <span className="recommended">{`Recommended: ${event.recommended_cnt}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClubHeader;