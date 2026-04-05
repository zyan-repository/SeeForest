import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, SlideBridge, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { HIKING_DATASET, FEATURE_NAMES } from '../../data/hikingDataset'

const rowVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 180,
      damping: 22,
      delay: 0.4 + i * 0.06,
    },
  }),
}

export default function S02_ClassificationProblem() {
  const t = useT()

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.classification.heading)}</SlideHeading>

      <TwoColumnSlide>
        <SlideColumn>
          <NarrativePanel delay={0.4}>
            <p>{t(NARRATIVES.classification.paragraphs[0])}</p>
            <p className="mt-3">{t(NARRATIVES.classification.paragraphs[1])}</p>
          </NarrativePanel>
          <NarrativePanel variant="insight" delay={0.8}>
            {t(NARRATIVES.classification.callouts![0])}
          </NarrativePanel>
        </SlideColumn>

        <SlideColumn>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="w-full overflow-auto rounded-lg"
            style={{ border: '1px solid rgba(213,208,200,0.6)' }}
          >
            <table className="w-full text-base" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(213,208,200,0.6)' }}>
                  <th className="px-4 py-2.5 text-left text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>#</th>
                  {FEATURE_NAMES.map(name => (
                    <th
                      key={name}
                      className="px-4 py-2.5 text-left text-sm font-medium uppercase tracking-wider"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {name}
                    </th>
                  ))}
                  <th className="px-4 py-2.5 text-left text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--accent)' }}>
                    Hike?
                  </th>
                </tr>
              </thead>
              <tbody>
                {HIKING_DATASET.map((row, i) => (
                  <motion.tr
                    key={i}
                    custom={i}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ borderBottom: '1px solid rgba(213,208,200,0.3)' }}
                  >
                    <td className="px-5 py-2.5" style={{ color: 'var(--text-secondary)' }}>{i + 1}</td>
                    {FEATURE_NAMES.map(name => (
                      <td key={name} className="px-5 py-2.5" style={{ color: 'var(--text-primary)' }}>
                        {row.features[name]}
                      </td>
                    ))}
                    <td
                      className="px-4 py-2 font-medium"
                      style={{ color: row.label === 'Yes' ? 'var(--accent)' : 'rgba(138,154,138,0.6)' }}
                    >
                      {row.label}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </SlideColumn>
      </TwoColumnSlide>

      <SlideBridge>{t(SLIDE_TEXT.classification.bridge)}</SlideBridge>
    </SlideBase>
  )
}
