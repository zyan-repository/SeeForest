import { motion } from 'framer-motion'

interface SlideBaseProps {
  children: React.ReactNode
  className?: string
}

export function SlideBase({ children, className = '' }: SlideBaseProps) {
  return (
    <div className={`w-full h-full flex flex-col items-center px-10 overflow-hidden ${className}`} style={{ paddingTop: '12vh', paddingBottom: '5vh' }}>
      {children}
    </div>
  )
}

export function SlideHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.1 }}
      className="text-5xl font-semibold tracking-tight text-center w-full shrink-0"
      style={{ color: 'var(--text-primary)', letterSpacing: '-0.02em', marginBottom: '60px' }}
    >
      {children}
    </motion.h1>
  )
}

export function SlideDescription({ children, delay = 0.2 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 25, delay }}
      className="text-lg mt-2 max-w-5xl text-center leading-relaxed shrink-0"
      style={{ color: 'var(--text-secondary)' }}
    >
      {children}
    </motion.p>
  )
}

export function SlideAccent({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ color: 'var(--accent)' }}>{children}</span>
  )
}

export function SlideBridge({ children, delay = 1.5 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.8 }}
      className="absolute bottom-10 text-base italic text-center max-w-3xl"
      style={{ color: 'var(--text-muted)' }}
    >
      {children} <span style={{ color: 'var(--accent)', opacity: 0.6 }}>→</span>
    </motion.p>
  )
}

export function SlideContext({ children, delay = 0.05 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.5 }}
      className="text-sm mb-1 shrink-0"
      style={{ color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}
    >
      {children}
    </motion.p>
  )
}

// --- New components for integrated narrative layout ---

type NarrativeVariant = 'default' | 'insight' | 'warning'

const NARRATIVE_STYLES: Record<NarrativeVariant, { bg: string; border: string; accent: string }> = {
  default: {
    bg: 'rgba(242,240,235,0.7)',
    border: 'rgba(213,208,200,0.6)',
    accent: 'var(--accent)',
  },
  insight: {
    bg: 'rgba(232,245,236,0.6)',
    border: 'rgba(27,122,61,0.2)',
    accent: 'var(--accent)',
  },
  warning: {
    bg: 'rgba(176,125,43,0.06)',
    border: 'rgba(176,125,43,0.2)',
    accent: '#B07D2B',
  },
}

export function NarrativePanel({
  children,
  variant = 'default',
  delay = 0.4,
  className = '',
}: {
  children: React.ReactNode
  variant?: NarrativeVariant
  delay?: number
  className?: string
}) {
  const style = NARRATIVE_STYLES[variant]
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 180, damping: 22, delay }}
      className={`px-6 py-5 rounded-xl text-xl leading-relaxed max-w-4xl ${className}`}
      style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        color: 'var(--text-secondary)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {children}
    </motion.div>
  )
}

export function TwoColumnSlide({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex gap-10 w-full max-w-6xl min-h-0 items-start ${className}`}>
      {children}
    </div>
  )
}

export function SlideColumn({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex-1 flex flex-col gap-4 min-w-0 ${className}`}>
      {children}
    </div>
  )
}
