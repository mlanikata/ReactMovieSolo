import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import logo from '../assets/movielogo.png'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleLogin(e) {
    e.preventDefault()
    navigate('/home')
  }

  return (
    <div className="login__page">
      <div className="login__card">
        <figure className="login__logo__wrapper">
          <img src={logo} alt="logo" className="login__logo" />
        </figure>
        <h1 className="login__title">Ticket<span className="textcolor__primary">+</span></h1>
        <p className="login__subtitle">Sign in to continue watching</p>
        <form className="login__form" onSubmit={handleLogin}>
          <input
            type="email"
            className="login__input"
            placeholder="Email address"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="login__input"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login__btn">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Login
