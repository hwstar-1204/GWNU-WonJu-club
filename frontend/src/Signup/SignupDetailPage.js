// SignupDetailPage.js

import React, { useState } from 'react';
import './SignupDetailPage.css'; // 스타일시트 임포트

function SignupDetail() {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    email: '',
    emailDomain: '',
    phoneNumber: '',
    grade: '4', // 기본값으로 '4학년'을 설정
    department: '', // 학과 데이터
  });
  const [passwordError, setPasswordError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 비밀번호 확인 로직
    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(formData.password !== value && name === 'confirmPassword');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 비밀번호 일치 여부 확인
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      // TODO: 폼 제출 로직을 여기에 구현합니다.
    }
  };

  const handleEmailVerification = () => {
    // TODO: 이메일 인증 로직을 구현합니다.
    console.log('이메일 인증하기');
  };

  return (
    <div className="signup-form-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <label>
          이름
          <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
        </label>
        <label>
          아이디(학번)
          <input type="text" name="studentId" value={formData.studentId} onChange={handleInputChange} />
          <button type="button">중복확인</button>
        </label>
        <label>
          비밀번호
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={passwordError ? 'error' : ''}
          />
        </label>
        <label>
          비밀번호 확인
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={passwordError ? 'error' : ''}
          />
          {passwordError && <p className="password-error">비밀번호가 일치하지 않습니다.</p>}
        </label>
        <label>
          이메일
          <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
          <select name="emailDomain" value={formData.emailDomain} onChange={handleInputChange}>
            {/* 이메일 도메인 옵션 */}
          </select>
        </label>
        <label>
          휴대폰 번호
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleEmailVerification}>이메일 인증하기</button>
        <label>
          학년/학과
          <select name="grade" value={formData.grade} onChange={handleInputChange}>
            {/* 학년 옵션 */}
          </select>
          <select name="department" value={formData.department} onChange={handleInputChange}>
            {/* 학과 옵션 */}
          </select>
        </label>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignupDetail;
