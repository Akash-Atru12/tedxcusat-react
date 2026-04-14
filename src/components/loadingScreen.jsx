import { useState, useEffect } from 'react';
import './loadingScreen.css';

export default function LoadingScreen({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 3000); // 3 second loading delay

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className="loading-screen">
      <div className="loading-container">
        <div className="loading-content">
          <h1 className="loading-title">
            <span className="tedx-text">TEDx</span>
            <span className="cusat-text">CUSAT</span>
          </h1>
          <p className="loading-tagline">Ideas Worth Spreading</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
  );
}
