import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import TopScreen from './Header/TopScreen';
import MainPage from './Main/Main_Component/MainPage';
import LoginPage from './Login/LoginPage';
import PrivacyPolicyPage from './Signup/PrivacyPolicyPage';
import SignupDetailPage from './Signup/SignupDetailPage';
import ResetPasswordPage from './Login/ResetPasswordPage';
import MyPage from './Mypage/Mypage_Component/Mypage';
import Editinformation from './Mypage/Mypage_Component/EditInformation';
import Changepassword from './Mypage/Mypage_Component/ChangePassword';

import { UserProvider } from './UserContext';
import CategoryPage from './Header/CategoryPage'; // 카테고리 페이지 import 추가
import ClubIntroducePage from './clubintroduce/ClubIntroducePage'; // 동아리 소개 페이지 import 추가
import Myclub from './Mypage/Mypage_Component/Myclub';
import CreateClubPage from './CreateClub/CreateClubPage';
import CreateEventPage from './Event/Event_Component/CreateEventPage';
import EventPage from './Event/Event_Component/EventPage';
import ClubPage from './Club/ClubPage';
import PostMain from './club_board/free_posts/free_posts_Component/PostMain';
import PostView from './club_board/free_posts/free_posts_Component/PostView';
import WritePost from './club_board/free_posts/free_posts_Component/WritePost';

import SignUpPage from './TestPage/SignUpPage';
import LoginPage2 from './TestPage/LoginPage2';
import UserDetail from './TestPage/UserDetail';
import NotFound from './TestPage/NotFound';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
    <TopScreen isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    <CategoryPage/>
    <UserProvider>
      <Routes>
      <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
       <Route path="/signup" element={<PrivacyPolicyPage />} />
        <Route path="/signup/details" element={<SignupDetailPage />} />
        <Route path="/login/reset-password" element={<ResetPasswordPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/myclub" element={<Myclub />} />
        <Route path="/mypage/*" element={<MyPage />} />
        <Route path="/editif" element={<Editinformation />} />
        <Route path="/change-password" element={<Changepassword />} />
        <Route path="/eventpage/*" element={<EventPage />} />
        <Route path="/clubpage/*" element={<ClubPage />} />
        <Route path="/category" element={<CategoryPage />} /> {/* 카테고리 페이지에 대한 Route 추가 */}
        <Route path="/club-introduce" element={<ClubIntroducePage />} /> 
        <Route path="/club_introduce/club_list/" element={<ClubIntroducePage />} /> {/* 동아리 소개 페이지에 대한 Route 추가 */}
        <Route path="/club_introduce/club_list/category_club/:category_id" element={<ClubIntroducePage />} />
        <Route path="/club_introduce/apply_club/" element={<ClubIntroducePage />} />
        <Route path="/createclub" element={<CreateClubPage />} />
       <Route path="/createevent" element={<CreateEventPage />} />
       <Route path='/postView/:no' element={<PostView />} />
        <Route path='/club_board' element={<PostMain/>} />
        <Route path="/write" element={<WritePost/>} />
        <Route path="/login" element={<LoginPage2 />}/>
        <Route path="signup/*" element={<SignUpPage/>}/>
        <Route path="/user" element={<UserDetail/>}/>
        <Route path='*' element={<NotFound/>}/>

      </Routes>
    </UserProvider>
    </div>
  );
}

export default App;
