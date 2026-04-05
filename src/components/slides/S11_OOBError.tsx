import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SlideBase, SlideHeading, SlideBridge, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { usePresentation } from '../../store/usePresentation'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'
import { FormulaCard } from '../ui/FormulaCard'

const TREES = [
  { id: 1, trainIdx: [0,1,2,3,4,5,6,7,8,9], oobIdx: [10,11,12,13], oobCorrect: [true, true, false, true] },
  { id: 2, trainIdx: [0,2,3,5,6,8,10,11,12,13], oobIdx: [1,4,7,9], oobCorrect: [true, true, true, false] },
  { id: 3, trainIdx: [1,3,4,6,7,9,10,12,13,0], oobIdx: [2,5,8,11], oobCorrect: [true, false, true, true] },
]

export default function S11_OOBError() {
  const t = useT()
  const subStep = usePresentation(s => s.subStep)
  const [activeTree, setActiveTree] = useState(-1)
  const [showAggregate, setShowAggregate] = useState(false)

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []
    TREES.forEach((_, i) => {
      timers.push(setTimeout(() => setActiveTree(i), 800 + i * 1500))
    })
    timers.push(setTimeout(() => setShowAggregate(true), 800 + TREES.length * 1500 + 500))
    return () => timers.forEach(clearTimeout)
  }, [])

  const totalOOB = TREES.reduce((s, tree) => s + tree.oobCorrect.length, 0)
  const totalCorrect = TREES.reduce((s, tree) => s + tree.oobCorrect.filter(Boolean).length, 0)
  const oobAccuracy = totalCorrect / totalOOB

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.oob.heading)}</SlideHeading>
      <TwoColumnSlide>
        <SlideColumn>
          <div style={{ minHeight: 160 }}>
          <AnimatePresence mode="popLayout">
            {subStep === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <NarrativePanel delay={0.3}>
                  {t(NARRATIVES['oob-error'].paragraphs[0])}
                </NarrativePanel>
                <NarrativePanel delay={0.5}>
                  {t(NARRATIVES['oob-error'].paragraphs[1])}
                </NarrativePanel>
              </motion.div>
            )}
            {subStep === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-4">
                <FormulaCard
                  label={t({ en: 'OOB Error = misclassifications on unseen samples', zh: '袋外误差 = 在未见样本上的错误率' })}
                  formula="OOB Error = errors / total OOB predictions"
                  delay={0}
                />
                <NarrativePanel variant="insight" delay={0}>
                  {t({ en: 'No separate test set needed -- the out-of-bag samples give us a free accuracy estimate!', zh: '不需要单独的测试集——袋外样本免费提供了准确率估计！' })}
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
            className="w-full max-w-5xl"
          >
            <div className="flex flex-col gap-5">
              {TREES.map((tree, treeIdx) => {
                const isActive = activeTree >= treeIdx
                const errorRate = 1 - tree.oobCorrect.filter(Boolean).length / tree.oobCorrect.length

                return (
                  <motion.div
                    key={tree.id}
                    animate={{ opacity: isActive ? 1 : 0.3 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-4"
                  >
                    {/* Tree label */}
                    <span
                      className="w-12 text-sm shrink-0"
                      style={{ fontFamily: 'var(--font-mono)', color: isActive ? 'var(--accent)' : 'var(--text-muted)' }}
                    >
                      T{tree.id}
                    </span>

                    {/* Sample grid */}
                    <div className="grid grid-cols-7 gap-1.5 flex-1">
                      {Array.from({ length: 14 }, (_, i) => {
                        const isOOB = tree.oobIdx.includes(i)
                        const oobIndex = tree.oobIdx.indexOf(i)
                        const isCorrect = isOOB && oobIndex >= 0 ? tree.oobCorrect[oobIndex] : undefined

                        return (
                          <motion.div
                            key={i}
                            animate={{
                              scale: isActive && isOOB ? 1.15 : 1,
                            }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className="w-7 h-7 rounded-sm flex items-center justify-center text-xs"
                            style={{
                              background: isOOB
                                ? (isActive
                                  ? (isCorrect ? 'rgba(27,122,61,0.15)' : 'rgba(248,113,113,0.2)')
                                  : 'rgba(213,208,200,0.15)')
                                : 'rgba(27,122,61,0.06)',
                              border: `1px solid ${
                                isOOB
                                  ? (isActive
                                    ? (isCorrect ? 'rgba(27,122,61,0.4)' : 'rgba(248,113,113,0.5)')
                                    : 'rgba(213,208,200,0.6)')
                                  : 'rgba(27,122,61,0.12)'
                              }`,
                              fontFamily: 'var(--font-mono)',
                              color: isActive && isOOB
                                ? (isCorrect ? 'var(--accent)' : 'var(--color-red-400)')
                                : 'transparent',
                            }}
                          >
                            {isActive && isOOB ? (isCorrect ? '\u2713' : '\u2717') : ''}
                          </motion.div>
                        )
                      })}
                    </div>

                    {/* Error rate */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                          className="text-sm w-16 text-right tabular-nums"
                          style={{ fontFamily: 'var(--font-mono)', color: errorRate > 0 ? 'var(--color-red-400)' : 'var(--accent)' }}
                        >
                          err: {(errorRate * 100).toFixed(0)}%
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )
              })}
            </div>

            {/* Aggregate result */}
            <AnimatePresence>
              {showAggregate && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  className="mt-8 pt-4 flex items-center justify-between"
                  style={{ borderTop: '1px solid var(--border)' }}
                >
                  <span className="text-base" style={{ color: 'var(--text-secondary)' }}>
                    Aggregate OOB Accuracy
                  </span>
                  <span
                    className="text-2xl font-medium tabular-nums"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
                  >
                    {(oobAccuracy * 100).toFixed(1)}%
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="flex gap-5 mt-4 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(27,122,61,0.06)', border: '1px solid rgba(27,122,61,0.12)' }} />
                <span style={{ color: 'var(--text-muted)' }}>training</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(27,122,61,0.15)', border: '1px solid rgba(27,122,61,0.4)' }} />
                <span style={{ color: 'var(--accent)' }}>OOB correct</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm" style={{ background: 'rgba(248,113,113,0.2)', border: '1px solid rgba(248,113,113,0.5)' }} />
                <span style={{ color: 'var(--color-red-400)' }}>OOB wrong</span>
              </span>
            </div>
          </motion.div>
        </SlideColumn>
      </TwoColumnSlide>

      <SlideBridge>{t(SLIDE_TEXT.oob.bridge)}</SlideBridge>
    </SlideBase>
  )
}
