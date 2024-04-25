import CategoryPage from '../Main/CategoryPage';
import MypageNav from './MypageNav';
import './Mypage.css';
import './Myclub.css';
import '../Main/TopScreen.js'
import TopScreen from '../Main/TopScreen.js';
import userData from './Mypage.js';
import { Container, Col } from 'react-bootstrap';
import defaultimage from './logo.png';

const MyClub = () => {

      return (
    
    
    <div className="my-page">
        <TopScreen />
        <CategoryPage />
        
         <h1 className = "mypage-header">마이페이지 </h1>
        <MypageNav userData={userData} />
        <h1 className = "myclub-header">내 동아리 관리 </h1>
        
<Container>
    <Col>
    
    <img src={defaultimage} alt="logo" className="club-logo1"/>

    </Col>
</Container>


</div>
      
  );
};

export default MyClub;
