import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { usePresentation } from '../../store/usePresentation'

const ICONS = ['Sample', 'Feature', 'Grow', 'Vote'] as const

const stepVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 160, damping: 20 },
  },
}

export default function S06_WhatIsRF() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.whatIsRF.heading)}</SlideHeading>

      <div className="flex items-center gap-4 mt-10">
        {SLIDE_TEXT.whatIsRF.steps.map((step, i) => {
          const visible = i <= subStep
          return (
            <div key={i} className="flex items-center gap-3">
              {i > 0 && (
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={visible ? { opacity: 0.3, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="h-px w-10 origin-left"
                  style={{ background: 'var(--text-secondary)' }}
                />
              )}
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate={visible ? 'visible' : 'hidden'}
                className="flex flex-col items-center gap-4 w-56"
              >
                <div
                  className="w-28 h-28 rounded-xl flex items-center justify-center text-xl font-semibold"
                  style={{
                    background: visible ? 'rgba(27,122,61,0.08)' : 'rgba(213,208,200,0.2)',
                    border: `2px solid ${visible ? 'var(--accent)' : 'rgba(213,208,200,0.6)'}`,
                    color: visible ? 'var(--accent)' : 'var(--text-secondary)',
                    fontFamily: 'JetBrains Mono, monospace',
                  }}
                >
                  {ICONS[i]}
                </div>
                <span
                  className="text-lg text-center leading-snug"
                  style={{
                    color: visible ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                >
                  {t(step)}
                </span>
              </motion.div>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop: 60 }}>
        <NarrativePanel delay={0.5} className="max-w-3xl">
          <p>{t(NARRATIVES['what-is-rf'].paragraphs[0])}</p>
        </NarrativePanel>
      </div>

      <div style={{ marginTop: 24 }}>
        <NarrativePanel variant="insight" delay={0.6} className="max-w-3xl">
          <p className="font-medium">{t(NARRATIVES['what-is-rf'].callouts![0])}</p>
        </NarrativePanel>
      </div>
    </SlideBase>
  )
}
