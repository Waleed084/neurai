import React from 'react';
import { useTheme } from '../../context/ThemeContext';

export const DesktopHeader = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header desktop-header">
      <div className="header-content">
        <div className="header-left">
          {/* show icon-only logo */}
          <img src="logo neurai.svg" alt="NeurAI" className="logo" />
          <div className="header-text" ></div>  
                  <nav className="nav-links">
                    <a href="#solutions">Solutions</a>
                    {/* <a href="#">Roles</a> */}
                    <a href="#">Resources</a>
                    <a href="#faq-q4">Pricing</a>
                  </nav>
        </div>
        <div className="header-right">
          <a href="#contact" className="demo-button">Contact Sales</a>
        </div>
      </div>
    </header>
  );
};

export const MobileHeader = ({ onToggleDrawer, isDrawerOpen }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="header mobile-header">
      <div className="header-content">
        <div className="mobile-left" aria-hidden />

        <div className="mobile-center">
          <img src="logo neurai.svg" alt="NeurAI" className="logo" />
        </div>

        <div className="mobile-right">
          {/* theme toggle removed — dark mode enforced */}
          <button className={`menu-button ${isDrawerOpen ? 'open' : ''}`} onClick={onToggleDrawer} aria-expanded={isDrawerOpen} aria-label={isDrawerOpen ? 'Close menu' : 'Open menu'}>
            <span className="menu-icon" aria-hidden></span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Convenience wrapper used by App.jsx — renders both desktop and mobile headers.
export const Header = ({ onToggleDrawer, isDrawerOpen }) => {
  return (
    <>
      <DesktopHeader />
      <MobileHeader onToggleDrawer={onToggleDrawer} isDrawerOpen={isDrawerOpen} />
    </>
  );
};