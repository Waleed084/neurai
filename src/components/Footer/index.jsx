import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-left">
          <img src="logo neurai.svg" alt="NeurAI" className="footer-logo" />
          <div className="copyright">NeurAI © {new Date().getFullYear()}</div>
        </div>
      </div>
    </footer>
  );
}
