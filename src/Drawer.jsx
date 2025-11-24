import React from 'react';
import './drawer.css';

function Drawer({ isOpen, onClose }) {
    return (
        <>
            <div className={`drawer ${isOpen ? 'is-open' : ''}`}>
                <div className="drawer-content">
                    {/* Close handled by header toggle; remove duplicate close button */}
                    <nav className="drawer-nav">
                        <a href="#solutions" onClick={onClose}>Solutions</a>
                        <a href="#" onClick={onClose}>Resources</a>
                        <a href="#faq-q4" onClick={onClose}>Pricing</a>
                    </nav>
                    <div className="drawer-buttons">
                        <a href="#contact" className="demo-button" onClick={onClose}>Contact Sales</a>
                    </div>
                </div>
            </div>
            {isOpen && <div className="drawer-overlay" onClick={onClose}></div>}
        </>
    );
}

export default Drawer;
