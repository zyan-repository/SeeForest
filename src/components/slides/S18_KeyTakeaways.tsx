import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

export default function S18_KeyTakeaways() {
  const t = useT()

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.takeaways.heading)}</SlideHeading>

      <NarrativePanel delay={0.4}>
        {t(NARRATIVES.takeaways.paragraphs[0])}
      </NarrativePanel>

      <div className="mt-12 w-full max-w-5xl flex flex-col gap-6">
        {SLIDE_TEXT.takeaways.points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: 'spring',
              stiffness: 140,
              damping: 20,
              delay: 0.4 + i * 0.2,
            }}
            className="flex items-start gap-4"
          >
            <span
              className="text-base font-medium mt-0.5 w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                background: 'rgba(27,122,61,0.08)',
                border: '1px solid rgba(27,122,61,0.25)',
                color: 'var(--accent)',
              }}
            >
              {i + 1}
            </span>
            <p
              className="text-xl leading-relaxed"
              style={{ color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif' }}
            >
              {t(point)}
            </p>
          </motion.div>
        ))}
      </div>
    </SlideBase>
  )
}
