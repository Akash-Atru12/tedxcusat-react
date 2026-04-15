import { useState } from 'react'
import './App.css'
import LoadingScreen from './components/loadingScreen'
import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Speaker from './components/speaker'
import CTA from './components/CTA'
function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <>
      <LoadingScreen onLoadingComplete={() => setShowContent(true)} />
      {showContent && (
        <div className="app">
          <Navbar />
          <Hero />
          <About />
          <Speaker />
          <CTA />
          <footer className="footer">
            <p>&copy;Created by Akash</p>
          </footer>
        </div>
      )}
    </>
  )
}

export default App
