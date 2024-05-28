import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import ClubHeader from './Club_head';

const ClubPosts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('all');
  const [order, setOrder] = useState('latest');
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clubName = queryParams.get('clubName');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/club_board/club_posts/`, {
          params: {
            club_name: clubName,
            category: category === 'all' ? 'all' : category,
            order: order === 'created_data' ? 'created_data' : order
          }
        });
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, order]);

  if (loading) return <Typography>로딩 중...</Typography>;
  // if (error) return <Typography>오류 발생: {error.message}</Typography>;

  return (
    <div className='board-container'>
      <ClubHeader clubName={clubName} />
      <h3 className='club-head-text'>헬스맨 게시판</h3>
      <Typography variant="h4"></Typography>
      {/* 카테고리 선택 */}
      <Button onClick={() => setCategory('all')} variant={category === 'all' ? 'contained' : 'outlined'}>전체</Button>
      <Button onClick={() => setCategory('notice')} variant={category === 'notice' ? 'contained' : 'outlined'}>공지</Button>
      <Button onClick={() => setCategory('board')} variant={category === 'board' ? 'contained' : 'outlined'}>게시판</Button>
      {/* 정렬 선택 */}
      <Button onClick={() => setOrder('latest')} variant={order === 'latest' ? 'contained' : 'outlined'}>작성순</Button>
      <Button onClick={() => setOrder('views')} variant={order === 'views' ? 'contained' : 'outlined'}>조회순</Button>
      <Button onClick={() => setOrder('comments')} variant={order === 'comments' ? 'contained' : 'outlined'}>댓글순</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>작성일</TableCell>
            <TableCell>제목</TableCell>
            <TableCell>작성자</TableCell>
            <TableCell>조회수</TableCell>
            <TableCell>추천수</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {posts.map(post => (
            <TableRow key={post.id} onClick={() => navigate(`/club_board/post_detail/${post.id}/`)} style={{ cursor: 'pointer' }}>
              <TableCell>{post.id}</TableCell>
              <TableCell>{new Date(post.created_date).toLocaleDateString()}</TableCell>
              <TableCell>{post.title}</TableCell>
              <TableCell>{post.author}</TableCell>
              <TableCell>{post.view_cnt}</TableCell>
              <TableCell>{post.recommended_cnt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClubPosts;
