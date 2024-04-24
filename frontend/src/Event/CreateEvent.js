import React, { useState } from 'react';
import { Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const CreateEvent= () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [content, setContent] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);

  const handleImageDelete = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Form submission logic here
    console.log({ title, startDate, endDate, content, thumbnail, images });
  };

  return (
    <Form onSubmit={handleSubmit} style={{ padding: '5px' }}>
      <h2 style={{ fontWeight: 'bold', textAlign: 'left', fontSize: '18px' }}>이벤트 만들기</h2>
      <InputGroup className="mb-3 " style={{ marginBottom: "5%" }}>
        <InputGroup.Text>제목</InputGroup.Text>
        <FormControl
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: "30%" }}
        />
      </InputGroup>
      <InputGroup className="mb-3" style={{ marginBottom: "5%" }}>
        <InputGroup.Text>기간 설정</InputGroup.Text>
        <FormControl
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          style={{ width: "40%" }}
        />
        <FormControl
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </InputGroup>
      <InputGroup className="mb-3" style={{ marginBottom: "5%" }}>
        <InputGroup.Text>내용</InputGroup.Text>
        <FormControl
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ height: '100px' }}
        />
      </InputGroup>
      <InputGroup className="mb-3" style={{ marginBottom: "5%" }}>
        <InputGroup.Text>썸네일</InputGroup.Text>
        <FormControl
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
        />
      </InputGroup>
      <InputGroup className="mb-3" style={{ marginBottom: "5%" }}>
        <InputGroup.Text>사진첨부</InputGroup.Text>
        <FormControl
          type="file"
          multiple
          onChange={(e) => setImages([...images, ...e.target.files])}
        />
        {images.map((image, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(image)} alt={`image-${index}`} width="200" height="240" />
            <Button variant="danger" onClick={() => handleImageDelete(index)}>삭제</Button>
          </div>
        ))}
      </InputGroup>
      <Button variant="primary" type="submit">등록완료</Button>
      <Button variant="secondary" type="button">취소</Button>
    </Form>
  );
};

export default CreateEvent;
