import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideBridge, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { usePresentation } from '../../store/usePresentation'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { FEATURE_NAMES } from '../../data/hikingDataset'

// Different random selections at each split
const SELECTIONS = [
  new Set(['outlook', 'wind']),
  new Set(['humidity', 'temperature']),
  new Set(['outlook', 'humidity']),
  new Set(['wind', 'temperature']),
  new Set(['outlook', 'temperature']),
]

const FEATURE_COLORS: Record<string, string> = {
  outlook: '#2D6A4F',
  temperature: '#8B4513',
  humidity: '#1B7A3D',
  wind: '#B07D2B',
}

export default function S08_FeatureRandomness() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)
  const [round, setRound] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRound(r => (r + 1) % SELECTIONS.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const currentSelection = SELECTIONS[round]

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.featureRandom.heading)}</SlideHeading>
      <TwoColumnSlide>
        <SlideColumn>
          <div style={{ minHeight: 160 }}>
          <AnimatePresence mode="popLayout">
            {subStep === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <NarrativePanel delay={0.3}>
                  {t(NARRATIVES['feature-random'].paragraphs[0])}
                </NarrativePanel>
              </motion.div>
            )}
            {subStep === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <NarrativePanel variant="insight" delay={0}>
                  {t(NARRATIVES['feature-random'].paragraphs[1])}
                </NarrativePanel>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </SlideColumn>

        <SlideColumn>
          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-2 gap-4">
              {FEATURE_NAMES.map((name, i) => {
                const isSelected = currentSelection.has(name)
                const color = FEATURE_COLORS[name]

                return (
                  <motion.div
                    key={name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: isSelected ? 1 : 0.95,
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 22, delay: i * 0.05 }}
                    className="flex flex-col items-center gap-2"
                  >
                    <motion.div
                      animate={{
                        borderColor: isSelected ? `${color}66` : 'rgba(213,208,200,0.4)',
                        background: isSelected ? `${color}10` : 'rgba(213,208,200,0.15)',
                      }}
                      transition={{ duration: 0.4 }}
                      className="w-32 rounded-lg flex flex-col items-center justify-center gap-2"
                      style={{ height: 120, border: '1px solid' }}
                    >
                      {[0.7, 0.5, 0.85, 0.4, 0.65].map((w, j) => (
                        <motion.div
                          key={j}
                          animate={{
                            opacity: isSelected ? 0.7 : 0.15,
                            background: isSelected ? color : 'var(--border)',
                          }}
                          transition={{ duration: 0.3, delay: j * 0.02 }}
                          className="h-1.5 rounded-full"
                          style={{ width: `${w * 70}%` }}
                        />
                      ))}
                    </motion.div>

                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{
                          scale: isSelected ? 1 : 0,
                          opacity: isSelected ? 1 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                      />
                      <motion.span
                        animate={{ color: isSelected ? color : 'rgba(138,154,138,0.4)' }}
                        transition={{ duration: 0.3 }}
                        className="text-sm font-medium capitalize"
                        style={{ fontFamily: 'var(--font-mono)' }}
                      >
                        {name}
                      </motion.span>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Split counter */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Split {round + 1}/{SELECTIONS.length}
              </span>
              <div className="flex gap-1">
                {SELECTIONS.map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                    style={{
                      background: i === round ? 'var(--accent)' : 'var(--border)',
                      boxShadow: i === round ? '0 0 6px var(--accent)' : 'none',
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </SlideColumn>
      </TwoColumnSlide>

      <SlideBridge>{t(SLIDE_TEXT.featureRandom.bridge)}</SlideBridge>
    </SlideBase>
  )
}
