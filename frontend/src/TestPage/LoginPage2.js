// components/user/LoginPage2.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, logout } from '../redux/actions/authActions';

const LoginPage2 = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(false);
  const [loading, setLoading] = useState(true);


  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const user = useSelector(state => state.auth.user);

  useEffect(() => {
    console.log('현재 로그인 상태:', isLoggedIn);
    console.log('로그인된 사용자:', user);
  }, [isLoggedIn, user]);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      console.log('이미 로그인 되어 있음, 메인 페이지로 리다이렉트');
      window.location.replace('http://localhost:3000');
    } else {
      setLoading(false);
    }
  }, []);

	// 로그인 버튼 event
  const onSubmit = e => {
    e.preventDefault();
    console.log('로그인 시도:', { email, password });

    fetch('http://127.0.0.1:8000/club_account/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.key) {
          console.log('로그인 성공:', data);
          localStorage.setItem('token', data.key);
          dispatch(loginSuccess({ email: email, token: data.key }));
          window.location.replace('http://localhost:3000');
        } else {
          console.log('로그인 실패:', data);
          setemail('');
          setPassword('');
          localStorage.clear();
          setErrors(true);
          dispatch(logout());
        }
      });
  };
    return (
      <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          {loading === false && <h1 class="mb-4">로그인</h1>}
          {errors === true && <h2 class="text-danger">Cannot log in with provided credentials</h2>}
          {loading === false && (
            <form onSubmit={onSubmit}>
              <div class="form-group mt-5">
                <label for='email'>이메일</label>
                <input
                  name='email'
                  type='email'
                  class="form-control"
                  value={email}
                  required
                  onChange={e => setemail(e.target.value)}
                />
              </div>
              <div class="form-group mt-2">
                <label for='password'>패스워드</label>
                <input
                  name='password'
                  type='password'
                  class="form-control"
                  value={password}
                  required
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" class="btn btn-primary mt-5">Login</button>
            </form>
          )}
        </div>
      </div>
    </div>

      );
    };
export default LoginPage2;
