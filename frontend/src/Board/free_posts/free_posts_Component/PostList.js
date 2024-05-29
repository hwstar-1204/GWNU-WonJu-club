import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 리액트 라우터의 Link 컴포넌트 불러오기
import CommonTable from '../../Table/CommonTable'; // 공통 테이블 컴포넌트 불러오기
import CommonTableColumn from '../../Table/CommonTableColumn'; // 공통 테이블 열 컴포넌트 불러오기
import CommonTableRow from '../../Table/CommonTableRow'; // 공통 테이블 행 컴포넌트 불러오기
import { postList, noticeList } from './Data'; // 글 데이터 불러오기
import '../free_posts_Style/PostList.css';

const PostList = () => {
  // const [filteredDataList, setFilteredDataList] = useState([]); // 검색 및 정렬된 글 목록을 담는 상태  
  const [sortBy, setSortBy] = useState("선택");
  const [clubName, setClubName] = useState("FreeBoard");  // 자유게시판에서 동아리 이름 넘겨줘야함
  const [category, setCategory] = useState("일반");
  const [order, setOrder] = useState("created_date");
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token')
  const navigate = useNavigate();

  // TODO 
  // 1. 카테고리와 정렬 방식 동적으로 적용
  // 2. 특정 동아리 게시판 일때 테스트


  useEffect(() => {
    let url = `http://127.0.0.1:8000/club_board/board_posts/${clubName}/${category}/${order}/`;
    let options = {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
          Authorization: `Token ${token}`
      },
      // body: JSON.stringify({
      //   params: "asdf", 
      // })
    };
    fetch(url,options)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setPosts(data); // 데이터 설정
      })
      .catch(err => {
        console.log(err)
      });
  }, [clubName, category, order]);

  const handleSortByChange = (value) => {
    setSortBy(value);
  };

  const handlePostClick = (postId) => {
    navigate(`postView/${postId}`);
  }

  // useEffect(() => {
  //   // 공지글과 일반 게시글을 각각 필터링하고 정렬
  //   const sortedNoticeList = noticeList.slice().sort((a, b) => a.no - b.no); // 공지글 정렬
  //   const sortedPostList = postList.slice().sort((a, b) => a.no - b.no); // 일반 게시글 정렬

  //   // 검색어 필터링
  //   const filteredNoticeList = sortedNoticeList.filter(item =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   ); // 공지글 검색어 필터링
  //   const filteredPostList = sortedPostList.filter(item =>
  //     item.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   ); // 일반 게시글 검색어 필터링

  //   // 정렬 기준에 따라 일반 게시글 정렬
  //   let sortedFilteredPostList;
  //   if (sortBy === '작성순') {
  //     sortedFilteredPostList = filteredPostList.sort((a, b) => a.no - b.no);
  //   } else if (sortBy === '제목순') {
  //     sortedFilteredPostList = filteredPostList.sort((a, b) => a.title.localeCompare(b.title));
  //   } else if (sortBy === '조회순') {
  //     sortedFilteredPostList = filteredPostList.sort((a, b) => b.readCount - a.readCount);
  //   } else if (sortBy === '추천순') {
  //     sortedFilteredPostList = filteredPostList.sort((a, b) => b.recommendCount - a.recommendCount);
  //   } else {
  //     sortedFilteredPostList = filteredPostList;
  //   }

  //   // 정렬된 공지글과 정렬된 일반 게시글을 병합
  //   const mergedList = [...filteredNoticeList, ...sortedFilteredPostList];

  //   setFilteredDataList(mergedList); // 검색 및 정렬된 글 목록 업데이트
  // }, [sortBy, searchTerm]); // sortBy 및 searchTerm이 변경될 때마다 실행

  
  return (
  <div className='post-list-container'>
    <h1 className='post-list-title'>자유 게시판</h1>
  <select className='post-list-sort-select'
    value={sortBy}
    onChange={(e) => handleSortByChange(e.target.value)}
    style={{ width: "180px", margin: "20px" }}>
      <option value="선택">선택</option>
      <option value="전체">전체</option>
      <option value="작성순">작성순</option>
      <option value="제목순">제목순</option>
      <option value="조회순">조회순</option>
      <option value="추천순">추천순</option>
  </select>

  <table className="post-table">
    <thead>
      <tr>
        <th>글번호</th>
        <th>제목</th>
        <th>작성자</th>
        <th>작성일</th>
        <th>조회수</th>
        <th>추천수</th>
      </tr>
    </thead>

    <tbody>
      {posts.map(post => (
        <tr key={post.id} onClick={() => handlePostClick(post.id)}>
          <td>{post.id}</td>
          <td>{post.title}</td>
          <td>{post.author_name}</td>
          <td>{new Date(post.created_date).toLocaleDateString('ko-KR')}</td>
          <td>{post.view_cnt}</td>
          <td>{post.recommended_cnt}</td>
        </tr>
      ))}
    </tbody>

  </table>

  <div className='write' >
    <button onClick={() => {
      // navigate(`write`);
      navigate("write", {state : {club_name: "FreeBoard"}});  // 페이지 이동

    }}>글쓰기</button>
  </div>


  <div className='search'>
    <input
      // value={searchTerm}
      // onChange={handleSearchChange}
      type="text"
      placeholder="검색어를 입력하세요"/>

    {/* <button style={{ width: "60px" }} onClick={handleSearch}>검색</button> */}
    <button>검색</button>
  </div>

  </div>




    // <>
      // <CommonTable headersName={['글번호', '제목', '작성자', '작성일', '조회', '추천']}> {/* 테이블 헤더 설정 */}
      //   {filteredDataList && filteredDataList.length > 0 ? ( // 검색 및 정렬된 글 목록이 있는 경우
      //     filteredDataList.map((item, index) => (
      //       <CommonTableRow key={index}> {/* 각 글을 테이블 행으로 표시 */}
      //         <CommonTableColumn>{item.no}</CommonTableColumn> {/* 글번호 열 */}
      //         <CommonTableColumn>
      //           <Link to={`/postView/${item.no}`} style={{ textDecoration: 'none', color: 'black' }}>
      //             {noticeList.some(notice => notice.no === item.no) ? // 해당 글이 공지글인지 확인
      //               <span style={{ color: 'red' }}>[공지] </span> : null // 공지글인 경우 표시
      //             }
      //             {item.title} {/* 글 제목 */}
      //           </Link>
      //         </CommonTableColumn>
      //         <CommonTableColumn>{item.author}</CommonTableColumn> {/* 작성자 열 */}
      //         <CommonTableColumn>{item.createDate}</CommonTableColumn> {/* 작성일 열 */}
      //         <CommonTableColumn>{item.readCount}</CommonTableColumn> {/* 조회수 열 */}
      //         <CommonTableColumn>{item.recommendCount}</CommonTableColumn> {/* 추천수 열 */}
      //       </CommonTableRow>
      //     ))
      //   ) : (
      //     <tr>
      //       <td colSpan="6">게시글이 없습니다.</td> {/* 검색 결과가 없는 경우 */}
      //     </tr>
      //   )}
      // </CommonTable>
    // </>
  );
};

export default PostList;
