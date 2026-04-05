import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, SlideContext, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

const PARAMS = [
  { label: 'n_estimators', value: '3', desc: { en: '3 trees in our forest', zh: '森林里3棵树' } },
  { label: 'max_features', value: '2', desc: { en: '2 of 4 features per split', zh: '每次分裂看4个中的2个' } },
  { label: 'dataset', value: '14 rows', desc: { en: 'our hiking records', zh: '我们的远足记录' } },
]

export default function S13_WorkedExampleSetup() {
  const t = useT()

  return (
    <SlideBase>
      <SlideContext>{t(SLIDE_TEXT.exampleSetup.context)}</SlideContext>
      <SlideHeading>{t(SLIDE_TEXT.exampleSetup.heading)}</SlideHeading>

      <TwoColumnSlide>
        <SlideColumn>
          <NarrativePanel delay={0.3}>
            <p>{t(NARRATIVES['example-setup'].paragraphs[0])}</p>
            <p className="mt-3">{t(NARRATIVES['example-setup'].paragraphs[1])}</p>
          </NarrativePanel>
          <NarrativePanel variant="insight" delay={0.5}>
            {t(NARRATIVES['example-setup'].callouts![0])}
          </NarrativePanel>
        </SlideColumn>

        <SlideColumn className="items-center justify-center">
          <div className="flex flex-col gap-4 w-full max-w-sm">
            {PARAMS.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.15, type: 'spring', stiffness: 180, damping: 20 }}
                className="flex items-center gap-4 px-5 py-4 rounded-xl"
                style={{
                  background: i < 2 ? 'rgba(27,122,61,0.06)' : 'rgba(213,208,200,0.2)',
                  border: `1px solid ${i < 2 ? 'rgba(27,122,61,0.15)' : 'rgba(213,208,200,0.4)'}`,
                }}
              >
                <span className="text-2xl font-bold tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: i < 2 ? 'var(--accent)' : 'var(--text-secondary)' }}>
                  {p.value}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-medium" style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-primary)' }}>
                    {p.label}
                  </span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                    {t(p.desc)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </SlideColumn>
      </TwoColumnSlide>
    </SlideBase>
  )
}
