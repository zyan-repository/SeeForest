import { motion } from 'framer-motion'

interface CodePanelProps {
  code: string
  language?: string
  activeLine?: number
  delay?: number
  className?: string
}

export function CodePanel({ code, activeLine, delay = 0.3, className = '' }: CodePanelProps) {
  const lines = code.split('\n')

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay }}
      className={`rounded-xl overflow-hidden ${className}`}
      style={{
        background: '#F0EDE6',
        border: '1px solid rgba(213,208,200,0.6)',
      }}
    >
      <div className="px-4 py-2 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(213,208,200,0.6)' }}>
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#C0392B', opacity: 0.6 }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#B07D2B', opacity: 0.6 }} />
        <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#2D8A4E', opacity: 0.6 }} />
        <span className="ml-2 text-xs" style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
          Python
        </span>
      </div>
      <pre className="px-4 py-3 overflow-x-auto text-sm leading-relaxed">
        {lines.map((line, i) => {
          const isActive = activeLine === i + 1
          return (
            <div
              key={i}
              className="flex"
              style={{
                background: isActive ? 'rgba(27,122,61,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--accent)' : '2px solid transparent',
                paddingLeft: '8px',
                marginLeft: '-10px',
                transition: 'all 0.2s ease',
              }}
            >
              <span
                className="select-none w-8 text-right mr-4 shrink-0"
                style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
              >
                {i + 1}
              </span>
              <code style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                {line || ' '}
              </code>
            </div>
          )
        })}
      </pre>
    </motion.div>
  )
}
