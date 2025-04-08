import React from 'react';
import { Navigate } from 'react-router-dom';
import './Auth.css';
import { SignedIn, SignedOut, SignInButton, SignUpButton } from '@clerk/clerk-react';

function Auth() {
  return (
    <div className="sign-in-container">
      <SignedOut>
        <h1 className="welcome-text">Welcome to Your Own Personal Finance Tracker!</h1>
        <SignUpButton mode="modal" />
        <SignInButton mode="modal" />
      </SignedOut>
      <SignedIn>
        <Navigate to="/" />
      </SignedIn>
    </div>
  );
}

export default Auth;