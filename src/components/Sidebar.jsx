import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar__label">Menu</p>
      <nav className="sidebar__nav">
        <NavLink
          to="/home"
          className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
        >
          <i className="fa-solid fa-house sidebar__icon"></i>
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/movies"
          className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
        >
          <i className="fa-solid fa-film sidebar__icon"></i>
          <span>Movies</span>
        </NavLink>

        <hr className="sidebar__divider" />

        <span className="sidebar__link sidebar__link--disabled">
          <i className="fa-solid fa-gear sidebar__icon"></i>
          <span>Settings</span>
        </span>

        <span className="sidebar__link sidebar__link--disabled">
          <i className="fa-regular fa-circle-question sidebar__icon"></i>
          <span>Help</span>
        </span>
      </nav>
    </aside>
  )
}

export default Sidebar
