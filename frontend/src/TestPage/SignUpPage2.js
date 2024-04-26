// components/user/SingUpPage2.js
import React, { useState, useEffect } from 'react';

const SignupPage2 = () => {
  // const [email, setEmail] = useState('');
  // const [password1, setPassword1] = useState('');
  // const [password2, setPassword2] = useState('');
  // const [name, setName] = useState('');
  // const [student_id, setStudent_id] = useState('');
  // const [study, setStudy] = useState('');
  // const [gender, setGender] = useState('');
  // const [phone, setPhone] = useState('');
  // const [grade, setGrade] = useState('');
  // const [errors, setErrors] = useState(false);
  // const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    email: '',
    password1: '',
    password2: '',
    name: '',
    student_id: '',
    grade: '',
    study: '',
    gender: '',
    phone: '',
  });

  const { email, password1, password2, name, student_id, grade, study, gender, phone } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  // useEffect(() => {
  //   if (localStorage.getItem('token') !== null) {
  //     window.location.replace('http://localhost:3000/');
  //   } else {
  //     setLoading(false);
  //   }
  // }, []);

  const onSubmit = e => {
    e.preventDefault();

    const user = {
      email: email,
      password1: password1,
      password2: password2,
      name: name,
      student_id: student_id,
      grade: grade,
      study: study,
      gender: gender,
      phone: phone
    };
    fetch('http://127.0.0.1:8000/club_account/registration/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
    })
    .then(res => {
        if (res.status === 204) {
            alert('회원가입이 완료되었습니다.');
            // navigate('/main'); // 회원가입 완료 후 메인 페이지로 이동
            window.location.replace('http://localhost:3000/login/');
        } else {
            // return res.json();
            console.log('회원가입 실패')
            navigate('/main/signup')
        }
    })
    };
    return (
      <div className="container py-5">
        <h1>회원가입</h1>
        {/* 에러 처리 */}
        <form onSubmit={onSubmit}>

              <div className="form-group ">
                <label htmlFor='email'>이메일</label>
                <input
                  className="form-control"
                  type='email'
                  name='email'
                  value={email}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor='password1'>패스워드</label>
                <input
                  className="form-control"
                  type='password'
                  name='password1'
                  value={password1}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor='password2'>패스워드 재확인</label>
                <input
                  className="form-control"
                  type='password'
                  name='password2'
                  value={password2}
                  onChange={onChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor='name'>이름</label>
                <input
                  className="form-control"
                  type='text'
                  name='name'
                  value={name}
                  onChange={onChange}
                  required
                />
              </div>



              <div className="form-group">
                <label htmlFor='name'>학번</label>
                <input
                  className="form-control"
                  type='number'
                  name='student_id'
                  value={student_id}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor='name'>학년</label>
                <input
                  className="form-control"
                  type='number'
                  name='grade'
                  value={grade}
                  onChange={onChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor='name'>학과</label>
                <input
                  className="form-control"
                  type='text'
                  name='study'
                  value={study}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor='name'>성별</label>
                <input
                  className="form-control"
                  type='text'
                  name='gender'
                  value={gender}
                  onChange={onChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor='name'>휴대전화</label>
                <input
                  className="form-control"
                  type='text'
                  name='phone'
                  value={phone}
                  onChange={onChange}
                  required
                />
              </div>
                <br/>
              <button type='submit' className='btn btn-primary'>Signup</button>
            

        </form>
      </div>
    );
    // return (
        // <div>
        //   {loading === false && <h1>Signup</h1>}
        //   {errors === true && <h2>Cannot signup with provided credentials</h2>}
        //   <form onSubmit={onSubmit}>
        //     <label htmlFor='email'>email</label> <br />
        //     <input
        //       name='email'
        //       type='email'
        //       value={email}
        //       onChange={e => setEmail(e.target.value)}
        //       required
        //     />{' '}
        //     <br />
        //     <label htmlFor='password1'>password1:</label> <br />
        //     <input
        //       name='password1'
        //       type='password'
        //       value={password1}
        //       onChange={e => setPassword1(e.target.value)}
        //       required
        //     />{' '}
        //     <br />
        //     <label htmlFor='password2'>Confirm password:</label> <b />
        //     <input
        //       name='password2'
        //       type='password'
        //       value={password2}
        //       onChange={e => setPassword2(e.target.value)}
        //       required
        //     />{' '}
        //     <br />
        //     <label htmlFor='name'> name </label> <br />
        //     <input
        //     name='name'
        //     type='text'
        //     value={name}
        //     onChange={e => setName(e.target.value)}
        //     required
        //     />{' '}<br />
        //     <label htmlFor='student_id'>student_id</label> <br />
        //     <input
        //     name='student_id'
        //     type='number'
        //     value={student_id}
        //     onChange={e => setStudent_id(e.target.value)}
        //     required
        //     />{' '}<br />
        //     <label htmlFor='grade'>grade</label> <br />
        //     <input
        //     name='grade'
        //     type='number'
        //     value={grade}
        //     onChange={e => setGrade(e.target.value)}
        //     required
        //     />{' '}<br />

        //     <label htmlFor='study'>study</label> <br />
        //     <input
        //     name='study'
        //     type='text'
        //     value={study}
        //     onChange={e => setStudy(e.target.value)}
        //     required
        //     />{' '}<br />

        //     <label htmlFor='gender'>gender</label> <br />
        //     <input
        //     name='gender'
        //     type='text'
        //     value={gender}
        //     onChange={e => setGender(e.target.value)}
        //     required
        //     />{' '}<br />
        //     <br />


        //     <label htmlFor='phone'>phone</label><br />
        //     <input
        //     name='phone'
        //     type='text'
        //     value={phone}
        //     onChange={e => setPhone(e.target.value)}
        //     required
        //     />{' '}
        //     <input type='submit' value='Signup' />
        // </form>
        // </div>
    // );
};

export default SignupPage2;
