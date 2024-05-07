import MypageNav from './MypageNav.js';
import '../Mypage_Style/Mypage.css';
import '../Mypage_Style//Myclub.css';
import userData from '../Mypage_Component/Mypage.js';
import { Container, Col } from 'react-bootstrap';
import defaultimage from '../Mypage_assets/logo.png';

const MyClub = () => {

      return (
    
    
    <div className="my-page">
         <h1 className = "mypage-header">마이페이지</h1>
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
