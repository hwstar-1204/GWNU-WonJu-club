import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Main_Style/CreateNotice.css';
import { Button, Input, Form, FormGroup, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const CreateNotice = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/'); // Adjust this to your main notice board route
  };

  const handleCreate = () => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/club_board/notice/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      },
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    })
      .then(response => {
        if (response.ok) {
          navigate('/');
        } else {
          alert('Failed to create notice');
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="create-notice-container">
      <h3 className="title">게시판</h3>
      <Form>
        <FormGroup>
          <Label for="title">제목</Label>
          <Input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요"
          />
        </FormGroup>
        <FormGroup>
          <Label for="content">내용</Label>
          <Input
            type="textarea"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해주세요"
          />
        </FormGroup>
        <div className="buttons">
          <Button color="secondary" onClick={handleCancel}>취소</Button>
          <Button color="primary" onClick={handleCreate}>작성</Button>
        </div>
      </Form>
    </div>
  );
};

export default CreateNotice;
