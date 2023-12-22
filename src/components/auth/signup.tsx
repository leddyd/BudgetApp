import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';

export function SignUp() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const fields = [
    {
      id: "floatingFirstName", 
      type: "text", placeholder: "First Name", 
      value: firstName, 
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)
    },
    {
      id: "floatingLastName", 
      type: "text", placeholder: "Last Name", 
      value: lastName, 
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)
    },
    {
      id: "floatingEmail", 
      type: "email", placeholder: "Email", 
      value: email, 
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
    },
    {
      id: "floatingPassword", 
      type: "password", 
      placeholder: "Password", 
      value: password, 
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
    },
    {
      id: "floatingConfirmPassword", 
      type: "password", 
      placeholder: "Confirm Password", 
      value: confirmPassword, 
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)
    },
  ]

  const onSignUpSuccess = () => {
    navigate('/profile', {replace: true});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onSignUpSuccess();
    } catch (error) {
      console.error('Registration error:', error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      onSignUpSuccess();
    } catch (error) {
      console.error('Google sign-up error:', error.message);
    }
  };

  return (
    <form id="signup-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="form-floating mb-3">
          <input
            className="form-control"
            type={field.type}
            placeholder={field.placeholder}
            id={field.id}
            value={field.value}
            onChange={field.onChange}
            required
          />
          <label htmlFor={field.id}>{field.placeholder}</label>
        </div>
      ))}
      <br />
      <input type="submit" value="Sign Up" />
      <button type="button" className="google-btn" onClick={handleGoogleSignUp}>
        <img className="google-icon" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Icon" />
        Sign Up with Google
      </button>
    </form>
  );
}

function RenderSignUp() {
  return (
    <>
      <div className="top-bar"></div>
      <div className="brand-container">
        <i className="login-brand-icon bi-wallet d-inline-block align-text-top"></i>
        <Link className="login-brand-link navbar-brand" to="/">
          WeGonBudget
        </Link>
      </div>
      <div className="login-form">
        <SignUp />
      </div>
    </>
  );
}

export default RenderSignUp;