// src/pages/Login.js
import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../components/Navbar";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, error, isLoading } = useLogin()
  const navigate = useNavigate() // useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault()

    const success = await login(email, password)

    if (success) {
      navigate('/home') // navigate to home page
    }
  }

  return (
    <div>
      <Navbar />
      <form className="login" onSubmit={handleSubmit}>
        <h3>Log In</h3>
        
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

        <button disabled={isLoading}>Log in</button>
        <button><Link to="/signup" className="link-style-reset" >Signup</Link></button>
        
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default Login
