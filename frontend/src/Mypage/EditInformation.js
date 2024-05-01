// import MypageNav from "./MypageNav.js";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./Mypage.css";
import "../Main/TopScreen.js";
import "./Editinformation.css";

const Editinformation = () => {
  const location = useLocation();
  // const userData = location.state ? userData: {};
  const userData = location.state ? location.state.userData : {}; 


  // console.log(userData)

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 시 여기에서 데이터를 처리할 수 있습니다.
    // 예를 들어, 서버로 데이터를 보내거나 다른 작업을 수행할 수 있습니다.
    alert("수정 완료되었습니다");

  };

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

    {/* <TopScreen />
    <CategoryPage /> */}
    {/* <MypageNav userData={userData} /> */}
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">이름:</label>
        <input
          type="text"
          id="name"
          value={userData.name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">이메일:</label>
        <input
          type="email"
          id="email"
          value={userData.email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">휴대전화:</label>
        <input
          type="text"
          id="phone"
          value={userData.phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label htmlFor="study">소속 학과:</label>
        <input
          type="text"
          id="study"
          value={userData.study}
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
