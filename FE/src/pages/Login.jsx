import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast }  from 'react-toastify';
import { FaUser } from 'react-icons/fa';

const Login = () => {
  return (
    <div className='wrapper'>
      <div className="form-box login">
        <form action="">
          <h1>Login</h1>
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className='icon' />
          </div>

          <div className="input-box">
            <input type="password" placeholder="Password" required />

          </div>

          <div className="remember-forgot">
            <label><input type="Checkbox" />Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">Login</button>

          <div className="signup-link">
            <p>Don't have an account <a href="#">Register</a></p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
