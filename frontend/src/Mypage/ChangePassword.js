import { Container, Form, Button } from "react-bootstrap";
import "./ChangePassword.css";
// Import a library for password encryption
// import bcrypt from "bcryptjs";

import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  // const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 변경 로직을 수행합니다.
    // 여기서는 간단하게 새 비밀번호와 새 비밀번호 확인이 일치하는지만 확인하도록 하겠습니다.
    if (newPassword === confirmNewPassword) {
      // 비밀번호 변경 성공 시, 다른 페이지로 이동하거나 작업을 수행할 수 있습니다.
      alert('비밀번호가 성공적으로 변경되었습니다.');
      // history.push('/mypage'); // 비밀번호 변경 후 마이페이지로 이동
    } else {
      alert('새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.');
    }
  };

  return (
    <div>
      <h1>비밀번호 변경</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">현재 비밀번호:</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="newPassword">새 비밀번호:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmNewPassword">새 비밀번호 확인:</label>
          <input
            type="password"
            id="confirmNewPassword"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">비밀번호 변경</button>
      </form>
    </div>
  );
};

export default ChangePassword;
