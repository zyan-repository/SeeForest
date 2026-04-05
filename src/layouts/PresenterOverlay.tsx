import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { usePresentation } from '../store/usePresentation'
import { SLIDES } from '../data/slideConfig'

export function TimerOverlay() {
  const { currentSlide } = usePresentation()
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - start) / 1000))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const minutes = Math.floor(elapsed / 60)
  const seconds = elapsed % 60

  const targetSeconds = SLIDES.slice(0, currentSlide + 1).reduce((s, sl) => s + sl.durationHint, 0)
  const isAhead = elapsed < targetSeconds
  const progress = (currentSlide + 1) / SLIDES.length

  return (
    <div
      className="fixed bottom-4 right-4 z-[100] pointer-events-auto"
      style={{ fontFamily: 'var(--font-mono)' }}
    >
      <div
        className="rounded-lg px-4 py-2.5 flex items-center gap-3"
        style={{
          background: 'rgba(26,46,26,0.88)',
          border: '1px solid rgba(45,106,79,0.3)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div
          className="text-lg tabular-nums font-medium"
          style={{ color: isAhead ? '#A8E6CF' : '#FFD3A0' }}
        >
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>

        <div className="w-16 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: isAhead ? '#A8E6CF' : '#FFD3A0' }}
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          />
        </div>

        <span
          className="text-[10px] uppercase tracking-wider"
          style={{ color: isAhead ? '#A8E6CF' : '#FFD3A0' }}
        >
          {isAhead ? 'on track' : 'behind'}
        </span>
      </div>
    </div>
  )
}
