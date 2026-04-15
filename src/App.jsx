import { useState, useEffect, useRef } from 'react'
import './App.css'

import LoadingScreen from './components/loadingScreen'
import Navbar from './components/navbar'
import Hero from './components/hero'
import About from './components/about'
import Speaker from './components/speaker'
import CTA from './components/CTA'

// ─── WAYPOINTS ───────────────────────────────────────────────
const WAYPOINTS = [
  { top: 50, left: 75, scale: 1.0, opacity: 1 },
  { top: 50, left: 28, scale: 0.95, opacity: 1 },
  { top: 19, left: 23, scale: 0.35, opacity: 1 },
  { top: 50, left: 80, scale: 0.75, opacity: 1 },
]

function lerp(a, b, t) { return a + (b - a) * t }
function ease(t) { return t * t }

function App() {
  const [showContent, setShowContent] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const splineRef = useRef(null)

  const scrollState = useRef({
    cur: { ...WAYPOINTS[0] },
    target: { ...WAYPOINTS[0] },
    raf: null,
  })

  // ✅ Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  /* LOAD SPLINE */
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://unpkg.com/@splinetool/viewer@1.12.81/build/spline-viewer.js'
    script.type = 'module'
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    const state = scrollState.current

    const tick = () => {
      const SPEED = 0.06
      const c = state.cur
      const t = state.target

      if (isMobile) {
        // 🔥 MOBILE: bottom-center + smaller robot
        c.top = 76        // bottom position
        c.left = 50       // center horizontally
        c.scale = 0.45    // smaller size
        c.opacity = 0.9   // slight fade
      } else {
        // 💻 DESKTOP: normal animation
        c.top = lerp(c.top, t.top, SPEED)
        c.left = lerp(c.left, t.left, SPEED)
        c.scale = lerp(c.scale, t.scale, SPEED)
        c.opacity = lerp(c.opacity, t.opacity, SPEED)
      }

      if (splineRef.current) {
        splineRef.current.style.top = `${c.top}%`
        splineRef.current.style.left = `${c.left}%`
        splineRef.current.style.transform =
          `translate(-50%, -50%) scale(${c.scale})`
        splineRef.current.style.opacity = c.opacity
      }

      state.raf = requestAnimationFrame(tick)
    }

    const onScroll = () => {
      if (isMobile) return

      const scrollY = window.scrollY
      const vh = window.innerHeight

      const sAbout = document.getElementById('about')
      const sSpeaker = document.getElementById('speaker')
      const sCta = document.getElementById('cta')
      if (!sAbout || !sSpeaker || !sCta) return

      const LEAD = vh * 0.1

      const boundaries = [
        0,
        sAbout.offsetTop - LEAD,
        sSpeaker.offsetTop - LEAD,
        sCta.offsetTop - LEAD,
      ]

      let idx = 0
      for (let i = boundaries.length - 1; i >= 0; i--) {
        if (scrollY >= boundaries[i]) { idx = i; break }
      }

      const next = Math.min(idx + 1, WAYPOINTS.length - 1)
      const from = WAYPOINTS[idx]
      const to = WAYPOINTS[next]

      const segStart = boundaries[idx]
      const segEnd = boundaries[next] ?? segStart + vh

      const rawT = (scrollY - segStart) / Math.max(segEnd - segStart, 1)
      const t = ease(Math.min(Math.max(rawT, 0), 1))

      state.target = {
        top: lerp(from.top, to.top, t),
        left: lerp(from.left, to.left, t),
        scale: lerp(from.scale, to.scale, t),
        opacity: lerp(from.opacity, to.opacity, t),
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    state.raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(state.raf)
    }
  }, [isMobile])

  return (
    <>
      {/* 🤖 ROBOT */}
      <spline-viewer
        ref={splineRef}
        url="https://prod.spline.design/9ZiiGzYMrfGcjNGK/scene.splinecode"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          width: '100%',
          height: '100%',
          transform: 'translate(-50%, -50%) scale(1)',
          opacity: 1,
          zIndex: 1,
          pointerEvents: 'none',
          willChange: 'top, left, transform, opacity',
        }}
      />

      <LoadingScreen onLoadingComplete={() => setShowContent(true)} />

      {showContent && (
        <div className="app">
          <Navbar />
          <section id="hero"><Hero /></section>
          <section id="about"><About /></section>
          <section id="speaker"><Speaker /></section>
          <section id="cta"><CTA /></section>

          <footer className="footer">
            <p>&copy; Created by Akash-Atru12</p>
          </footer>
        </div>
      )}
    </>
  )
}

export default App