import React, { useEffect, useState } from 'react';
import '../Main_Style/ClubNotice.css';

const ClubNotice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    
    fetch(`http://localhost:8000/club_board/notice/?page=${currentPage}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.results);
           if (data.results == null) {
          setNotices([]);
        }else{
          setNotices(data.results);
          setTotalPages(Math.ceil(data.count / 10)); // 10개씩 페이지네이션
        }
        setNotices(data.results);
        setTotalPages(Math.ceil(data.count / 10)); // 10개씩 페이지네이션
      })
      .catch((error) => {
        console.log(error);
        setNotices([]); // 오류 발생 시 notices를 빈 배열로 설정
      });
  }, []);

  // const handlePageChange = (page) => {
  //   setCurrentPage(page);
  // };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div >
      

      <div className='top'>
      <h3>공지사항</h3>
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              &lt;
            </button>
          </li>
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              &gt;
            </button>
          </li>
        </ul>
      </nav>  
      </div>


      <table className="table table-striped table-hover table-sm" >
        <thead className="thead-dark">
          <tr>
            <th className='table-secondary'>Link</th>
            {/* <th>작성자</th>
            <th>작성 날짜</th> */}
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.specific_id}>
              <td>
                {/* <a href={notice.link} target="_blank" rel="noreferrer">
                  {notice.title}
                </a> */}
                <a href={notice.link} target="_blank" rel="noreferrer" data-toggle="tooltip" title={notice.link}>
                  {notice.title.length > 50 ? notice.title.substring(0, 50) + '...' : notice.title}
                </a>
              </td>
              {/* <td>{notice.author}</td>
              <td>{notice.created_date}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
      
      <div className="d-flex justify-content-center">
        {/* <nav>
          <ul className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav> */}
        
      </div>
      
    </div>
  );
};

export default ClubNotice;
