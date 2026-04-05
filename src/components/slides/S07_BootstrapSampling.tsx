import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideBridge, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { usePresentation } from '../../store/usePresentation'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { BootstrapSampler } from '../visualizations/BootstrapSampler'
import { FormulaCard } from '../ui/FormulaCard'

export default function S07_BootstrapSampling() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.bootstrap.heading)}</SlideHeading>
      <TwoColumnSlide>
        <SlideColumn>
          <div style={{ minHeight: 160 }}>
          <AnimatePresence mode="popLayout">
            {subStep === 0 && (
              <motion.div
                key="subStep-0"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                <NarrativePanel>
                  {t(NARRATIVES.bootstrap.paragraphs[0])}
                </NarrativePanel>
              </motion.div>
            )}
            {subStep === 1 && (
              <motion.div
                key="subStep-1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-4"
              >
                <FormulaCard
                  label={t({ en: 'Each sample has ~36.8% chance of NOT being selected', zh: '每个样本有约36.8%的概率不被选中' })}
                  formula="P(not picked) = (1 - 1/n)^n ≈ 0.368"
                  delay={0}
                />
                <NarrativePanel variant="insight" delay={0}>
                  {t(NARRATIVES.bootstrap.callouts![0])}
                </NarrativePanel>
              </motion.div>
            )}
          </AnimatePresence>
          </div>
        </SlideColumn>

        <SlideColumn>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 22, delay: 0.4 }}
            className="w-full flex justify-center"
          >
            <BootstrapSampler dataSize={14} step={subStep} />
          </motion.div>
        </SlideColumn>
      </TwoColumnSlide>

      <SlideBridge>{t(SLIDE_TEXT.bootstrap.bridge)}</SlideBridge>
    </SlideBase>
  )
}
