import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1">404</h1>
      <p className="lead">페이지를 찾을 수 없습니다.</p>
      <p>원하는 페이지를 찾을 수 없습니다. 다시 시도하거나 홈페이지로 돌아가세요.</p>
      <Link to="/" className="btn btn-primary">홈으로 돌아가기</Link>
    </div>
  );
}

export default NotFound;
