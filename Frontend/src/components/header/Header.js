import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("token")));

  useEffect(() => {
    setIsLoggedIn(Boolean(localStorage.getItem("token")));
  }, [location.pathname]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-shell">
        <Link to="/" className="header-brand" onClick={closeMenu}>
          <span className="brand-mark" />
          <span>FilmVerse</span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <div className={`header-nav ${isMenuOpen ? "open" : ""}`}>
          <nav className="header-links" aria-label="Primary">
            <NavLink
              to="/movies/popular"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              Popular
            </NavLink>
            <NavLink
              to="/movies/top_rated"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              Top Rated
            </NavLink>
            <NavLink
              to="/movies/upcoming"
              className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              onClick={closeMenu}
            >
              Upcoming
            </NavLink>
          </nav>

          <div className="header-actions">
            {!isLoggedIn && (
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "action-link active" : "action-link")}
                onClick={closeMenu}
              >
                Login
              </NavLink>
            )}
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "action-link active" : "action-link")}
              onClick={closeMenu}
            >
              Profile
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
