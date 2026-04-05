import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { usePresentation } from '../../store/usePresentation'

const STEPS = [
  {
    title: { en: 'Step 1: Sample Data (with replacement)', zh: '第1步：有放回抽样' },
    description: {
      en: 'From 14 hiking records, randomly draw 14 with replacement. Some appear twice (+), some are left out (dimmed).',
      zh: '从14条远足记录中有放回地抽取14个。有些出现两次(+)，有些未被选中(变暗)。',
    },
  },
  {
    title: { en: 'Step 2: Build Tree 1', zh: '第2步：构建树 1' },
    description: {
      en: 'The tree trains on this sample, picking 2 random features at each split. Result: a unique decision path.',
      zh: '树在这份样本上训练，每次分裂随机选2个特征。结果：一条独特的决策路径。',
    },
  },
  {
    title: { en: 'Step 3: Build Trees 2 & 3', zh: '第3步：构建树 2 和树 3' },
    description: {
      en: 'Repeat with new samples and new random features. Each tree develops a different structure.',
      zh: '用新样本和新的随机特征重复。每棵树发展出不同的结构。',
    },
  },
  {
    title: { en: 'Step 4: Send Data Through Trees', zh: '第4步：数据送入每棵树' },
    description: {
      en: 'New day: Sunny, Mild, Normal humidity, Weak wind. Each tree follows its own path to an answer.',
      zh: '新的一天：晴天、温和、正常湿度、弱风。每棵树沿自己的路径得出答案。',
    },
  },
  {
    title: { en: 'Step 5: Majority Vote = Yes!', zh: '第5步：多数投票 = Yes！' },
    description: {
      en: 'Tree 1: Yes, Tree 2: Yes, Tree 3: No. Vote 2:1 -- go hiking!',
      zh: '树1：Yes，树2：Yes，树3：No。投票2:1——去远足！',
    },
  },
]

const BALL_COLORS = ['#2D6A4F', '#1B7A3D', '#B07D2B', '#8B4513', '#4A5D4A', '#6B4226', '#2D8A4E',
  '#2D6A4F', '#B07D2B', '#1B7A3D', '#8B4513', '#4A5D4A', '#6B4226', '#2D8A4E']

// Step 1: Bootstrap sampling animation
function BootstrapViz() {
  const selected = [0, 2, 2, 4, 6, 6, 8, 9, 10, 3, 5, 12, 12, 1]
  const oob = new Set([3, 7, 11, 13])

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        Original
      </div>
      <div className="flex flex-wrap gap-1.5 justify-center" style={{ maxWidth: 260 }}>
        {Array.from({ length: 14 }, (_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1, opacity: oob.has(i) ? 0.2 : 1 }}
            transition={{ delay: i * 0.04, type: 'spring', stiffness: 300, damping: 18 }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: BALL_COLORS[i], color: '#FAFAF7', fontFamily: 'var(--font-mono)' }}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
        className="text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
        Sample
      </motion.div>
      <div className="flex flex-wrap gap-1.5 justify-center" style={{ maxWidth: 260 }}>
        {selected.map((idx, i) => {
          const dup = selected.indexOf(idx) !== i
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, y: -20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.05, type: 'spring', stiffness: 300, damping: 15 }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold relative"
              style={{ background: BALL_COLORS[idx], color: '#FAFAF7', fontFamily: 'var(--font-mono)' }}
            >
              {idx + 1}
              {dup && <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white text-[8px] flex items-center justify-center" style={{ color: BALL_COLORS[idx], border: `1px solid ${BALL_COLORS[idx]}` }}>+</span>}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Step 2: Single tree growing
function TreeViz() {
  const nodes = [
    { x: 130, y: 25, label: 'Outlook', leaf: false },
    { x: 70, y: 85, label: 'Humid', leaf: false, px: 130, py: 25 },
    { x: 190, y: 85, label: 'Y', leaf: true, px: 130, py: 25 },
    { x: 40, y: 140, label: 'N', leaf: true, px: 70, py: 85 },
    { x: 100, y: 140, label: 'Y', leaf: true, px: 70, py: 85 },
  ]
  return (
    <svg viewBox="0 0 260 170" className="w-full h-full" style={{ maxHeight: 240 }}>
      {nodes.map((n, i) => n.px !== undefined ? (
        <motion.line key={`e${i}`} x1={n.px} y1={n.py + 14} x2={n.x} y2={n.y - 14}
          stroke="rgba(27,122,61,0.3)" strokeWidth={2}
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
          transition={{ delay: i * 0.15, duration: 0.4 }} />
      ) : null)}
      {nodes.map((n, i) => {
        const w = n.leaf ? 40 : 70
        return (
          <motion.g key={`n${i}`} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.15, type: 'spring', stiffness: 250, damping: 18 }}>
            <rect x={n.x - w / 2} y={n.y - 14} width={w} height={28} rx={6}
              fill={n.leaf ? (n.label === 'Y' ? 'rgba(45,138,78,0.15)' : 'rgba(192,57,43,0.1)') : 'rgba(27,122,61,0.08)'}
              stroke={n.leaf ? (n.label === 'Y' ? '#2D8A4E' : '#C0392B') : '#2D6A4F'} strokeWidth={1.5} />
            <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={14} fontFamily="JetBrains Mono" fontWeight={600}
              fill={n.leaf ? (n.label === 'Y' ? '#2D8A4E' : '#C0392B') : '#2D6A4F'}>{n.label}</text>
          </motion.g>
        )
      })}
    </svg>
  )
}

// Step 3: Three trees side by side
function ThreeTreesViz() {
  const trees = [
    { root: 'Outlook', left: 'Y', right: 'Wind', color: '#2D6A4F' },
    { root: 'Humid', left: 'Temp', right: 'N', color: '#1B7A3D' },
    { root: 'Wind', left: 'N', right: 'Y', color: '#B07D2B' },
  ]
  return (
    <div className="flex gap-3">
      {trees.map((t, ti) => (
        <motion.div key={ti} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: ti * 0.3, type: 'spring', stiffness: 150, damping: 18 }}
          className="rounded-lg p-2" style={{ background: 'rgba(242,240,235,0.85)', border: '1px solid rgba(213,208,200,0.6)' }}>
          <div className="text-xs text-center mb-1 uppercase tracking-wider font-semibold" style={{ color: t.color, fontFamily: 'var(--font-mono)' }}>Tree {ti + 1}</div>
          <svg viewBox="0 0 160 110" width={160} height={110}>
            <line x1={80} y1={30} x2={40} y2={74} stroke={`${t.color}50`} strokeWidth={1.5} />
            <line x1={80} y1={30} x2={120} y2={74} stroke={`${t.color}50`} strokeWidth={1.5} />
            <rect x={30} y={8} width={100} height={28} rx={5} fill={`${t.color}15`} stroke={t.color} strokeWidth={1.5} />
            <text x={80} y={27} textAnchor="middle" fontSize={15} fontFamily="JetBrains Mono" fill={t.color} fontWeight={600}>{t.root}</text>
            {[{ x: 40, label: t.left }, { x: 120, label: t.right }].map((n, ni) => {
              const isLeaf = n.label === 'Y' || n.label === 'N'
              return (
                <g key={ni}>
                  <rect x={n.x - 30} y={66} width={60} height={28} rx={5}
                    fill={isLeaf ? (n.label === 'Y' ? 'rgba(45,138,78,0.15)' : 'rgba(192,57,43,0.1)') : `${t.color}10`}
                    stroke={isLeaf ? (n.label === 'Y' ? '#2D8A4E' : '#C0392B') : t.color} strokeWidth={1.5} />
                  <text x={n.x} y={85} textAnchor="middle" fontSize={14} fontFamily="JetBrains Mono" fontWeight={600}
                    fill={isLeaf ? (n.label === 'Y' ? '#2D8A4E' : '#C0392B') : t.color}>{n.label}</text>
                </g>
              )
            })}
          </svg>
        </motion.div>
      ))}
    </div>
  )
}

// Step 4: Data flowing through trees
function DataFlowViz() {
  const results = [
    { tree: 1, color: '#2D6A4F', path: 'Outlook→Sunny→Humid→Normal', vote: 'Yes' },
    { tree: 2, color: '#1B7A3D', path: 'Humid→Normal→Temp→Mild', vote: 'Yes' },
    { tree: 3, color: '#B07D2B', path: 'Wind→Weak→...', vote: 'No' },
  ]
  return (
    <div className="flex flex-col gap-3">
      {results.map((r, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.3, type: 'spring', stiffness: 150, damping: 18 }}
          className="flex items-center gap-3 px-4 py-3 rounded-lg"
          style={{ background: 'rgba(242,240,235,0.85)', border: '1px solid rgba(213,208,200,0.6)' }}>
          <span className="text-base font-bold shrink-0" style={{ color: r.color, fontFamily: 'var(--font-mono)' }}>T{r.tree}</span>
          <motion.div className="flex-1 h-px" style={{ background: r.color, opacity: 0.3 }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.2 + i * 0.3, duration: 0.5 }} />
          <span className="text-sm shrink-0" style={{ color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{r.path}</span>
          <motion.div className="flex-1 h-px" style={{ background: r.color, opacity: 0.3 }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.4 + i * 0.3, duration: 0.5 }} />
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}
            transition={{ delay: 0.6 + i * 0.3, type: 'spring', stiffness: 300, damping: 15 }}
            className="px-4 py-1.5 rounded-md text-base font-bold"
            style={{
              fontFamily: 'var(--font-mono)',
              background: r.vote === 'Yes' ? 'rgba(27,122,61,0.1)' : 'rgba(192,57,43,0.08)',
              color: r.vote === 'Yes' ? '#2D8A4E' : '#C0392B',
              border: `1px solid ${r.vote === 'Yes' ? 'rgba(27,122,61,0.3)' : 'rgba(192,57,43,0.2)'}`,
            }}>
            {r.vote}
          </motion.span>
        </motion.div>
      ))}
    </div>
  )
}

// Step 5: Vote result
function VoteViz() {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-5">
        {[
          { tree: 1, vote: 'Yes', yes: true },
          { tree: 2, vote: 'Yes', yes: true },
          { tree: 3, vote: 'No', yes: false },
        ].map((v, i) => (
          <motion.div key={i} initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: i * 0.2, type: 'spring', stiffness: 200, damping: 15 }}
            className="flex flex-col items-center gap-2 px-6 py-4 rounded-xl"
            style={{
              background: v.yes ? 'rgba(27,122,61,0.08)' : 'rgba(192,57,43,0.06)',
              border: `2px solid ${v.yes ? 'var(--accent)' : '#C0392B'}`,
            }}>
            <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Tree {v.tree}</span>
            <span className="text-3xl font-bold" style={{ color: v.yes ? 'var(--accent)' : '#C0392B', fontFamily: 'var(--font-mono)' }}>{v.vote}</span>
          </motion.div>
        ))}
      </div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
        className="text-2xl font-bold px-8 py-3 rounded-xl"
        style={{ color: 'var(--accent)', background: 'rgba(27,122,61,0.1)', border: '2px solid var(--accent)', fontFamily: 'var(--font-mono)' }}>
        2 : 1 → Yes!
      </motion.div>
    </div>
  )
}

const STEP_VIZS = [BootstrapViz, TreeViz, ThreeTreesViz, DataFlowViz, VoteViz]

export default function S14_StepByStep() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.stepByStep.heading)}</SlideHeading>

      {/* Progress dots */}
      <div className="flex items-center gap-1.5" style={{ marginTop: 8, marginBottom: 48 }}>
        {STEPS.map((_, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <motion.div
              animate={{ background: i <= subStep ? 'var(--accent)' : 'var(--border)', scale: i === subStep ? 1.5 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-3 h-3 rounded-full"
              style={{ boxShadow: i === subStep ? '0 0 12px var(--accent)' : 'none' }}
            />
            {i < STEPS.length - 1 && (
              <div className="w-12 h-px" style={{ background: i < subStep ? 'var(--accent)' : 'var(--border)', opacity: i < subStep ? 0.5 : 1 }} />
            )}
          </div>
        ))}
      </div>

      {/* Step content: animation left, text right */}
      <div style={{ minHeight: 340 }}>
      <AnimatePresence mode="wait">
        {subStep < STEPS.length && (() => {
          const Viz = STEP_VIZS[subStep]
          return (
            <motion.div
              key={subStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="flex items-center gap-10 max-w-5xl w-full"
            >
              <div className="flex-1 min-w-0 flex justify-center">
                <Viz />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-4">
                <h3 className="text-2xl font-semibold" style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>
                  {t(STEPS[subStep].title)}
                </h3>
                <NarrativePanel delay={0}>
                  {t(STEPS[subStep].description)}
                </NarrativePanel>
              </div>
            </motion.div>
          )
        })()}
      </AnimatePresence>
      </div>
    </SlideBase>
  )
}
