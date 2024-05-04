import { useLocation } from 'react-router-dom';



const EmailConfirm = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const email = searchParams.get('email');

    return (
        <div className="container py-5">
            <p>인증 메일이 {email} (으)로 전송되었습니다.</p>
            <p>받으신 이메일을 열어 버튼을 클릭하면 가입이 완료됩니다.</p>

            <br/><br/>
            <a href="/login">로그인 하러 가기</a>
              
        </div>
        
    )
}

export default EmailConfirm