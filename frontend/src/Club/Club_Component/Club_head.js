import React from 'react';
import '../Club_Style/Club_head.css';
import ClubBackground from "./Club_background";;
import { useNavigate, NavLink } from 'react-router-dom'; // useHistory를 react-router-dom에서 불러옵니다.
import {LogoImage } from './StyledComponents';

// 관호
import { useNavigate } from 'react-router-dom';
import '../Club_Style/Club_head.css'; // 스타일을 위한 CSS 파일
import logo from '../../Assets/club_logo.png'; // 동아리 로고 이미지


const ClubHeader = ({ clubName }) => {
  const navigate = useNavigate();

  // if (!clubData || !clubData.club_data) {
  //   return <div>클럽 정보를 로딩 중...</div>;
  // }

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
    else if (section === 'manage') {
      navigate(`/club_management/club/${clubName}`);
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

  return (
    // 관호
    <div className="club-header">
      <img src={logo} alt="Logo" style={{ width: '70px', height: '70px' }} />
      <h1>{clubName}</h1>
      <nav className='club-header-nav'>
        <ul>
          <li onClick={() => handleClick('members')}>회원정보</li>
          <li onClick={() => handleClick('posts')}>게시판</li>
          <li onClick={() => handleClick('album')}>사진첩</li>
          <li onClick={() => handleClick('event')}>일정</li>
          <li className="manage" onClick={() => handleClick('manage')}>동아리관리</li>
        </ul>
      </nav>
      </div>

    // <div className="header-container">
    //   <ClubBackground
    //     introduction={clubData.club_introduction}
    //     logo={clubData.club_data.logo}
    //   />

    //   <NavLink to={`/club_management/club/${clubName}`} className= "management">동아리 관리</NavLink> {/* 추가된 부분 */}  

    //   <div className="club-members-container">
    //     <div style={sectionHeaderStyle}>
    //       <h3>회원 정보</h3>
    //       <button onClick={() => handleClick('members')} style={buttonStyle}>+</button>
    //     </div>
    //     <div className="horizontal-list">
    //       {clubData.club_members.map(member => (
    //         member.joined_date !== null && (
    //             <div key={member.id} className="member">
    //               <div className="member-student_id">{member.student_id}</div>
    //               <div className="member-job">{member.job}</div>
    //             </div>
    //         )
    //       ))}
    //     </div>
    //   </div>

    //   <div className="club-albums-container">
    //     <div style={sectionHeaderStyle}>
    //       <h3>사진첩</h3>
    //       <button onClick={() => handleClick('album')} style={buttonStyle}>+</button>
    //     </div>
    //     <div className="horizontal-list">
    //       {clubData.club_album.map(album => (
    //         <div key={album.id} className="album">
    //           <div className="album-title">
    //             <span
    //               className="album-title-link"
    //               onClick={() => navigate(`/club_board/post_detail/${album.id}/`)}
    //               style={{ cursor: 'pointer', color: 'black' }}
    //             >
    //               {album.title}
    //             </span>
    //           </div>
    //           <div className="album-stats">
    //             <span className="views">{`Views: ${album.view_cnt}`}</span>
    //             <span className="recommended">{`Recommended: ${album.recommended_cnt}`}</span>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>

    //   <div className="club-posts-container">
    //     <div style={sectionHeaderStyle}>
    //       <h3>최신 쓴 글</h3>
    //       <button onClick={() => handleClick('posts')} style={buttonStyle}>+</button>
    //     </div>
    //     <table className="posts-table">
    //       <thead>
    //         <tr>
    //           <th>번호</th>
    //           <th>작성일</th>
    //           <th>제목</th>
    //           <th>작성자</th>
    //           <th>조회수</th>
    //           <th>추천수</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {clubData.club_posts.map(post => (
    //           <tr key={post.id}>
    //             <td>{post.id}</td>
    //             <td>{formatDate(post.created_date)}</td>
    //             <td>
    //               <span
    //                 className="post-title-link"
    //                 onClick={() => navigate(`/club_board/post_detail/${post.id}/`)}
    //                 style={{ cursor: 'pointer', color: 'black' }}
    //               >
    //                 {post.title}
    //               </span>
    //             </td>
    //             <td>{post.author}</td>
    //             <td>{post.view_cnt}</td>
    //             <td>{post.recommended_cnt}</td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>

    //   <div className="club-events-container">
    //     <div style={sectionHeaderStyle}>
    //       <h3>이벤트</h3>
    //       <button onClick={() => handleClick('event')} style={buttonStyle}>+</button>
    //     </div>
    //     <div className="horizontal-list">
    //       {clubData.club_event.map(event => (
    //         <div key={event.id} className="event">
    //           <div className="event-title">
    //             <span
    //               className="album-title-link"
    //               onClick={() => navigate(`/club_board/post_detail/${event.id}/`)}
    //               style={{ cursor: 'pointer', color: 'black' }}
    //             >
    //               {event.title}
    //             </span>
    //           </div>
    //           <div className="event-stats">
    //             <span className="views">{`Views: ${event.view_cnt}`}</span>
    //             <span className="recommended">{`Recommended: ${event.recommended_cnt}`}</span>
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
  );
};

export default ClubHeader;
