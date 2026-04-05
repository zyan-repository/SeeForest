import { useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '../../hooks/useT'

const TRUE_VALUE = 50
const SPREAD = 35
const DOT_COUNT = 80

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

function gaussianRandom(mean: number, std: number, rand: () => number): number {
  const u1 = rand()
  const u2 = rand()
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2)
  return mean + z * std
}

function computeStackedPositions(guesses: Array<{ id: number; value: number; x: number; y: number }>) {
  const binWidth = 3
  const bins = new Map<number, number>()

  return guesses.map((g) => {
    const binKey = Math.round(g.value / binWidth)
    const count = bins.get(binKey) ?? 0
    bins.set(binKey, count + 1)
    return { ...g, stackOffset: count }
  })
}

interface CrowdWisdomVizProps {
  step?: number
}

export function CrowdWisdomViz({ step = 0 }: CrowdWisdomVizProps) {
  const t = useT()
  const revealed = step >= 1
  const showAverage = step >= 2

  const guesses = useMemo(() => {
    const rand = seededRandom(42)
    return Array.from({ length: DOT_COUNT }, (_, i) => ({
      id: i,
      value: gaussianRandom(TRUE_VALUE, SPREAD, rand),
      x: 0.05 + rand() * 0.9,
      y: 0.1 + rand() * 0.8,
    }))
  }, [])

  const stackedGuesses = useMemo(() => computeStackedPositions(guesses), [guesses])

  const average = useMemo(
    () => guesses.reduce((sum, g) => sum + g.value, 0) / guesses.length,
    [guesses],
  )

  const toX = (value: number) => ((value - (TRUE_VALUE - 60)) / 120) * 100

  return (
    <div className="w-full max-w-5xl flex flex-col items-center gap-4">
      <div className="w-full relative h-[380px]">
        {/* Axis */}
        <div
          className="absolute bottom-8 left-0 right-0 h-px"
          style={{ background: 'rgba(213,208,200,0.6)' }}
        />
        {/* True value marker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showAverage ? 1 : 0.3 }}
          className="absolute"
          style={{
            left: `${toX(TRUE_VALUE)}%`,
            bottom: '0px',
            transform: 'translateX(-50%)',
          }}
        >
          <div
            className="w-px h-5"
            style={{ background: showAverage ? 'var(--accent)' : 'rgba(138,154,138,1)' }}
          />
          <span
            className="text-xs mt-0.5 block text-center whitespace-nowrap"
            style={{
              fontFamily: 'var(--font-mono)',
              color: showAverage ? 'var(--accent)' : 'rgba(138,154,138,1)',
            }}
          >
            {t({ en: 'True', zh: '真实值' })}: {TRUE_VALUE}
          </span>
        </motion.div>

        {/* Dots */}
        {stackedGuesses.map((guess, i) => {
          const scatterX = guess.x * 100
          const scatterY = guess.y * 100
          const lineX = toX(guess.value)
          const dotSize = 14
          const lineBaseY = 85
          const stackPx = guess.stackOffset * (dotSize + 2)

          return (
            <motion.div
              key={guess.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: revealed ? 0.75 : 0.8,
                scale: 1,
                left: revealed ? `${lineX}%` : `${scatterX}%`,
                top: revealed ? `calc(${lineBaseY}% - ${stackPx}px)` : `${scatterY}%`,
              }}
              transition={{
                opacity: { delay: i * 0.01 },
                scale: { type: 'spring' as const, stiffness: 400, damping: 20, delay: i * 0.01 },
                left: { type: 'spring' as const, stiffness: 80, damping: 15, delay: i * 0.008 },
                top: { type: 'spring' as const, stiffness: 80, damping: 15, delay: i * 0.008 },
              }}
              className="absolute w-3.5 h-3.5 rounded-full -translate-x-1/2 -translate-y-1/2"
              style={{
                background: '#2D6A4F',
                boxShadow: '0 0 6px #2D6A4F30',
              }}
            />
          )
        })}

        {/* Average line */}
        <AnimatePresence>
          {showAverage && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              className="absolute bottom-8 origin-bottom"
              style={{
                left: `${toX(average)}%`,
                transform: 'translateX(-50%)',
              }}
            >
              <div
                className="w-0.5 h-[260px]"
                style={{
                  background: 'linear-gradient(to top, var(--accent), transparent)',
                }}
              />
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap"
              >
                <span
                  className="text-sm font-medium px-2 py-0.5 rounded"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--accent)',
                    background: 'rgba(27,122,61,0.15)',
                  }}
                >
                  {t({ en: 'Avg', zh: '均值' })}: {average.toFixed(1)}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Insight - replaces the button */}
      <AnimatePresence>
        {showAverage && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ delay: 0.3 }}
            className="text-center"
          >
            <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
              {t({ en: 'Error of average:', zh: '平均值误差：' })}{' '}
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>
                {Math.abs(average - TRUE_VALUE).toFixed(1)}
              </span>
              {' '}{t({ en: 'vs typical individual error:', zh: '对比个体平均误差：' })}{' '}
              <span style={{ fontFamily: 'var(--font-mono)', color: '#2D6A4F' }}>
                {(guesses.reduce((s, g) => s + Math.abs(g.value - TRUE_VALUE), 0) / guesses.length).toFixed(1)}
              </span>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
