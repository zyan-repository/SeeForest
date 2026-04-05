import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, SlideContext, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

function TreeNode({ x, y, label, accent = false, delay }: {
  x: number; y: number; label: string; accent?: boolean; delay: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20, delay }}
    >
      <rect
        x={x - 52}
        y={y - 16}
        width={104}
        height={32}
        rx={6}
        fill={accent ? 'rgba(27,122,61,0.12)' : 'rgba(213,208,200,0.3)'}
        stroke={accent ? 'var(--accent)' : 'rgba(213,208,200,0.3)'}
        strokeWidth={1}
      />
      <text
        x={x}
        y={y + 4}
        textAnchor="middle"
        fill={accent ? 'var(--accent)' : 'var(--text-primary)'}
        fontSize={16}
        fontFamily="JetBrains Mono, monospace"
      >
        {label}
      </text>
    </motion.g>
  )
}

function TreeEdge({ x1, y1, x2, y2, label, delay }: {
  x1: number; y1: number; x2: number; y2: number; label: string; delay: number
}) {
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.3 }}
    >
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(213,208,200,0.3)" strokeWidth={1} />
      <text
        x={(x1 + x2) / 2 + (x2 > x1 ? 8 : -8)}
        y={(y1 + y2) / 2 - 4}
        textAnchor="middle"
        fill="var(--text-secondary)"
        fontSize={13}
        fontFamily="JetBrains Mono, monospace"
      >
        {label}
      </text>
    </motion.g>
  )
}

export default function S03_DecisionTreeBrief() {
  const t = useT()

  return (
    <SlideBase>
      <SlideContext>{t(SLIDE_TEXT.decisionTree.context)}</SlideContext>
      <SlideHeading>{t(SLIDE_TEXT.decisionTree.heading)}</SlideHeading>

      <TwoColumnSlide>
        <SlideColumn>
          <NarrativePanel delay={0.4}>
            <p>{t(NARRATIVES['decision-tree'].paragraphs[0])}</p>
            <p className="mt-3">{t(NARRATIVES['decision-tree'].paragraphs[1])}</p>
          </NarrativePanel>
          <NarrativePanel variant="insight" delay={0.8}>
            {t(NARRATIVES['decision-tree'].callouts![0])}
          </NarrativePanel>
        </SlideColumn>

        <SlideColumn className="items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <svg width={720} height={380} viewBox="0 0 520 280">
              {/* Edges */}
              <TreeEdge x1={260} y1={46} x2={140} y2={100} label="Sunny" delay={0.5} />
              <TreeEdge x1={260} y1={46} x2={260} y2={100} label="Overcast" delay={0.6} />
              <TreeEdge x1={260} y1={46} x2={380} y2={100} label="Rain" delay={0.7} />
              <TreeEdge x1={140} y1={126} x2={80} y2={200} label="High" delay={0.9} />
              <TreeEdge x1={140} y1={126} x2={200} y2={200} label="Normal" delay={1.0} />
              <TreeEdge x1={380} y1={126} x2={320} y2={200} label="Weak" delay={1.1} />
              <TreeEdge x1={380} y1={126} x2={440} y2={200} label="Strong" delay={1.2} />

              {/* Nodes */}
              <TreeNode x={260} y={30} label="Outlook" delay={0.3} />
              <TreeNode x={140} y={110} label="Humidity" delay={0.5} />
              <TreeNode x={260} y={110} label="Yes" accent delay={0.6} />
              <TreeNode x={380} y={110} label="Wind" delay={0.7} />
              <TreeNode x={80} y={210} label="No" delay={0.9} />
              <TreeNode x={200} y={210} label="Yes" accent delay={1.0} />
              <TreeNode x={320} y={210} label="Yes" accent delay={1.1} />
              <TreeNode x={440} y={210} label="No" delay={1.2} />
            </svg>
          </motion.div>
        </SlideColumn>
      </TwoColumnSlide>
    </SlideBase>
  )
}
