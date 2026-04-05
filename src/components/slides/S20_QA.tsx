import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlideBase, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

const RING_COUNT = 6
const GLYPH_COUNT = 8

function PulseRings() {
  return (
    <>
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.15; }
          100% { transform: scale(6); opacity: 0; }
        }
      `}</style>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              border: '1px solid var(--accent)',
              width: 120,
              height: 120,
              animation: `pulse-ring 6s ${i * 1}s linear infinite`,
              opacity: 0,
            }}
          />
        ))}
      </div>
    </>
  )
}

function FloatingGlyphs() {
  const glyphs = useMemo(() => {
    const rand = seededRandom(77)
    return Array.from({ length: GLYPH_COUNT }, (_, i) => ({
      id: i,
      x: 10 + rand() * 80,
      y: 10 + rand() * 80,
      size: 18 + rand() * 28,
      duration: 8 + rand() * 12,
      delay: rand() * 4,
      rotation: rand() * 360,
      opacity: 0.06 + rand() * 0.1,
    }))
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {glyphs.map((g) => (
        <motion.span
          key={g.id}
          className="absolute font-bold select-none"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            fontSize: g.size,
            color: 'var(--accent)',
            fontFamily: 'Inter, sans-serif',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            rotate: [g.rotation, g.rotation + 20, g.rotation],
            opacity: [g.opacity, g.opacity * 1.5, g.opacity],
          }}
          transition={{
            duration: g.duration,
            delay: g.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          ?
        </motion.span>
      ))}
    </div>
  )
}

export default function S20_QA() {
  const t = useT()

  return (
    <SlideBase>
      <PulseRings />
      <FloatingGlyphs />

      <div className="relative flex flex-col items-center" style={{ zIndex: 1, marginTop: 'auto', marginBottom: 'auto' }}>
        <motion.h1
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.2 }}
          className="text-8xl font-bold tracking-tight"
          style={{ color: 'var(--accent)' }}
        >
          {t(SLIDE_TEXT.qa.heading)}
        </motion.h1>

        {/* Animated gradient line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
          className="w-32 h-px mt-6 origin-center"
          style={{
            background: 'linear-gradient(90deg, transparent, var(--accent), transparent)',
          }}
        />

        <NarrativePanel delay={0.6} className="mt-6 max-w-2xl text-center">
          {t(NARRATIVES.qa.paragraphs[0])}
        </NarrativePanel>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl mt-6"
          style={{ color: 'var(--text-secondary)', fontFamily: 'Inter, sans-serif' }}
        >
          {t(SLIDE_TEXT.qa.thanks)}
        </motion.p>
      </div>
    </SlideBase>
  )
}
