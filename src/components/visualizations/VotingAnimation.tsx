import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TreeVote {
  readonly treeId: number
  readonly vote: 'Yes' | 'No'
  readonly path: readonly ('left' | 'right')[]
}

const TREE_VOTES: readonly TreeVote[] = [
  { treeId: 1, vote: 'Yes', path: ['left', 'right'] },
  { treeId: 2, vote: 'Yes', path: ['right', 'left'] },
  { treeId: 3, vote: 'No', path: ['left', 'left'] },
  { treeId: 4, vote: 'Yes', path: ['right', 'right'] },
  { treeId: 5, vote: 'No', path: ['right', 'left'] },
]

const TREE_COLORS = ['#2D6A4F', '#1B7A3D', '#6B4226', '#8B4513', '#B07D2B']

export function VotingAnimation() {
  const [activeTree, setActiveTree] = useState(-1)
  const [votes, setVotes] = useState<Array<{ treeId: number; vote: string }>>([])
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    TREE_VOTES.forEach((tv, i) => {
      timers.push(setTimeout(() => setActiveTree(i), 500 + i * 1200))
      timers.push(setTimeout(() => {
        setVotes(prev => [...prev, { treeId: tv.treeId, vote: tv.vote }])
      }, 500 + i * 1200 + 800))
    })
    timers.push(setTimeout(() => setShowResult(true), 500 + TREE_VOTES.length * 1200 + 400))
    return () => timers.forEach(clearTimeout)
  }, [])

  const yesCount = votes.filter(v => v.vote === 'Yes').length
  const noCount = votes.filter(v => v.vote === 'No').length

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-8">
      {/* Trees */}
      <div className="flex gap-8 items-end">
        {TREE_VOTES.map((tv, i) => {
          const isActive = activeTree === i
          const hasVoted = votes.some(v => v.treeId === tv.treeId)
          const color = TREE_COLORS[i]

          return (
            <div key={tv.treeId} className="flex flex-col items-center gap-3">
              {/* Mini tree */}
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  opacity: hasVoted ? 0.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="relative"
              >
                <svg width="100" height="130" viewBox="0 0 80 100">
                  {/* Trunk */}
                  <rect x="35" y="62" width="10" height="32" rx="3" fill="rgba(138,154,138,1)" />
                  {/* Canopy layers */}
                  <polygon points="40,10 13,52 67,52" fill={color} opacity={0.7} />
                  <polygon points="40,0 20,38 60,38" fill={color} opacity={0.9} />
                </svg>

                {/* Glow when active */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `radial-gradient(circle, ${color}20, transparent)`,
                      filter: 'blur(8px)',
                    }}
                  />
                )}

                {/* Traveling dot */}
                <AnimatePresence>
                  {isActive && !hasVoted && (
                    <motion.div
                      initial={{ top: -10, opacity: 0 }}
                      animate={{ top: 40, opacity: 1 }}
                      exit={{ top: 70, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                      className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                      style={{
                        background: 'white',
                        boxShadow: '0 0 12px white',
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>

              <span
                className="text-xs tracking-wider uppercase"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: hasVoted ? color : 'var(--text-muted)',
                }}
              >
                Tree {tv.treeId}
              </span>

              {/* Vote chip */}
              <AnimatePresence>
                {hasVoted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="px-4 py-1.5 rounded-full text-sm font-medium"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: tv.vote === 'Yes' ? 'rgba(27,122,61,0.15)' : 'rgba(192,57,43,0.15)',
                      color: tv.vote === 'Yes' ? '#2D8A4E' : '#C0392B',
                      border: `1px solid ${tv.vote === 'Yes' ? '#2D8A4E' : '#C0392B'}30`,
                    }}
                  >
                    {tv.vote}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Vote tally */}
      <div className="flex gap-8 items-center">
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'var(--font-mono)', color: '#2D8A4E', fontSize: '30px' }}>
            {yesCount}
          </span>
          <span className="text-base" style={{ color: 'var(--text-secondary)' }}>Yes</span>
        </div>
        <div
          className="w-px h-6"
          style={{ background: 'rgba(213,208,200,0.6)' }}
        />
        <div className="flex items-center gap-2">
          <span style={{ fontFamily: 'var(--font-mono)', color: '#C0392B', fontSize: '30px' }}>
            {noCount}
          </span>
          <span className="text-base" style={{ color: 'var(--text-secondary)' }}>No</span>
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: yesCount > noCount ? '#2D8A4E' : '#C0392B',
                boxShadow: `0 0 8px ${yesCount > noCount ? '#2D8A4E' : '#C0392B'}`,
              }}
            />
            <span
              className="text-xl font-medium"
              style={{
                fontFamily: 'var(--font-mono)',
                color: yesCount > noCount ? '#2D8A4E' : '#C0392B',
              }}
            >
              Majority Vote: {yesCount > noCount ? 'Yes' : 'No'}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
