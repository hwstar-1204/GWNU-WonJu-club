import React from 'react';
import { Route } from 'react-router-dom';
import MainPage from '../Main/Main_Component/MainPage';
import LoginPage2 from '../TestPage/LoginPage2';
import Myclub from '../Mypage/Myclub';
import MyPage from '../Mypage/Mypage';
import EventPage from '../Event/Event_Component/EventPage';
import CreateClubPage from '../CreateClub/CreateClubPage';
import ClubPage from '../Club/ClubPage';
import ClubMember from '../Club/Club_Component/Club_members';
import ClubAlbum from '../Club/Club_Component/Club_gallery';
import ClubEvent from '../Club/Club_Component/Club_event';
import ClubPosts from '../Club/Club_Component/Club_board';
import PostMain from '../Board/free_posts/free_posts_Component/PostMain';
import PostView from '../Board/free_posts/free_posts_Component/PostView';
import WritePost from '../Board/free_posts/free_posts_Component/WritePost';
import SignUpPage from '../TestPage/SignUpPage';
import UserDetail from '../TestPage/UserDetail';
import NotFound from '../TestPage/NotFound';
import ClubIntroducePage from '../Club_Introduce/ClubIntroducePage';

export const AppRoutes = () => (
  <>
    <Route path="/" element={<MainPage />} />
    <Route path="/login" element={<LoginPage2 />} />
    <Route path="/myclub" element={<Myclub />} />
    <Route path="/mypage/*" element={<MyPage />} />
    <Route path="/eventpage/*" element={<EventPage />} />
    <Route path="/clubpage/*" element={<ClubPage />} />
    <Route path="/club_information/club/:club_name/home/" element={<ClubPage />} />
    <Route path="/club_information/club/:club_name/members/" element={<ClubMember />} />
    <Route path="/club_information/club/:club_name/albums/" element={<ClubAlbum />} />
    <Route path="/club_information/club/:club_name/events/" element={<ClubEvent />} />
    <Route path="/create_club" element={<CreateClubPage/>} />
    <Route path="/club_board/club_posts/" element={<ClubPosts />} />
    {/* <Route path='/postView/:no' element={<PostView />} /> */}
    <Route path='/club_board/*' element={<PostMain/>} />
    {/* <Route path="/write" element={<WritePost />} /> */}
    <Route path="signup/*" element={<SignUpPage />} />
    <Route path="/user" element={<UserDetail />} />
    <Route path='*' element={<NotFound />} />
    <Route path="/club-introduce" element={<ClubIntroducePage />} />
  </>
);