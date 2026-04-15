import './CTA.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function CTA() {
  const contentRef = useScrollAnimation({ once: false, exitAnimation: true });
  const titleRef = useScrollAnimation({ once: false, exitAnimation: true });
  const buttonRef = useScrollAnimation({ once: true, exitAnimation: true });

  const handleRegisterClick = () => {
    alert('Thank you for your interest! Registration will open soon.');
  };

  return (
    <section id="cta" className="cta-section">
      <div className="cta-container fade-in-up" ref={contentRef}>
        <div className="cta-content">
          <h2 className="fade-in-down" ref={titleRef}>Ready to Be Inspired?</h2>
          <p className="cta-subtitle fade-in-up stagger-1">
            Join us for TEDx CUSAT and be part of something extraordinary
          </p>

          <button className="register-btn fade-in-up stagger-2" ref={buttonRef} onClick={handleRegisterClick}>
            Register Now
          </button>

          <p className="cta-note fade-in-up stagger-3">
            🔥 Limited seats available — secure your spot today!
          </p>
        </div>
      </div>
    </section>
  );
}
