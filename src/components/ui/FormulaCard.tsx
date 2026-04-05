import { motion } from 'framer-motion'

interface FormulaCardProps {
  label: string
  formula: string
  delay?: number
  className?: string
}

export function FormulaCard({ label, formula, delay = 0.3, className = '' }: FormulaCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay }}
      className={`px-5 py-4 rounded-xl ${className}`}
      style={{
        background: '#F7F4EF',
        border: '1px solid rgba(213,208,200,0.6)',
      }}
    >
      <p
        className="text-xs font-medium uppercase tracking-wider mb-2"
        style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}
      >
        {label}
      </p>
      <p
        className="text-lg font-medium"
        style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}
      >
        {formula}
      </p>
    </motion.div>
  )
}
