import './about.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function About() {
  const headerRef = useScrollAnimation({ once: false, exitAnimation: true });
  const mainRef = useScrollAnimation({ once: false, exitAnimation: true });
  const featureRefs = [
    useScrollAnimation({ once: true, exitAnimation: true }),
    useScrollAnimation({ once: true, exitAnimation: true }),
    useScrollAnimation({ once: false, exitAnimation: true }),
    useScrollAnimation({ once: false, exitAnimation: true })
  ];

  return (
    <section id="about" className="about">
      <div className="container about-container">
        <div className="about-header fade-in-down" ref={headerRef}>
          <h2>What is TEDx?</h2>
          <div className="accent-line"></div>
        </div>

        <div className="about-content">
          <div className="about-main fade-in-left" ref={mainRef}>
            <p className="lead-text">
              TED is a nonprofit organization devoted to "Ideas Worth Spreading." 
              In the spirit of ideas worth spreading, TED has created a program called TEDx.
            </p>

            <p>
              TEDx events bring people together to discover and share TED-like experiences. 
              They are self-organized events that help spread ideas at the local level. 
              At a TEDx event, TED Talks video and live speakers combine to spark deep discussion 
              and connection in a small group. These local, self-organized events are branded TEDx, 
              where x = independently organized TED event.
            </p>

            <p>
              TEDx CUSAT is a platform for thought-leaders and innovators from Cochin University 
              of Science and Technology and beyond to share compelling ideas and ignite meaningful 
              conversations around key challenges and opportunities facing our society.
            </p>
          </div>

          <div className="about-features">
            <div className="feature-card fade-in-up stagger-1" ref={featureRefs[0]}>
              <div className="feature-icon">💡</div>
              <h3>Fresh Ideas</h3>
              <p>Inspiring talks from visionary thinkers breaking barriers</p>
            </div>

            <div className="feature-card fade-in-up stagger-2" ref={featureRefs[1]}>
              <div className="feature-icon">🌍</div>
              <h3>Global Impact</h3>
              <p>Ideas that transcend boundaries and create lasting change</p>
            </div>

            <div className="feature-card fade-in-up stagger-3" ref={featureRefs[2]}>
              <div className="feature-icon">🤝</div>
              <h3>Community</h3>
              <p>Connect with passionate minds and build meaningful relationships</p>
            </div>

            <div className="feature-card fade-in-up stagger-4" ref={featureRefs[3]}>
              <div className="feature-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Discover cutting-edge solutions to tomorrow's challenges</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
