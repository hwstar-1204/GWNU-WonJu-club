// PrivacyPolicyPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PrivacyPolicyPage.css'; // CSS 파일 import

function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);

  const handleAgree = () => {
    if (agree) {
      navigate('/signup/details');
    } else {
      alert('개인정보 처리방침에 동의해야 합니다.');
    }
  };

  return (
    <div className="privacy-policy-container">
      <h1 className="privacy-policy-title">개인정보 처리방침</h1>
      <div className="privacy-policy-content">
        <p>본 개인정보 처리방침은 OO대학교가 운영하는 모든 서비스에 적용됩니다...</p>
        {/* 여기에 실제 개인정보 처리방침의 내용을 HTML로 추가합니다. */}
      </div>
      <div className="privacy-policy-agreement">
        <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          개인정보 처리방침에 동의합니다.
        </label>
      </div>
      <button className="agree-button" onClick={handleAgree}>동의하고 계속하기</button>
    </div>
  );
}

export default PrivacyPolicyPage;
