//ClubNotice.js
import React, { useEffect, useState } from 'react';
import '../Main_Style/ClubNotice.css';
import '../../global.css';

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
        setNotices(data.results);
        setTotalPages(Math.ceil(data.count / 10));
      })
      .catch((error) => {
        setNotices([]);
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="notice-section">
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
      <table className="table table-striped table-hover table-sm">
        <thead className="thead-dark">
          <tr>
            <th className='table-secondary'>Link</th>
          </tr>
        </thead>
        <tbody>
          {notices.map((notice) => (
            <tr key={notice.specific_id}>
              <td>
                <a href={notice.link} target="_blank" rel="noreferrer" data-toggle="tooltip" title={notice.link}>
                  {notice.title.length > 50 ? notice.title.substring(0, 50) + '...' : notice.title}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClubNotice;
