import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './Main/MainPage';
import LoginPage from './Login/LoginPage';
import PrivacyPolicyPage from './Signup/PrivacyPolicyPage';
import SignupDetailPage from './Signup/SignupDetailPage';
import ResetPasswordPage from './Login/ResetPasswordPage';
import MyPage from './Mypage/Mypage';
import MainLater from './Main/Main-later';
import Editinformation from './Mypage/EditInformation';
import Changepassword from './Mypage/ChangePassword';

import { UserProvider } from './UserContext';
import CategoryPage from './Main/CategoryPage'; // 카테고리 페이지 import 추가
import ClubIntroducePage from './clubintroduce/ClubIntroducePage'; // 동아리 소개 페이지 import 추가
import MyClub from './Mypage/Myclub';
import CreateClubPage from './CreateClub/CreateClubPage';
import CreateEventPage from './Event/CreateEventPage';

import SignupPage2 from './TestPage/SignUpPage2';
import LoginPage2 from './TestPage/LoginPage2';
import UserDetail from './TestPage/UserDetail';

function App() {
  return (
    <UserProvider>
      <Routes>
        {/* <Route path="/login" element={<LoginPage />} /> */}
        {/* <Route path="/signup" element={<PrivacyPolicyPage />} /> */}
        <Route path="/signup/details" element={<SignupDetailPage />} />
        <Route path="/login/reset-password" element={<ResetPasswordPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/main-later" element={<MainLater />} />
        <Route path="/editif" element={<Editinformation />} />
        <Route path="/change-password" element={<Changepassword />} />
        <Route path="/category" element={<CategoryPage />} /> {/* 카테고리 페이지에 대한 Route 추가 */}
        {/* <Route path="/club-introduce" element={<ClubIntroducePage />} /> 동아리 소개 페이지에 대한 Route 추가 */}
        <Route path="/club_introduce/club_list/" element={<ClubIntroducePage />} /> {/* 동아리 소개 페이지에 대한 Route 추가 */}
        <Route path="/club_introduce/club_list/category_club/:category_id" element={<ClubIntroducePage />} />
        <Route path="/club_introduce/apply_club/" element={<ClubIntroducePage />} />
        <Route path="/createclub" element={<CreateClubPage />} />
       <Route path="/createevent" element={<CreateEventPage />} />

       <Route path="/login" element={<LoginPage2 />}></Route>
        <Route path="/signup" element={<SignupPage2 />}></Route>
        <Route path="/user" element={<UserDetail/>}></Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
