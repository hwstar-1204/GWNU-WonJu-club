import React, { useState } from 'react';
import './SignupDetailPage.css'; // 스타일시트 임포트
import { useNavigate } from 'react-router-dom'; // useNavigate 임포트
import axios from 'axios'


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
    verificationCode: '', // 추가: 인증코드 상태값
    showVerificationInput: false, // 추가: 인증코드 입력란 표시 여부
  });
  const [passwordError, setPasswordError] = useState(false);
  const [isStudentIdRegistered, setIsStudentIdRegistered] = useState(false);
  const [messageColor, setMessageColor] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(''); // 변경: 비밀번호 오류 메시지 상태 추가
  const [verificationErrorMessage, setVerificationErrorMessage] = useState(''); // 추가: 인증코드 오류 메시지 상태 추가
  const [isCodeVerified, setIsCodeVerified] = useState(false); // 추가: 코드 확인 상태값
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 비밀번호 규칙을 위한 정규 표현식
  const regexSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const regexNumber = /\d/; // 최소 하나의 숫자가 있는지 확인
  const regexAlphabet = /[a-zA-Z]/; // 최소 하나의 알파벳이 있는지 확인

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password' || name === 'confirmPassword') {
      setPasswordError(formData.password !== value && name === 'confirmPassword');

      // 비밀번호 규칙 검사
      if (
        value.length < 8 ||
        !regexSpecialChar.test(value) ||
        !regexNumber.test(value) ||
        !regexAlphabet.test(value)
      ) {
        setPasswordErrorMessage('비밀번호는 특수문자 1개 이상, 숫자 및 영문자를 포함하여 8자 이상이어야 합니다.'); // 변경: 비밀번호 오류 메시지 설정
        setPasswordError(true);
      } else {
        setPasswordErrorMessage('');
        setPasswordError(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword || passwordError) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호가 일치하지 않거나 규칙을 위반합니다.'); // 변경: 비밀번호 오류 메시지 설정
    } else {
      setPasswordError(false);
      setPasswordErrorMessage(''); // 변경: 비밀번호 오류 메시지 초기화
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
    const registeredStudentIds = ['20231864']; // 임의의 가입된 학번 데이터
    const isRegistered = registeredStudentIds.includes(formData.studentId);
    setIsStudentIdRegistered(isRegistered);
    
    // 이미 가입된 학번일 때와 가입되지 않은 학번일 때 각각 메시지 설정
    if (isRegistered) {
      setMessageColor('red');
      setPasswordErrorMessage('이미 가입된 아이디(학번)입니다.');
    } else {
      setMessageColor('green');
      setPasswordErrorMessage('사용 가능한 아이디(학번)입니다.');
    }
  };
  
  
  const handleEmailVerificationClick = () => {
    handleEmailVerification();
    setFormData({ ...formData, verificationCode: '', showVerificationInput: true }); // 인증코드 입력란 보여주기
  };
  
  const handleCodeVerification = () => {
    // 실제로는 이곳에서 서버로부터 인증코드를 검증하고 결과를 처리합니다.
    // 여기서는 간단히 입력한 코드와 임의의 코드를 비교하여 처리합니다.
    const mockCode = '123456'; // 임의의 인증코드
    if (formData.verificationCode === mockCode) {
      setIsCodeVerified(true);
      setMessageColor('green');
      setVerificationErrorMessage('인증 완료'); // 추가: 인증 완료 메시지 설정
    } else {
      setIsCodeVerified(false);
      setMessageColor('red');
      setVerificationErrorMessage('인증코드가 일치하지 않습니다.'); // 추가: 인증코드 오류 메시지 설정
    }
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

    // 인증코드 확인 여부를 검사하여 회원가입 완료 처리
    if (isCodeVerified) {
      alert('회원가입이 완료되었습니다.');
      navigate('/main'); // 회원가입 완료 후 메인 페이지로 이동
    } else {
      alert('인증코드를 확인해주세요.');
    }
  };

  const handleFormSubmit = async () => {
    console.log("실행시작")
    try {
      // 변수명 변경
      const modifiedData = {
        email: formData.email + '@' + formData.emailDomain,
        password1: formData.password,
        password2: formData.confirmPassword,
        name: formData.name,
        user_student_id: formData.studentId,
        grade: formData.grade,
        study: formData.department,
        gender: true,
        phone: formData.phoneNumber,
      };
      // 폼 데이터를 서버로 전송
      const response = await axios.post('http://localhost:8000/club_account/registration/', formData);

      // 서버로부터의 응답을 처리
      console.log('서버 응답:', response.data);
      
      // 성공적으로 데이터를 전송하고 응답을 받았을 때 추가적인 작업을 수행할 수 있습니다.
    } catch (error) {
      // 데이터 전송 중 오류가 발생한 경우
      console.error('데이터 전송 오류:', error);
      
      // 오류 처리를 위한 추가적인 작업을 수행할 수 있습니다.
    }
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


{isStudentIdRegistered !== null && formData.studentId !== '' && (
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
          {passwordError && <p className="password-error">{passwordErrorMessage}</p>} {/* 변경: 비밀번호 오류 메시지 출력 */}
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
        {/* 인증코드 입력란 */}
        <button type="button" onClick={handleEmailVerificationClick}>이메일 인증하기</button>
        {formData.showVerificationInput && (
          <div className="verification-code">
            <input
              type="text"
              name="verificationCode"
              placeholder="인증코드를 입력하세요"
              value={formData.verificationCode}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleCodeVerification}>확인</button>
            {verificationErrorMessage && <p style={{ color: messageColor }}>{verificationErrorMessage}</p>} {/* 추가: 인증코드 오류 메시지 출력 */}
          </div>
        )}
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
            <option value="2">간호학과</option>
            <option value="3">사회복지학과</option>
            <option value="4">다문화학과</option>
            <option value="5">컴퓨터공학과</option>
            <option value="6">멀티미디어공학과</option>
            <option value="7">기계공학과</option>
            <option value="8">자동차공학과</option>
            <option value="9">전기공학과</option>
            <option value="10">정보통신공학과</option>
            <option value="11">산업경영공학과</option>
          </select>
        </label>
        <button type="submit" onclick={handleFormSubmit}>회원가입</button>
      </form>
    </div>
  );
}

export default SignupDetail;