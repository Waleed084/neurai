import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './Hero.css';

export const Hero = () => {
  const { isDark } = useTheme();
  
  useEffect(() => {
    const init = () => {
      try {
        // Check if container exists and particles not already initialized
        const container = document.getElementById('hero-particles');
        if (!container || !window.particlesJS || container.querySelector('canvas')) {
          return;
        }

        // Check if dark mode is active
        const isDark = document.documentElement.classList.contains('dark');
        
        const baseConfig = {
          particles: {
            number: {
              value: 60,
              density: { enable: true, value_area: 900 }
            },
            color: { value: '#5ce1e6' },
            shape: { type: 'circle' },
            opacity: { 
              value: isDark ? 0.6 : 0.4,
              random: false
            },
            size: { value: 3, random: true },
            line_linked: { 
              enable: true, 
              distance: 140, 
              color: '#5ce1e6', 
              opacity: isDark ? 0.3 : 0.2, 
              width: 1.5
            },
            move: { 
              enable: true, 
              speed: 2.2, 
              direction: 'none', 
              out_mode: 'out' 
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: { enable: true, mode: 'grab' },
              onclick: { enable: true, mode: 'push' },
              resize: true
            },
            modes: {
              grab: { distance: 180, line_linked: { opacity: 0.6 } },
              push: { particles_nb: 3 },
              repulse: { distance: 200, duration: 0.4 }
            }
          },
          retina_detect: true
        };

        const isMobile = window.matchMedia('(max-width: 640px)').matches;
        if (isMobile) {
          baseConfig.particles.number.value = 32;
          baseConfig.particles.move.speed = 1.2;
          baseConfig.particles.line_linked.distance = 120;
        }

        window.particlesJS('hero-particles', baseConfig);
      } catch (error) {
        console.warn('Particles.js initialization failed:', error);
        // Continue without particles - not critical for functionality
      }
    };

    if (window.particlesJS) {
      init();
    } else {
      // Retry briefly in case CDN script hasn't loaded yet
      const id = setInterval(() => {
        if (window.particlesJS) {
          clearInterval(id);
          init();
        }
      }, 200);
      // Stop trying after 3 seconds
      setTimeout(() => clearInterval(id), 3000);
    }

    // Listen for theme changes and reinitialize
    const observer = new MutationObserver(() => {
      const container = document.getElementById('hero-particles');
      if (container) {
        const canvas = container.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
        init();
      }
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    // Cleanup on unmount
    return () => {
      observer.disconnect();
      const container = document.getElementById('hero-particles');
      if (container) {
        const canvas = container.querySelector('canvas');
        if (canvas) {
          canvas.remove();
        }
      }
    };
  }, []);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name?.value || '';
    const email = form.email?.value || '';
    const company = form.company?.value || '';
    const message = form.message?.value || '';

    // Fallback behavior: open the user's mail client with a prefilled message
    const subject = `Website contact request from ${name || email}`;
    const body = `Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`;
    window.location.href = `mailto:hello@apollo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const nameInputRef = useRef(null);

  const openContactForm = () => {
    setIsFormOpen(true);
    // autofocus after opening (allow CSS transition to start)
    setTimeout(() => nameInputRef.current?.focus(), 180);
  };

  // Open the contact form automatically when navigating to #contact
  useEffect(() => {
    const openIfHash = () => {
      try {
        if (window.location.hash === '#contact') {
          openContactForm();
        }
      } catch (err) {
        // ignore
      }
    };

    openIfHash();
    window.addEventListener('hashchange', openIfHash);
    return () => window.removeEventListener('hashchange', openIfHash);
  }, []);

  return (
    <div className="hero-wrapper">
      <div className="hero-container">
        <div id="hero-particles" className="hero-particles-layer" aria-hidden="true"></div>
        <div className="hero-content">
          <h1>Dynamic Workflow. Hyper Growth</h1>
          <p className="subtitle">
            Every workflow, optimized. Every task, on autopilot.
          </p>
          
          <div className="founder-note" role="note" aria-label="Founder's note">
            
            <blockquote className="founder-quote">
              “Neurai eliminates repetitive work so companies can operate faster and leaner.
              Our automations save 20–40 workhours per employee every month—cutting thousands in costs while boosting performance at scale.”
            </blockquote>
            <cite className="founder-attrib">— Neurai Founders</cite>
          </div>
          
          <div id="contact" className="contact-section">
            <div className="contact-intro">
              <p>Have questions or want to see a demo? Our team is ready to help you scale.</p>
            </div>

            {/* CTA toggle always visible — icon animates between stacks and cross */}
            <div className="contact-cta">
              <button
                type="button"
                className={`contact-button toggle ${isFormOpen ? 'open' : ''}`}
                onClick={() => setIsFormOpen((s) => !s)}
                aria-expanded={isFormOpen}
                aria-controls="contact"
              >
                <span className="contact-icon" aria-hidden></span>
                <span className="contact-label">Contact Sales</span>
              </button>
            </div>

            {/* Collapsible form wrapper with transition */}
            <div className={`contact-form-wrapper ${isFormOpen ? 'open' : ''}`} aria-hidden={!isFormOpen}>
              <form className="contact-form" onSubmit={handleContactSubmit}>
                <input ref={nameInputRef} name="name" type="text" placeholder="Full name" className="contact-input" />
                <input name="email" type="email" placeholder="Work email" className="contact-input" />
                <input name="company" type="text" placeholder="Company" className="contact-input" />
                <textarea name="message" placeholder="How can we help?" className="contact-textarea" rows="3" />
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button type="submit" className="contact-button">Send to Sales</button>
                  <button type="button" className="contact-button" onClick={() => setIsFormOpen(false)} style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-black)', boxShadow: 'none' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>

            <p className="hero-terms">Prefer email? Reach us at <a href="mailto:support@neurai.agency">support@neurai.agency</a>.</p>
          </div>
        </div>
      </div>
    </div>
  );
};