import { useState, useEffect, useCallback } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

/**
 * Main navigation component with responsive mobile menu
 * Features: Accessible, mobile-first, auto-close on route change
 */
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const navLinks = [
    { to: '/', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/clients', label: 'Clients' },
    { to: '/booking', label: 'Book Now' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <header>
      <nav 
        className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container">
          <NavLink 
            className="navbar-brand fw-bold d-flex align-items-center" 
            to="/"
            aria-label="High Tide Studios - Home"
          >
            <img 
              src="/images/logo.png" 
              alt="" 
              height="40" 
              width="40"
              className="me-2"
              style={{ objectFit: 'contain' }}
            />
            <span className="d-none d-sm-inline">High Tide Studios</span>
            <span className="d-none d-md-inline text-muted ms-2 fw-normal small">
              Greystones
            </span>
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMenu}
            aria-controls="main-nav"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div 
            id="main-nav" 
            className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
          >
            <ul className="navbar-nav ms-auto" role="menubar">
              {navLinks.map(({ to, label }) => (
                <li className="nav-item" key={to} role="none">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'active' : ''}`
                    }
                    to={to}
                    role="menuitem"
                    aria-current={location.pathname === to ? 'page' : undefined}
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
