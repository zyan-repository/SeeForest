import { motion } from 'framer-motion'
import { useT } from '../../hooks/useT'

const ORIGINAL_ACC = 92

const FEATURES = [
  { feature: 'Outlook', shuffledAcc: 57.8, color: '#2D6A4F' },
  { feature: 'Humidity', shuffledAcc: 65.2, color: '#1B7A3D' },
  { feature: 'Wind', shuffledAcc: 70.5, color: '#B07D2B' },
  { feature: 'Temperature', shuffledAcc: 74.5, color: '#8B4513' },
]

interface Props {
  step?: number  // 0=baseline, 1-4=shuffle each feature, 5=rank
}

export function FeatureImportanceChart({ step = 0 }: Props) {
  const t = useT()

  // step 5: sort by importance
  const display = step >= 5
    ? [...FEATURES].sort((a, b) => a.shuffledAcc - b.shuffledAcc)
    : FEATURES

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Accuracy meter */}
      <div className="flex items-center gap-4 mb-2">
        <span className="text-sm shrink-0" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          {t({ en: 'Accuracy', zh: '准确率' })}
        </span>
        <div className="flex-1 h-6 rounded-full overflow-hidden relative" style={{ background: 'rgba(213,208,200,0.4)' }}>
          {/* Original accuracy bar */}
          <motion.div
            className="h-full rounded-full absolute left-0 top-0"
            style={{ background: 'var(--accent)' }}
            animate={{
              width: step === 0 ? `${ORIGINAL_ACC}%`
                : step <= 4 ? `${FEATURES[step - 1].shuffledAcc}%`
                : `${ORIGINAL_ACC}%`,
            }}
            transition={{ type: 'spring', stiffness: 80, damping: 18 }}
          />
        </div>
        <motion.span
          className="text-lg font-bold tabular-nums w-16 text-right"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
          key={step}
        >
          {step === 0 ? `${ORIGINAL_ACC}%`
            : step <= 4 ? `${FEATURES[step - 1].shuffledAcc}%`
            : `${ORIGINAL_ACC}%`}
        </motion.span>
      </div>

      {/* Current action label */}
      <motion.div
        key={step}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-sm py-2 rounded-lg"
        style={{
          fontFamily: 'var(--font-mono)',
          color: step === 0 ? 'var(--accent)' : step <= 4 ? FEATURES[step - 1].color : 'var(--accent)',
          background: step === 0 ? 'rgba(27,122,61,0.06)' : step <= 4 ? `${FEATURES[step - 1].color}10` : 'rgba(27,122,61,0.06)',
        }}
      >
        {step === 0 && t({ en: 'All features intact -- baseline accuracy', zh: '所有特征完好——基准准确率' })}
        {step >= 1 && step <= 4 && t({
          en: `Shuffle "${FEATURES[step - 1].feature}" → accuracy drops by ${(ORIGINAL_ACC - FEATURES[step - 1].shuffledAcc).toFixed(1)}%`,
          zh: `打乱"${FEATURES[step - 1].feature}"列 → 准确率下降了 ${(ORIGINAL_ACC - FEATURES[step - 1].shuffledAcc).toFixed(1)}%`,
        })}
        {step >= 5 && t({ en: 'Rank by drop = Feature Importance!', zh: '按下降幅度排序 = 特征重要性！' })}
      </motion.div>

      {/* Feature table showing shuffle state */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid rgba(213,208,200,0.6)' }}>
        {/* Header */}
        <div className="flex text-xs uppercase tracking-wider py-2 px-3"
          style={{ background: 'rgba(242,240,235,0.5)', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          <span className="w-28">{t({ en: 'Feature', zh: '特征' })}</span>
          <span className="flex-1 text-center">{t({ en: 'Status', zh: '状态' })}</span>
          <span className="w-28 text-right">{t({ en: 'Acc. Drop', zh: '准确率下降' })}</span>
        </div>

        {display.map((item) => {
          const isShuffled = step >= 1 && step <= 4 && step - 1 === FEATURES.indexOf(item)
          const wasShuffled = step >= 5 || (step > FEATURES.indexOf(item) + 1)
          const drop = ORIGINAL_ACC - item.shuffledAcc

          return (
            <motion.div
              key={item.feature}
              layout
              transition={{ type: 'spring', stiffness: 200, damping: 25 }}
              className="flex items-center py-3 px-3"
              style={{
                borderTop: '1px solid rgba(213,208,200,0.3)',
                background: isShuffled ? `${item.color}08` : 'transparent',
              }}
            >
              {/* Feature name */}
              <span
                className="w-28 text-base font-semibold shrink-0"
                style={{ fontFamily: 'var(--font-mono)', color: (isShuffled || wasShuffled) ? item.color : 'var(--text-secondary)' }}
              >
                {item.feature}
              </span>

              {/* Status indicator */}
              <div className="flex-1 flex justify-center">
                {isShuffled ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex items-center gap-2 px-3 py-1 rounded-md"
                    style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                  >
                    <motion.span
                      animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
                      transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1 }}
                      className="text-base"
                    >
                      🔀
                    </motion.span>
                    <span className="text-sm font-medium" style={{ color: item.color, fontFamily: 'var(--font-mono)' }}>
                      {t({ en: 'SHUFFLED', zh: '已打乱' })}
                    </span>
                  </motion.div>
                ) : wasShuffled ? (
                  <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {t({ en: 'tested', zh: '已测试' })}
                  </span>
                ) : (
                  <span className="text-sm" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                    {t({ en: 'intact', zh: '完好' })}
                  </span>
                )}
              </div>

              {/* Drop amount */}
              <div className="w-28 text-right">
                {(isShuffled || wasShuffled) ? (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex flex-col items-end"
                  >
                    <span className="text-base font-bold tabular-nums" style={{ fontFamily: 'var(--font-mono)', color: item.color }}>
                      -{drop.toFixed(1)}%
                    </span>
                    {/* Importance bar */}
                    <div className="w-full h-1.5 rounded-full mt-1" style={{ background: 'rgba(213,208,200,0.4)' }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(drop / (ORIGINAL_ACC - 57.8)) * 100}%` }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 80, damping: 18 }}
                        className="h-full rounded-full"
                        style={{ background: item.color }}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>—</span>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
