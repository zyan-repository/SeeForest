import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideBridge, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { usePresentation } from '../../store/usePresentation'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { CrowdWisdomViz } from '../visualizations/CrowdWisdomViz'

export default function S05_WisdomOfCrowds() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.wisdom.heading)}</SlideHeading>

      <TwoColumnSlide>
        <SlideColumn>
          <div className="max-w-4xl w-full" style={{ minHeight: 160 }}>
            <AnimatePresence mode="popLayout">
              {subStep === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <NarrativePanel delay={0.3}>
                    {t(NARRATIVES.wisdom.paragraphs[0])}
                  </NarrativePanel>
                </motion.div>
              )}
              {subStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <NarrativePanel delay={0}>
                    {t(NARRATIVES.wisdom.paragraphs[1])}
                  </NarrativePanel>
                </motion.div>
              )}
              {subStep === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <NarrativePanel variant="insight" delay={0}>
                    {t(NARRATIVES.wisdom.callouts![0])}
                  </NarrativePanel>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SlideColumn>

        <SlideColumn className="items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 22, delay: 0.4 }}
            className="w-full flex justify-center"
          >
            <CrowdWisdomViz step={subStep} />
          </motion.div>
        </SlideColumn>
      </TwoColumnSlide>

      <SlideBridge delay={2.0}>{t(SLIDE_TEXT.wisdom.bridge)}</SlideBridge>
    </SlideBase>
  )
}
