import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // 리액트 라우터의 Link 컴포넌트 불러오기
import CommonTable from '../../Table/CommonTable'; // 공통 테이블 컴포넌트 불러오기
import CommonTableColumn from '../../Table/CommonTableColumn'; // 공통 테이블 열 컴포넌트 불러오기
import CommonTableRow from '../../Table/CommonTableRow'; // 공통 테이블 행 컴포넌트 불러오기
import { postList, noticeList } from './Data'; // 글 데이터 불러오기

const PostList = ({ sortBy, searchTerm }) => {
  const [filteredDataList, setFilteredDataList] = useState([]); // 검색 및 정렬된 글 목록을 담는 상태

  useEffect(() => {
    // 공지글과 일반 게시글을 각각 필터링하고 정렬
    const sortedNoticeList = noticeList.slice().sort((a, b) => a.no - b.no); // 공지글 정렬
    const sortedPostList = postList.slice().sort((a, b) => a.no - b.no); // 일반 게시글 정렬

    // 검색어 필터링
    const filteredNoticeList = sortedNoticeList.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // 공지글 검색어 필터링
    const filteredPostList = sortedPostList.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // 일반 게시글 검색어 필터링

    // 정렬 기준에 따라 일반 게시글 정렬
    let sortedFilteredPostList;
    if (sortBy === '작성순') {
      sortedFilteredPostList = filteredPostList.sort((a, b) => a.no - b.no);
    } else if (sortBy === '제목순') {
      sortedFilteredPostList = filteredPostList.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === '조회순') {
      sortedFilteredPostList = filteredPostList.sort((a, b) => b.readCount - a.readCount);
    } else if (sortBy === '추천순') {
      sortedFilteredPostList = filteredPostList.sort((a, b) => b.recommendCount - a.recommendCount);
    } else {
      sortedFilteredPostList = filteredPostList;
    }

    // 정렬된 공지글과 정렬된 일반 게시글을 병합
    const mergedList = [...filteredNoticeList, ...sortedFilteredPostList];

    setFilteredDataList(mergedList); // 검색 및 정렬된 글 목록 업데이트
  }, [sortBy, searchTerm]); // sortBy 및 searchTerm이 변경될 때마다 실행

  return (
    <>
      <CommonTable headersName={['글번호', '제목', '작성자', '작성일', '조회', '추천']}> {/* 테이블 헤더 설정 */}
        {filteredDataList && filteredDataList.length > 0 ? ( // 검색 및 정렬된 글 목록이 있는 경우
          filteredDataList.map((item, index) => (
            <CommonTableRow key={index}> {/* 각 글을 테이블 행으로 표시 */}
              <CommonTableColumn>{item.no}</CommonTableColumn> {/* 글번호 열 */}
              <CommonTableColumn>
                <Link to={`/postView/${item.no}`} style={{ textDecoration: 'none', color: 'black' }}>
                  {noticeList.some(notice => notice.no === item.no) ? // 해당 글이 공지글인지 확인
                    <span style={{ color: 'red' }}>[공지] </span> : null // 공지글인 경우 표시
                  }
                  {item.title} {/* 글 제목 */}
                </Link>
              </CommonTableColumn>
              <CommonTableColumn>{item.author}</CommonTableColumn> {/* 작성자 열 */}
              <CommonTableColumn>{item.createDate}</CommonTableColumn> {/* 작성일 열 */}
              <CommonTableColumn>{item.readCount}</CommonTableColumn> {/* 조회수 열 */}
              <CommonTableColumn>{item.recommendCount}</CommonTableColumn> {/* 추천수 열 */}
            </CommonTableRow>
          ))
        ) : (
          <tr>
            <td colSpan="6">게시글이 없습니다.</td> {/* 검색 결과가 없는 경우 */}
          </tr>
        )}
      </CommonTable>
    </>
  );
};

export default PostList;
