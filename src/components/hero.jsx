import './hero.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Hero() {
  const titleRef = useScrollAnimation({ once: false, exitAnimation: true });
  const contentRef = useScrollAnimation({ once: false, exitAnimation: true });
  const detailsRef = useScrollAnimation({ once: true, exitAnimation: true });
  const buttonRef = useScrollAnimation({ once: true });
  const visualRef = useScrollAnimation({ once: false, exitAnimation: true });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-accent"></div>
        
        <h1 className="hero-title fade-in-down" ref={titleRef}>
          <span className="tedx-label">TEDx</span>
          <span className="event-name">CUSAT</span>
        </h1>
        
        <p className="hero-tagline fade-in-up stagger-1" ref={contentRef}>
          Ideas Worth Spreading at Cochin University of Science and Technology
        </p>
        
        <p className="hero-description fade-in-up stagger-2" ref={contentRef}>
          Join us for a day of inspiring talks from visionary thinkers, innovators, and leaders 
          who are shaping the future. Discover remarkable ideas that are changing the world.
        </p>
        
        <div className="hero-details fade-in-up stagger-3" ref={detailsRef}>
          <div className="detail-item">
            <span className="label">Date</span>
            <span className="value">Not Announced</span>
          </div>
          <div className="detail-item">
            <span className="label">Venue</span>
            <span className="value">CUSAT Auditorium</span>
          </div>
          <div className="detail-item">
            <span className="label">Time</span>
            <span className="value">9:00 AM - 5:00 PM</span>
          </div>
        </div>

        <button className="cta-button fade-in-up stagger-4" ref={buttonRef} onClick={() => scrollToSection('cta')}>
          Get Your Ticket →
        </button>
      </div>

    {/* <div className="hero-visual fade-in-right" ref={visualRef}>
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div> */}
    </section>
  );
}
