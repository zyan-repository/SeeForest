import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '../../hooks/useT'

interface Ball {
  readonly id: number
  readonly color: string
  readonly label: string
}

const COLORS = [
  '#1B7A3D', '#2D6A4F', '#2D6A4F', '#4A5D4A',
  '#8B4513', '#B07D2B', '#9A7B4F', '#6B4226',
  '#C0392B', '#1B7A3D', '#2D6A4F', '#2D6A4F',
  '#4A5D4A', '#8B4513',
]

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

interface BootstrapSamplerProps {
  dataSize?: number
  step?: number
}

export function BootstrapSampler({ dataSize = 14, step = 0 }: BootstrapSamplerProps) {
  const t = useT()
  const showSample = step >= 1

  const balls: Ball[] = useMemo(
    () =>
      Array.from({ length: dataSize }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        label: String(i + 1),
      })),
    [dataSize],
  )

  const { selected, oob } = useMemo(() => {
    if (!showSample) return { selected: [] as number[], oob: [] as number[] }
    const random = seededRandom(137)
    const selectedIndices: number[] = []
    const selectedSet = new Set<number>()
    for (let i = 0; i < dataSize; i++) {
      const idx = Math.floor(random() * dataSize)
      selectedIndices.push(idx)
      selectedSet.add(idx)
    }
    const oobIndices = Array.from({ length: dataSize }, (_, i) => i).filter(i => !selectedSet.has(i))
    return { selected: selectedIndices, oob: oobIndices }
  }, [showSample, dataSize])

  const uniqueCount = new Set(selected).size
  const oobSet = new Set(oob)

  return (
    <div className="w-full flex flex-col items-center gap-6">
      {/* Source bag */}
      <div className="relative">
        <div
          className="text-sm uppercase tracking-widest mb-3 text-center"
          style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
        >
          {t({ en: 'Original Dataset', zh: '原始数据集' })}
        </div>
        <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl">
          {balls.map((ball) => {
            const isOOB = showSample && oobSet.has(ball.id)
            return (
              <motion.div
                key={ball.id}
                animate={{
                  opacity: isOOB ? 0.2 : 1,
                  scale: isOOB ? 0.85 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="w-14 h-14 rounded-full flex items-center justify-center text-base font-medium"
                style={{
                  background: ball.color,
                  color: '#FAFAF7',
                  fontFamily: 'var(--font-mono)',
                  boxShadow: isOOB ? 'none' : `0 0 8px ${ball.color}30`,
                }}
              >
                {ball.label}
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Bootstrap sample - appears on step 1 */}
      <AnimatePresence>
        {showSample && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="relative"
          >
            <div
              className="text-sm uppercase tracking-widest mb-3 text-center"
              style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
            >
              {t({ en: 'Sampled Data', zh: '抽样结果' })}
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center max-w-4xl">
              {selected.map((idx, i) => {
                const ball = balls[idx]
                const isDuplicate = selected.indexOf(idx) !== i
                return (
                  <motion.div
                    key={`s-${i}`}
                    initial={{ opacity: 0, scale: 0, y: -30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      type: 'spring' as const,
                      stiffness: 400,
                      damping: 20,
                      delay: i * 0.04,
                    }}
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium relative"
                    style={{
                      background: ball.color,
                      color: '#FAFAF7',
                      fontFamily: 'var(--font-mono)',
                      boxShadow: `0 0 8px ${ball.color}40`,
                    }}
                  >
                    {ball.label}
                    {isDuplicate && (
                      <div
                        className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold"
                        style={{ background: '#FAFAF7', color: ball.color, border: `1px solid ${ball.color}` }}
                      >
                        +
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Stats */}
            <div className="flex gap-6 justify-center mt-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm"
                style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
              >
                {uniqueCount}/{dataSize} {t({ en: 'unique', zh: '唯一' })} ({((uniqueCount / dataSize) * 100).toFixed(1)}%)
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-sm"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {oob.length} {t({ en: 'not picked (Out-of-Bag)', zh: '未被选中（袋外样本）' })}
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
