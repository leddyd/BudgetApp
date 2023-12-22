import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { initializeApp } from 'firebase/app';
import { getAuth, 
  getRedirectResult, 
  signInWithEmailAndPassword, 
  signInWithRedirect, 
  GoogleAuthProvider,  
  AuthError } from 'firebase/auth';
import firebaseConfig from '../../../firebaseConfig';

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithRedirect(auth, provider);
}

const handleGoogleSignIn = async () => {
  try {
    await signInWithGoogle();
  } catch (error) {
    console.error('Google sign-in error:', error.message);
  }
};

function RenderLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/profile");
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result !== null && result.user) {
          console.log('Google sign-in success:', result.user);
          navigate("/profile");
        } else {
          console.log('No user signed in or there was an issue.');
        }
      } catch (error) {
        console.error('Error handling redirect result:', (error as AuthError).code, (error as AuthError).message);
      }
    };

    handleRedirectResult();
  }, []);

  return (
    <>
      <div className="top-bar"></div>
      <div className="brand-container">
        <i className="login-brand-icon bi-wallet d-inline-block align-text-top"></i>
        <Link className="login-brand-link navbar-brand" to="/">WeGonBudget</Link>
      </div>
      <div className="login-form">
        <form id="login-form" onSubmit={handleSubmit}>
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
          <br></br>
          <input
            type="submit"
            value="Sign in"
          />
          <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
            <img className="google-icon" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google Icon" />
            Sign In with Google
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </>
  );
}

export default RenderLogin;