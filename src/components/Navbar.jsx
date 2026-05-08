import { Link } from 'react-router-dom'
import { useState, useRef } from 'react'
import logo from '../assets/movielogo.png'

function Navbar({ onSearch }) {
  const [navQuery, setNavQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const navInputRef = useRef(null)

  function handleSearchIcon() {
    if (searchOpen) {
      if (navQuery.trim()) {
        onSearch(navQuery.trim())
        setNavQuery('')
      }
      setSearchOpen(false)
    } else {
      setSearchOpen(true)
      setTimeout(() => navInputRef.current?.focus(), 50)
    }
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && navQuery.trim()) {
      onSearch(navQuery.trim())
      setNavQuery('')
      setSearchOpen(false)
    }
    if (e.key === 'Escape') {
      setSearchOpen(false)
      setNavQuery('')
    }
  }

  function handleBlur() {
    setTimeout(() => {
      setSearchOpen(false)
      setNavQuery('')
    }, 200)
  }

  return (
    <div className="nav__content">
      <div className="nav__left">
        <figure className="nav__logo__wrapper">
          <img src={logo} alt="logo" className="nav__logo" />
        </figure>
        <Link to="/home" className="nav__link">Home</Link>
        <a href="#contact" className="nav__link">Contact</a>
      </div>
      <div className="nav__right">
        <div className="nav__input__wrapper">
          <input
            ref={navInputRef}
            type="text"
            className={`nav__input${searchOpen ? ' nav__input--open' : ''}`}
            placeholder="Find a movie"
            value={navQuery}
            onChange={e => setNavQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
          />
          <i
            className="fa-solid fa-magnifying-glass nav__search"
            onClick={handleSearchIcon}
            aria-hidden="true"
          ></i>
        </div>
        <i className="fa-solid fa-gear nav__settings" aria-hidden="true"></i>
      </div>
    </div>
  )
}

export default Navbar
