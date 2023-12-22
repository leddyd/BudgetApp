import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, } from 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig.ts';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function SignUp({ onSignUpSuccess }: { onSignUpSuccess: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const auth = getAuth();

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
      <div className="form-floating mb-3">
        <input 
          type="text" 
          className="form-control" 
          placeholder="First Name" 
          id="floatingFirstName" 
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)} 
          required 
        />
        <label htmlFor="floatingFirstName">First Name</label>
      </div>
      <div className="form-floating mb-3">
        <input 
          className="form-control" 
          id="floatingLastName"
          type="text" 
          placeholder="Last Name" 
          value={lastName} 
          onChange={(e) => setLastName(e.target.value)} 
          required 
        />
        <label htmlFor="floatingLastName">Last Name</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          type="email"
          placeholder="Email"
          id="floatingEmail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="floatingEmail">Email</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="floatingPassword"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="floatingPassword">Password</label>
      </div>
      <div className="form-floating mb-3">
        <input
          className="form-control"
          id="floatingConfirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <label htmlFor="floatingConfirmPassword">Confirm Password</label>
      </div>
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
  const navigate = useNavigate();

  const handleSignUpSuccess = () => {
    navigate('/profile');
  };

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
        <SignUp onSignUpSuccess={handleSignUpSuccess} />
      </div>
    </>
  );
}

export default RenderSignUp;