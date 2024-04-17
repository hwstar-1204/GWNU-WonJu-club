import React, { useState } from 'react';
import './ResetPasswordPage.css'; // CSS 파일 import

const ResetPasswordPage = () => {
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [step, setStep] = useState(1); // 단계를 추적하는 상태 변수 추가

    const handleStudentIdChange = (e) => {
        setStudentId(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleVerificationCodeChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        // 비밀번호 확인 로직
        if (newPassword !== e.target.value) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
        } else {
            setErrorMessage('');
        }
    };

    const handleSendVerificationEmail = () => {
        // Add logic to send verification email
        // 인증 이메일 전송 로직 추가
        setStep(2); // 인증 단계로 이동
    };

    const handleVerifyCode = () => {
        // Add code verification logic here
        // 여기에 코드 확인 로직 추가
        // 인증 코드가 맞으면 인증 완료 단계로 이동, 틀리면 에러 메시지 표시
        if (verificationCode === '1234') {
            setErrorMessage('');
            setStep(3); // 인증 완료 단계로 이동
        } else {
            setErrorMessage('인증코드가 다릅니다.');
        }
    };

    const handleResetPassword = () => {
        // Add logic to reset password
        // 비밀번호 재설정 로직 추가
        setStep(4); // 비밀번호 재설정 단계로 이동
    };

    const handleChangePassword = () => {
        // Add logic to change password
        // 비밀번호 변경 로직 추가
        alert('비밀번호가 변경되었습니다.');
        // 변경 완료 후 초기화
        setStep(1);
        setStudentId('');
        setEmail('');
        setVerificationCode('');
        setNewPassword('');
        setConfirmPassword('');
    };

    return (
        <div className="reset-password-container">
            <h2>비밀번호 재설정</h2>
            {step === 1 && (
                <>
                    <p>본인확인</p>
                    <p>※개인정보보호를 위해 본인확인을 진행합니다.</p>
                    <label htmlFor="studentId">아이디(학번)을 입력해주세요</label>
                    <input type="text" id="studentId" value={studentId} onChange={handleStudentIdChange} />
                    <label htmlFor="email">이메일을 입력해주세요</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} />
                    <button onClick={handleSendVerificationEmail}>이메일 인증하기</button>
                </>
            )}
            {step === 2 && (
                <>
                    <label htmlFor="verificationCode">인증코드</label>
                    <input type="text" id="verificationCode" value={verificationCode} onChange={handleVerificationCodeChange} />
                    <button onClick={handleVerifyCode}>확인</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                </>
            )}
            {step === 3 && (
                <>
                    <p>인증되었습니다.</p>
                    <button onClick={handleResetPassword}>재설정하기</button>
                </>
            )}
            {step === 4 && (
                <>
                    <p>비밀번호 재설정하기</p>
                    <label htmlFor="newPassword">새로운 비밀번호를 입력해주세요</label>
                    <input type="password" id="newPassword" value={newPassword} onChange={handleNewPasswordChange} />
                    <label htmlFor="confirmPassword">비밀번호 확인</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button onClick={handleChangePassword}>변경완료</button>
                </>
            )}
        </div>
    );
};

export default ResetPasswordPage;
