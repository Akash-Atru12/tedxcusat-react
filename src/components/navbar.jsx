import { useState, useEffect } from 'react';
import './navbar.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Navbar() {
  const brandRef = useScrollAnimation({ once: false, exitAnimation: true });
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastScrollY);
      
      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      // Only trigger on scroll delta of at least 30px to reduce sensitivity
      if (scrollDelta >= 30) {
        if (currentScrollY < 50) {
          setIsVisible(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsVisible(true);
        } else {
          // Scrolling down
          setIsVisible(false);
        }
        
        setLastScrollY(currentScrollY);
      }

      // Debounce scroll events
      const timeout = setTimeout(() => {
        setLastScrollY(currentScrollY);
      }, 150);
      
      setScrollTimeout(timeout);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isVisible ? 'show' : 'hide'}`}>
      <div className="navbar-container">
        <div className="navbar-brand fade-in-down" ref={brandRef}>
          <span className="brand-text">TEDx</span>
          <span className="brand-name">CUSAT</span>
        </div>

        <button 
          className={`menu-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><button onClick={() => scrollToSection('about')}>About</button></li>
          <li><button onClick={() => scrollToSection('speakers')}>Speakers</button></li>
          <li><button onClick={() => scrollToSection('cta')} className="nav-cta">Get Tickets</button></li>
        </ul>
      </div>
    </nav>
  );
}
