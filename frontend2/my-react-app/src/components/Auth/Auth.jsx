import React from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';

function Auth() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <SignedOut>
          <h1 className="welcome-text">Welcome to Your Personal Finance Tracker</h1>
          <p className="auth-subtext">Track your finances, set goals, and gain insights effortlessly.</p>
          <div className="auth-buttons">
            <SignUpButton mode="modal">
              <button className="auth-button sign-up">Sign Up</button>
            </SignUpButton>
            <SignInButton mode="modal">
              <button className="auth-button sign-in">Sign In</button>
            </SignInButton>
          </div>
        </SignedOut>
        <SignedIn>
          <Navigate to="/" />
        </SignedIn>
      </div>
    </div>
  );
}

export default Auth;