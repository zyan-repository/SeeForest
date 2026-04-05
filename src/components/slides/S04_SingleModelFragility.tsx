import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideContext, SlideBridge, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { usePresentation } from '../../store/usePresentation'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

const TREE_CONFIGS = [
  {
    label: { en: 'Original (14 samples)', zh: '原始数据（14个样本）' },
    removedLabel: null,
    root: 'Outlook',
    children: [
      { label: 'Humidity', parent: 'left' },
      { label: 'Yes', parent: 'center', accent: true },
      { label: 'Wind', parent: 'right' },
    ],
  },
  {
    label: { en: 'Remove sample #3', zh: '移除样本 #3' },
    removedLabel: { en: '#3 removed', zh: '移除 #3' },
    root: 'Wind',
    children: [
      { label: 'Outlook', parent: 'left' },
      { label: 'Temp', parent: 'center' },
      { label: 'No', parent: 'right', accent: false },
    ],
  },
  {
    label: { en: 'Remove sample #8', zh: '移除样本 #8' },
    removedLabel: { en: '#8 removed', zh: '移除 #8' },
    root: 'Humidity',
    children: [
      { label: 'Yes', parent: 'left', accent: true },
      { label: 'Outlook', parent: 'center' },
      { label: 'Wind', parent: 'right' },
    ],
  },
]

function TreeDiagram({ config, isActive }: {
  config: typeof TREE_CONFIGS[number]
  isActive: boolean
}) {
  const nodeW = 88
  const nodeH = 28
  const positions = {
    root: { x: 120, y: 24 },
    left: { x: 40, y: 90 },
    center: { x: 120, y: 90 },
    right: { x: 200, y: 90 },
  }

  return (
    <motion.svg
      width={260}
      height={130}
      viewBox="0 0 240 130"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.25, scale: isActive ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 160, damping: 20 }}
    >
      {config.children.map((child, i) => {
        const pos = positions[child.parent as keyof typeof positions]
        return (
          <motion.line
            key={`edge-${i}`}
            x1={positions.root.x}
            y1={positions.root.y + nodeH / 2}
            x2={pos.x}
            y2={pos.y - nodeH / 2 + 4}
            stroke="rgba(213,208,200,0.5)"
            strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isActive ? 1 : 0.3 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          />
        )
      })}

      <rect
        x={positions.root.x - nodeW / 2}
        y={positions.root.y - nodeH / 2}
        width={nodeW}
        height={nodeH}
        rx={6}
        fill={isActive ? 'rgba(27,122,61,0.1)' : 'rgba(213,208,200,0.2)'}
        stroke={isActive ? 'var(--accent)' : 'rgba(213,208,200,0.4)'}
        strokeWidth={1.5}
      />
      <text
        x={positions.root.x}
        y={positions.root.y + 5}
        textAnchor="middle"
        fill={isActive ? 'var(--accent)' : 'var(--text-muted)'}
        fontSize={14}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={600}
      >
        {config.root}
      </text>

      {config.children.map((child, i) => {
        const pos = positions[child.parent as keyof typeof positions]
        const isAccent = child.accent
        return (
          <g key={`node-${i}`}>
            <rect
              x={pos.x - nodeW / 2}
              y={pos.y - nodeH / 2}
              width={nodeW}
              height={nodeH}
              rx={6}
              fill={isAccent ? 'rgba(27,122,61,0.1)' : 'rgba(213,208,200,0.2)'}
              stroke={isAccent ? 'var(--accent)' : 'rgba(213,208,200,0.4)'}
              strokeWidth={1}
            />
            <text
              x={pos.x}
              y={pos.y + 5}
              textAnchor="middle"
              fill={isAccent ? 'var(--accent)' : (isActive ? 'var(--text-primary)' : 'var(--text-muted)')}
              fontSize={13}
              fontFamily="JetBrains Mono, monospace"
            >
              {child.label}
            </text>
          </g>
        )
      })}
    </motion.svg>
  )
}

export default function S04_SingleModelFragility() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideContext>{t(SLIDE_TEXT.fragility.context)}</SlideContext>
      <SlideHeading>{t(SLIDE_TEXT.fragility.heading)}</SlideHeading>

      {/* Narrative text that changes with each subStep */}
      <div className="max-w-4xl w-full" style={{ minHeight: 160 }}>
        <AnimatePresence mode="popLayout">
          {subStep === 0 && (
            <motion.div key="subStep0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <NarrativePanel delay={0.3}>
                {t(NARRATIVES.fragility.paragraphs[0])}
              </NarrativePanel>
            </motion.div>
          )}
          {subStep === 1 && (
            <motion.div key="subStep1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <NarrativePanel variant="warning" delay={0}>
                {t(NARRATIVES.fragility.paragraphs[1])}
              </NarrativePanel>
            </motion.div>
          )}
          {subStep === 2 && (
            <motion.div key="subStep2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <NarrativePanel variant="warning" delay={0}>
                {t(NARRATIVES.fragility.paragraphs[2])}
              </NarrativePanel>
            </motion.div>
          )}
          {subStep === 3 && (
            <motion.div key="subStep3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <NarrativePanel variant="insight" delay={0}>
                {t(NARRATIVES.fragility.callouts![0])}
              </NarrativePanel>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Trees appear progressively */}
      <div className="flex items-end gap-6 mt-6">
        {TREE_CONFIGS.map((config, i) => (
          <motion.div
            key={i}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: subStep >= i ? 1 : 0, y: subStep >= i ? 0 : 20 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20, delay: i === 0 ? 0.5 : 0 }}
          >
            <span
              className="text-sm font-medium px-3 py-1 rounded-md"
              style={{
                fontFamily: 'var(--font-mono)',
                color: subStep === i || (subStep === 3 && i === 2) ? 'var(--accent)' : 'var(--text-muted)',
                background: subStep === i || (subStep === 3 && i === 2) ? 'rgba(27,122,61,0.08)' : 'transparent',
                border: `1px solid ${subStep === i || (subStep === 3 && i === 2) ? 'rgba(27,122,61,0.2)' : 'transparent'}`,
              }}
            >
              {t(config.label)}
            </span>

            <AnimatePresence>
              {config.removedLabel && subStep >= i && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    color: '#C0392B',
                    background: 'rgba(192,57,43,0.08)',
                    border: '1px solid rgba(192,57,43,0.15)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {t(config.removedLabel)}
                </motion.span>
              )}
            </AnimatePresence>

            <TreeDiagram config={config} isActive={subStep === i || (subStep === 3 && i === 2)} />
          </motion.div>
        ))}
      </div>

      <SlideBridge>{t(SLIDE_TEXT.fragility.bridge)}</SlideBridge>
    </SlideBase>
  )
}
