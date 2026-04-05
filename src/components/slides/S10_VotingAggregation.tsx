import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideBridge, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { VotingAnimation } from '../visualizations/VotingAnimation'
import { usePresentation } from '../../store/usePresentation'

export default function S10_VotingAggregation() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.voting.heading)}</SlideHeading>
      <TwoColumnSlide>
        <SlideColumn>
          <div className="max-w-4xl w-full" style={{ minHeight: 160 }}>
            <AnimatePresence mode="popLayout">
              {subStep === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <NarrativePanel delay={0.3}>
                    {t(NARRATIVES.voting.paragraphs[0])}
                  </NarrativePanel>
                </motion.div>
              )}
              {subStep === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <NarrativePanel variant="insight" delay={0}>
                    {t(NARRATIVES.voting.callouts![0])}
                  </NarrativePanel>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </SlideColumn>

        <SlideColumn>
          <AnimatePresence>
            {subStep >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 22 }}
                className="w-full flex justify-center"
              >
                <VotingAnimation />
              </motion.div>
            )}
          </AnimatePresence>
        </SlideColumn>
      </TwoColumnSlide>

      <SlideBridge>{t(SLIDE_TEXT.voting.bridge)}</SlideBridge>
    </SlideBase>
  )
}
