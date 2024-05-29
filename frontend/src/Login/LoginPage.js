// components/user/LoginPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../redux/actions/authActions';
import { useNavigate, Link } from 'react-router-dom'; // Added

const LoginPage = () => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Added
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  const goToResetPassword = () => {
    navigate('/reset-password');
  };


  useEffect(() => {
    if (isLoggedIn) {
      console.log('이미 로그인 되어 있음, 메인 페이지로 리다이렉트');
      navigate('/');
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, navigate]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });

    try {
      const response = await fetch('http://127.0.0.1:8000/club_account/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (data.key) {
        console.log('로그인 성공:', data);
        localStorage.setItem('token', data.key);
        dispatch(loginSuccess({ email: email, token: data.key }));
        navigate('/'); // Changed
      } else {
        throw new Error('로그인 실패');
      }
    } catch (error) {
      console.error(error);
      setEmail('');
      setPassword('');
      localStorage.clear();
      setErrors(true);
      dispatch(logout());
    }
  };
   return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          {loading === false && <h1 className="mb-4">로그인</h1>}
          {errors === true && <h2 className="text-danger">Cannot log in with provided credentials</h2>}
          {loading === false && (
            <form onSubmit={onSubmit}>
              <div className="form-group mt-5">
                <label htmlFor='email'>이메일</label>
                <input
                  name='email'
                  type='email'
                  className="form-control"
                  value={email}
                  required
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group mt-2">
                <label htmlFor='password'>패스워드</label>
                <input
                  name='password'
                  type='password'
                  className="form-control"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div class="mt-5">
                <button type="submit" className="btn btn-primary">Login</button>
                <button className="btn btn-primary ms-3" onClick={goToResetPassword}>password reset</button>
              </div>
              
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
