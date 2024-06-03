// src/pages/Signup.js
import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signup, error, isLoading } = useSignup()
  const navigate = useNavigate() // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await signup(email, password)

    if (success) {
      navigate('/home') // navigate to home page
    }
  }

  return (
    <div>
      <Navbar />
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        
        <label>Email address:</label>
        <input 
          type="email" 
          onChange={(e) => setEmail(e.target.value)} 
          value={email} 
        />
        <label>Password:</label>
        <input 
          type="password" 
          onChange={(e) => setPassword(e.target.value)} 
          value={password} 
        />

        <button disabled={isLoading}>Sign up</button>
        <button><Link to="/login" className="link-style-reset">Login</Link></button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Signup
