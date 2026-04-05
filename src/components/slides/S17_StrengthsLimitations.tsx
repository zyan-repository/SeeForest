import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

export default function S17_StrengthsLimitations() {
  const t = useT()

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.strengths.heading)}</SlideHeading>

      <TwoColumnSlide>
        {/* Strengths */}
        <SlideColumn>
          <div
            className="text-sm uppercase tracking-widest font-semibold mb-2"
            style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
          >
            {t({ en: 'Strengths', zh: '优势' })}
          </div>
          <div className="flex flex-col gap-3">
            {SLIDE_TEXT.strengths.pros.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-3 px-5 py-4 rounded-xl"
                style={{ background: 'rgba(27,122,61,0.05)', border: '1px solid rgba(27,122,61,0.12)' }}
              >
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: 'var(--accent)' }} />
                <span className="text-xl leading-snug" style={{ color: 'var(--text-primary)' }}>
                  {t(item)}
                </span>
              </motion.div>
            ))}
          </div>
        </SlideColumn>

        {/* Limitations */}
        <SlideColumn>
          <div
            className="text-sm uppercase tracking-widest font-semibold mb-2"
            style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
          >
            {t({ en: 'Limitations', zh: '局限' })}
          </div>
          <div className="flex flex-col gap-3">
            {SLIDE_TEXT.strengths.cons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 160, damping: 22, delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-3 px-5 py-4 rounded-xl"
                style={{ background: 'rgba(213,208,200,0.2)', border: '1px solid rgba(213,208,200,0.4)' }}
              >
                <span className="w-3 h-3 rounded-full shrink-0" style={{ background: 'var(--text-muted)' }} />
                <span className="text-xl leading-snug" style={{ color: 'var(--text-secondary)' }}>
                  {t(item)}
                </span>
              </motion.div>
            ))}
          </div>
        </SlideColumn>
      </TwoColumnSlide>

      <div style={{ marginTop: 60 }}>
        <NarrativePanel variant="insight" delay={1.0}>
          {t(NARRATIVES.strengths.callouts![0])}
        </NarrativePanel>
      </div>
    </SlideBase>
  )
}
