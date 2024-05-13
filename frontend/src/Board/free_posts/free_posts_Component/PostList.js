import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 불러오기
import CommonTable from '../../Table/CommonTable';
import CommonTableColumn from '../../Table/CommonTableColumn';
import CommonTableRow from '../../Table/CommonTableRow';
import { postList } from './Data';

const PostList = ({ sortBy, searchTerm }) => {
  const [filteredDataList, setFilteredDataList] = useState([]);

  useEffect(() => {
    let filteredList = [...postList];

    // 정렬 기준에 따라 필터링
    if (sortBy === '전체') {
      // 전체를 선택한 경우 필터링 없이 전체 목록 표시
      setFilteredDataList(filteredList);
    } else if (sortBy === '작성순') {
      filteredList.sort((a, b) => a.no - b.no);
      setFilteredDataList(filteredList);
    } else if (sortBy === '제목순') {
      filteredList.sort((a, b) => a.title.localeCompare(b.title));
      setFilteredDataList(filteredList);
    } else if (sortBy === '조회순') { // 추가: 조회순 정렬
      filteredList.sort((a, b) => b.readCount - a.readCount);
      setFilteredDataList(filteredList);
    } else if (sortBy === '추천순') { // 추가: 추천순 정렬
      filteredList.sort((a, b) => b.recommendCount - a.recommendCount);
      setFilteredDataList(filteredList);
    }

    // 검색어에 따라 필터링
    if (searchTerm.trim() !== '') {
      filteredList = filteredList.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDataList(filteredList);
  }, [sortBy, searchTerm]);

  return (
    <>
      <CommonTable headersName={['글번호', '제목', '작성자', '작성일', '조회', '추천']}>
        {filteredDataList && filteredDataList.length > 0 ? (
          filteredDataList.map((item, index) => (
            <CommonTableRow key={index}>
              <CommonTableColumn>{item.no}</CommonTableColumn>
              <CommonTableColumn>
                <Link to={`/postView/${item.no}`} style={{ textDecoration: 'none', color: 'black' }}>{item.title}</Link>
              </CommonTableColumn>
              <CommonTableColumn>{item.author}</CommonTableColumn>
              <CommonTableColumn>{item.createDate}</CommonTableColumn>
              <CommonTableColumn>{item.readCount}</CommonTableColumn>
              <CommonTableColumn>{item.recommendCount}</CommonTableColumn> {/* 수정: 추천수 표시 */}
            </CommonTableRow>
          ))
        ) : (
          <tr>
            <td colSpan="6">게시글이 없습니다.</td>
          </tr>
        )}
      </CommonTable>
    </>
  );
};

export default PostList;
