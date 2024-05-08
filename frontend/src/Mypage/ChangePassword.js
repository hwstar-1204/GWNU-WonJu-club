import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PasswordChangeForm = () => {
  const [newPassword, setNewPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (newPassword !== repeatPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/club_account/password/change/', {
        new_password1: newPassword,
        new_password2: repeatPassword
      }, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        }
      });

      console.log(response.data);

      if (response.status === 200) {
        // Success message or redirect to another page
        window.location.replace('http://localhost:3000/login');
      } else {
        setErrorMessage(response.data.detail);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setErrorMessage('An error occurred while changing password');
    }
  };


  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="new_password1" className="col-sm-2 control-label">Password</label>
        <div className="col-sm-10">
          <input 
            type="password" 
            className="form-control" 
            id="new_password1" 
            placeholder="Password" 
            value={newPassword} 
            onChange={(e) => setNewPassword(e.target.value)} 
            required 
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="new_password2" className="col-sm-2 control-label">Repeat password</label>
        <div className="col-sm-10">
          <input 
            type="password" 
            className="form-control" 
            id="new_password2" 
            placeholder="Repeat password" 
            value={repeatPassword} 
            onChange={(e) => setRepeatPassword(e.target.value)} 
            required 
          />
        </div>
      </div>

      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
          <button type="submit" className="btn btn-default">Set new password</button>
        </div>
      </div>

      {errorMessage && <div className="form-group">{errorMessage}</div>}
    </form>
  );
};

export default PasswordChangeForm;
