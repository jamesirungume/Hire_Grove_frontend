
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import './signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registrationStatus, setRegistrationStatus] = useState(null);
 

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // ... (your previous code)

const handleSubmit = async (e) => {
  e.preventDefault();

  const userData = {
    username: formData.username,
    email: formData.email,
    password: formData.password,
  };
  Swal.showLoading();
  try {
    const response = await fetch("https://hire-backend.onrender.com/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    Swal.hideLoading();

    if (response.status === 201) {
      const data = await response.json();

      // Save access token in localStorage
      localStorage.setItem('accessToken', data.access_token);
      console.log('Access Token:', data.access_token);

      setRegistrationStatus('success');

      setTimeout(() => {
        setRegistrationStatus(null);
        navigate("/jobs");
      }, 3000);
    } else {
      const errorData = await response.json();
      console.error("Registration failed:", errorData.message);
      setRegistrationStatus('error');
    }
  } catch (error) {
    console.error("Registration failed:", error);
    setRegistrationStatus('error');
  }
};


  return (
    <div className="signup-container">
      <div className="bg-image d-flex align-items-center justify-content-center">
        <div className="mask gradient-custom-3"></div>
        <div className="card m-5" style={{ maxWidth: '600px' }}>
          <div className="card-body px-5">
            <h4 className="text-uppercase text-center mb-5">Create an account</h4>
            {registrationStatus === 'success' && (
              <div className="alert alert-success" role="alert">
                Registration successful! You can now log in.
              </div>
            )}
            {registrationStatus === 'error' && (
              <div className="alert alert-danger" role="alert">
                Username or email is already used. Kindly change the username and try again.
              </div>
            )}
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="form-label">Your Name</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  id="username"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="mb-4" >
                <label htmlFor="email" className="form-label">Your Email</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  placeholder="example@example.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
              <div className="d-flex flex-row justify-content-center mb-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="flexCheck"
                    id="flexCheckDefault"
                    required
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    I agree to all statements in Terms of service
                  </label>
                </div>
              </div>
              <button type="submit" className="register-btn" id='btn'>
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

