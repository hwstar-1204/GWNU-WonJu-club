import React, { useState } from 'react';
import './SignupDetailPage.css'; // 스타일시트 임포트

function SignupDetail() {
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    password: '',
    confirmPassword: '',
    email: '',
    emailDomain: 'gwnu.ac.kr', // 기본 이메일 도메인 설정
    phoneNumber: '',
    grade: '1', // 학년 기본값을 1학년으로 설정
    department: '',
  });
  const [passwordError, setPasswordError] = useState(false);
  const [isStudentIdRegistered, setIsStudentIdRegistered] = useState(false);
  const [messageColor, setMessageColor] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(formData.password !== value && name === 'confirmPassword');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
      // TODO: 폼 제출 로직을 여기에 구현합니다.
      handleSignup(); // 회원가입 함수 호출
    }
  };

  const handleEmailVerification = () => {
    // 이메일 주소 유효성 검사 정규식
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // 이메일 주소 유효성 검사
    if (!formData.email.match(emailPattern)) {
      console.log('유효하지 않은 이메일 주소입니다.');
      return; // 이메일 주소가 유효하지 않으면 함수 종료
    }

    // 이메일 전송
    fetch('/api/sendEmailVerification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.email }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('이메일을 전송했습니다. 이메일을 확인해주세요.');
          // 이메일 전송 성공 시 인증 완료 메시지 표시 등의 작업 추가
        } else {
          console.error('이메일 전송에 실패했습니다.');
          // 이메일 전송 실패 시 에러 메시지 표시 등의 작업 추가
        }
      })
      .catch((error) => {
        console.error('이메일 전송 중 오류가 발생했습니다.', error);
        // 이메일 전송 오류 시 에러 메시지 표시 등의 작업 추가
      });
  };

  const handleCheckStudentId = () => {
    // 여기서 가입된 학번을 확인하는 로직을 구현합니다.
    // 가입된 학번이 있다면 setIsStudentIdRegistered(true)로 설정합니다.
    // 가입된 학번이 없다면 setIsStudentIdRegistered(false)로 설정합니다.
    const registeredStudentIds = ['20231864']; // 임의의 가입된 학번 데이터
    const isRegistered = registeredStudentIds.includes(formData.studentId);
    setIsStudentIdRegistered(isRegistered);
    setMessageColor(isRegistered ? 'red' : 'green');
  };

  const handleEmailVerificationClick = () => {
    handleEmailVerification();
  };

  const handleSignup = () => {
    // 필수 입력 필드를 배열로 정의
    const requiredFields = ['name', 'studentId', 'password', 'confirmPassword', 'email', 'phoneNumber'];

    // 입력되지 않은 필드 확인
    const missingFields = requiredFields.filter(field => !formData[field]);

    // 입력되지 않은 필드가 있는 경우 알림 표시
    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')}을(를) 입력해주세요.`);
      return;
    }

    // 모든 필수 정보가 입력되었을 때 회원가입 완료 메시지 표시
    alert('회원가입이 완료되었습니다.');
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
          <button type="button" onClick={handleCheckStudentId}>중복확인</button>
          {isStudentIdRegistered && (
            <p style={{ color: messageColor }}>
              {isStudentIdRegistered ? '이미 가입된 아이디(학번)입니다.' : '사용 가능한 아이디(학번)입니다.'}
            </p>
          )}
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
        </label>
        @
        <select name="emailDomain" value={formData.emailDomain} onChange={handleInputChange}>
          <option value="gwnu.ac.kr">gwnu.ac.kr</option> {/* 학교 이메일 도메인 */}
          {/* 다른 도메인 옵션들을 여기에 추가할 수 있습니다 */}
        </select>
        <label>
          휴대폰 번호
          <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} />
        </label>
        <button type="button" onClick={handleEmailVerificationClick}>이메일 인증하기</button>
        <label>
          학년/학과
          <select name="grade" value={formData.grade} onChange={handleInputChange}>
            <option value="1">1학년</option>
            <option value="2">2학년</option>
            <option value="3">3학년</option>
            <option value="4">4학년</option>
          </select>
          <select name="department" value={formData.department} onChange={handleInputChange}>
            <option value="1">유아교육과</option>
            <option value="1">간호학과</option>
            <option value="1">사회복지학과</option>
            <option value="1">다문화학과</option>
            <option value="1">컴퓨터공학과</option>
            <option value="1">멀티미디어공학과</option>
            <option value="1">기계공학과</option>
            <option value="1">자동차공학과</option>
            <option value="1">전기공학과</option>
            <option value="1">정보통신공학과</option>
            <option value="1">산업경영공학과</option>
          </select>
        </label>
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}

export default SignupDetail;