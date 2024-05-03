// import MypageNav from "./MypageNav.js";
import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import "./Mypage.css";
import "../Main/TopScreen.js";
import "./Editinformation.css";

const Editinformation = () => {
  const location = useLocation();
  // const userData = location.state ? userData: {};
  // const token = location.state ? token: {};

  // const { userData, token } = location.state;
  const userData = location.state ? location.state.userData : {}; 
  const [token, setToken] = useState(localStorage.getItem('token'));

  const headers = {
    Authorization: `Token ${token}`
  };

  const [name, setName] = useState(userData.name);
  const [email, setEmail] = useState(userData.email);
  const [phone, setPhone] = useState(userData.phone);
  const [study, setStudy] = useState(userData.study);
  
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    
  }, []);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedUserData = {

            email: email,
            name: name,
            // student_id: 20191424,
            // grade: 4,
            study: study,
            // gender: '남자 ',
            phone: phone,
            
        };

        const response = await fetch('http://127.0.0.1:8000/club_account/user/', {
            method: 'PATCH',
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUserData)
        });

        const data = await response.json();

        if (response.ok) {
            alert('수정 완료되었습니다.');
            // navigate('/main'); // 회원가입 완료 후 메인 페이지로 이동
            window.location.replace('http://localhost:3000/mypage');
        } else {
            console.error('수정 실패:', data);
            // 실패한 경우에 대한 적절한 처리 추가
        }
    } catch (error) {
        console.error('네트워크 오류:', error);
        // 네트워크 오류 등 예외 상황에 대한 적절한 처리 추가
    }
};

  const updateUser = async () => {
    try {
      const response = await axios.patch('http://127.0.0.1:8000/club_account/user/', {
        headers: {
          Authorization: `Token ${token}`
        },
        body: JSON.stringify(updatedUserData)
      });
      const data = response.data;
      console.log(data)
      
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  // const updateDetails = async (token, updatedUserData) => {
  //   try {
  //     const headers = {
  //       Authorization: `Token ${token}`
  //     };
  //     const body = updatedUserData;

  //     const response = await axios.patch('http://127.0.0.1:8000/club_account/user/',updatedUserData )
  //     const data = response.data;

  //     console.log(data)
  //     console.log("수정완료")
      
  //   } catch (error) {
  //     console.error('Error fetching user details:', error);
  //   }
  // };


  // return (
  //   <div className="my-page">
      


  //     <Container>
  //       <h1 className="register-info">이용정보 등록</h1>
  //       <Form>
  //         <GenderSelection />
  //         <BirthdayInput />

  //         <div className="edit-button-container">
  //           <Button
  //             variant="primary"
  //             type="button"
  //             className="editif-button"
  //             onClick={handleEditComplete}
  //           >
  //             수정 완료
  //           </Button>
  //           <Button variant="secondary" type="button" className="cancel-button">
  //              <Link to="/mypage" className="cancel">
  //               취소
  //             </Link>
  //           </Button>
  //         </div>
  //       </Form>
  //       {/* 수정 완료 시 알림 표시 */}
  //     </Container>
  //   </div>

  // );

  return (
  <div className="my-page">

    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">휴대전화:</label>
        <input
          type="text"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="study">소속 학과:</label>
        <input
          type="text"
          id="study"
          value={study}
          onChange={(e) => setStudy(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">저장</button>
    </form>
  </div>
  );
};

export default Editinformation;
