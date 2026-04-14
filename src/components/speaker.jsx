import './speaker.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Speaker() {
  const headerRef = useScrollAnimation({ once: false, exitAnimation: true });
  const speakerRefs = [
    useScrollAnimation({ once: false, exitAnimation: true }),
    useScrollAnimation({ once: false, exitAnimation: true }),
    useScrollAnimation({ once: false, exitAnimation: true })
  ];

  const speakers = [
    {
      name: 'Jishnu',
      title: 'AI Innovator',
      topic: 'Student at DCA CUSAT',
      image: '👨‍🔬',
    },
    {
      name: 'Neel Krishna',
      title: 'Data Scientist',
      topic: 'Student at DCA CUSAT',
      image: '👨‍💼',
    },
    {
      name: 'Mohammed Shenez',
      title: 'AI Researcher',
      topic: 'Student at DCA CUSAT',
      image: '👨‍💻',
    }
  ];

  return (
    <section id="speakers" className="speakers">
      <div className="container">
        <div className="speakers-header fade-in-down" ref={headerRef}>
          <h2>Meet Our Speakers</h2>
          <div className="accent-line"></div>
          <p className="section-subtitle">
            Visionary leaders sharing ideas worth spreading
          </p>
        </div>

        <div className="speakers-grid">
          {speakers.map((speaker, index) => (
            <div key={index} className="speaker-card fade-in-up" ref={speakerRefs[index]} style={{ animationDelay: `${index * 0.2}s` }}>

              <div className="speaker-image">{speaker.image}</div>
              <h3 className="speaker-name">{speaker.name}</h3>
              <p className="speaker-title">{speaker.title}</p>
              <p className="speaker-topic">{speaker.topic}</p>
              <div className="speaker-overlay">
                <p>Learn their inspiring story and ideas at TEDx CUSAT</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
