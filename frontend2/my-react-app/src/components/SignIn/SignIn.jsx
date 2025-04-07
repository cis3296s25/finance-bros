import React from 'react'
import './SignIn.css'
import { useNavigate } from 'react-router-dom'

function SignIn() {
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add authentication logic here
    navigate('/')
  }

  return (
    <div className="signin-container">
      <div className="signin-card">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required />
          </div>
          <button type="submit" className="signin-button">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default SignIn 