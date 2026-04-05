import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideDescription, SlideBridge, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { ForestGrowth } from '../visualizations/ForestGrowth'
import { usePresentation } from '../../store/usePresentation'

export default function S09_GrowingTheForest() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.growingForest.heading)}</SlideHeading>
      <SlideDescription>{t(SLIDE_TEXT.growingForest.description)}</SlideDescription>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 150, damping: 22, delay: 0.4 }}
        className="mt-10 w-full flex justify-center"
      >
        <ForestGrowth />
      </motion.div>

      <div className="max-w-5xl w-full" style={{ minHeight: 160, marginTop: 48 }}>
        <AnimatePresence mode="popLayout">
          {subStep === 0 && (
            <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <NarrativePanel delay={0.3}>
                {t(NARRATIVES['growing-forest'].paragraphs[0])}
              </NarrativePanel>
            </motion.div>
          )}
          {subStep === 1 && (
            <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <NarrativePanel variant="insight" delay={0}>
                {t(NARRATIVES['growing-forest'].callouts![0])}
              </NarrativePanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SlideBridge>{t(SLIDE_TEXT.growingForest.bridge)}</SlideBridge>
    </SlideBase>
  )
}
