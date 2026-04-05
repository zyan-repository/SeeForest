import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, SlideContext, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { usePresentation } from '../../store/usePresentation'

export default function S16_RealWorldApps() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideContext>{t(SLIDE_TEXT.applications.context)}</SlideContext>
      <SlideHeading>{t(SLIDE_TEXT.applications.heading)}</SlideHeading>

      <NarrativePanel delay={0.4}>
        {t(NARRATIVES.applications.paragraphs[0])}
      </NarrativePanel>

      <div className="mt-10 w-full max-w-5xl flex flex-col gap-2">
        {SLIDE_TEXT.applications.items.map((item, i) => {
          const visible = i <= subStep
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ type: 'spring', stiffness: 160, damping: 22 }}
              className="w-full py-5 px-6 rounded-lg"
              style={{
                background: visible ? 'rgba(27,122,61,0.04)' : 'transparent',
                border: `1px solid ${visible ? 'rgba(27,122,61,0.12)' : 'transparent'}`,
              }}
            >
              <h3
                className="text-2xl font-medium"
                style={{ color: 'var(--accent)', fontFamily: 'Inter, sans-serif' }}
              >
                {t(item.title)}
              </h3>
              <p
                className="text-base mt-1.5 leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {t(item.desc)}
              </p>
            </motion.div>
          )
        })}
      </div>
    </SlideBase>
  )
}
