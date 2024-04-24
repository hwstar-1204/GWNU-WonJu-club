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
        <p>
        <strong>※강릉원주대학교 원주캠퍼스 동아리(강원동) 개인정보 처리방침</strong>
        <br />
        <br />
          <strong>1. 수집하는 개인정보 항목:</strong>
          <br />
          가입 시 수집되는 개인정보:
          <ul>
            <li>성명</li>
            <li>학번</li>
            <li>전화번호</li>
            <li>이메일 주소</li>
            <li>주소 등</li>
          </ul>
          활동 및 이벤트 참여 시 수집되는 개인정보:
          <ul>
            <li>참여 의사 확인</li>
            <li>응모 정보</li>
            <li>수상 내역 등</li>
          </ul>
          기타 동아리 활동 관련 정보:
          <ul>
            <li>활동 내용</li>
            <li>회의록</li>
            <li>사진 및 영상 자료 등</li>
          </ul>
        </p>
        <p>
          <strong>2. 개인정보의 수집 및 이용목적:</strong>
          <br />
          동아리 회원 관리: 회원 명단 작성, 연락처 관리, 활동 참여 현황 파악
          <br />
          활동 안내 및 공지: 동아리 활동 일정 및 이벤트 안내, 중요 공지 전달
          <br />
          외부 홍보 및 활동 보도: 동아리 활동 소개, 성과 및 활동 보도 자료 제작 및 배포
        </p>
        <p>
          <strong>3. 개인정보의 보유 및 이용기간:</strong>
          <br />
          회원 탈퇴 시까지 또는 동아리 활동 종료 후 필요한 경우에 한하여 보유
          <br />
          보존기간 종료 시 개인정보는 안전하게 파기되며, 복구 및 재이용이 불가능한 방법으로 파기
        </p>
        <p>
          <strong>4. 개인정보의 파기절차 및 방법:</strong>
          <br />
          개인정보 수집 및 이용목적 달성 후 즉시 파기 또는 보존기간 종료 시 파기
          <br />
          파기 시 안전한 방법으로 기록된 개인정보는 기록물 파쇄기를 통해 파기
        </p>
        <p>
          <strong>5. 개인정보의 제3자 제공:</strong>
          <br />
          동아리 외부에서의 제3자 제공은 회원의 동의를 받은 경우에 한해 제공
          <br />
          제3자 제공 시에는 제공 목적, 제공 정보 항목, 제공 대상자 등을 명확히 고지하고 동의를 받음
        </p>
        <p>
          <strong>6. 개인정보 보호책임자 연락처:</strong>
          <br />
          총무과 담당자 : 최무옹
          <br />
          전화번호: 033-760-8107
          이메일: mwchoi@gwnu.ac.kr
        </p>
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
