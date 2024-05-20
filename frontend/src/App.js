import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import TopScreen from './Header/TopScreen';
import MainPage from './Main/Main_Component/MainPage';
import MyPage from './Mypage/Mypage';
import { UserProvider } from './UserContext';
import CategoryPage from './Header/CategoryPage'; // 카테고리 페이지 import 추가
import ClubIntroducePage from './Club_Introduce/ClubIntroducePage'; // 동아리 소개 페이지 import 추가
import Myclub from './Mypage/Myclub';
import CreateClubPage from './CreateClub/CreateClubPage';
import CreateEventPage from './Event/Event_Component/CreateEventPage';
import EventPage from './Event/Event_Component/EventPage';
import ClubPage from './Club/ClubPage';
import PostMain from './club_board/free_posts/free_posts_Component/PostMain';
import SignUpPage from './TestPage/SignUpPage';
import LoginPage2 from './TestPage/LoginPage2';
import UserDetail from './TestPage/UserDetail';
import NotFound from './TestPage/NotFound';
import './App.css';
// import LoginPage from './Login/LoginPage';
// import PrivacyPolicyPage from './Signup/PrivacyPolicyPage';
// import SignupDetailPage from './Signup/SignupDetailPage';
// import ResetPasswordPage from './Login/ResetPasswordPage';
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className='content'>
    <TopScreen/>
    <CategoryPage/>
    <div className='content-main'>
    <UserProvider>
      <Routes>

        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage2 setIsLoggedIn={setIsLoggedIn}/>}/>  {/*백엔드 서버 사용시 로그인*/}
        {/* <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} /> */}  {/*프론트 서버 사용시 로그인*/}
        <Route path="/myclub" element={<Myclub />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/eventpage/*" element={<EventPage />} />
        <Route path="/clubpage/*" element={<ClubPage />} />
        <Route path="/category" element={<CategoryPage />} /> 
        <Route path="/club-introduce" element={<ClubIntroducePage />} /> 
        <Route path="/club_introduce/club_list/" element={<ClubIntroducePage />} /> 
        <Route path="/club_introduce/club_list/category_club/:category_id" element={<ClubIntroducePage />} />
        <Route path="/club_introduce/apply_club/" element={<ClubIntroducePage />} />
        <Route path="/createclub" element={<CreateClubPage />} />
       <Route path="/createevent" element={<CreateEventPage />} />
        <Route path='/club_board/*' element={<PostMain/>} />
        <Route path="signup/*" element={<SignUpPage/>}/>
        <Route path="/user" element={<UserDetail/>}/>
        <Route path='*' element={<NotFound/>}/>

               {/* <Route path="/signup" element={<PrivacyPolicyPage />} /> */}
        {/* <Route path="/signup/details" element={<SignupDetailPage />} /> */}
        {/* <Route path="/login/reset-password" element={<ResetPasswordPage />} /> */}
      </Routes>
    </UserProvider>
    </div>
    </div>
  );
}

export default App;
