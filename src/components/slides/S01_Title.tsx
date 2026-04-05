import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { SlideBase, SlideDescription, NarrativePanel } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

const TITLE = 'SeeForest'

const letterVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 20,
      delay: 0.3 + i * 0.07,
    },
  }),
}

function seededRandom(seed: number) {
  let s = seed
  return () => {
    s = (s * 16807) % 2147483647
    return s / 2147483647
  }
}

const PARTICLE_COUNT = 36

function generateParticles(count: number) {
  const rand = seededRandom(314)
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: rand() * 100,
    size: 2 + rand() * 3,
    duration: 6 + rand() * 8,
    delay: rand() * 6,
    opacity: 0.15 + rand() * 0.35,
    drift: -10 + rand() * 20,
  }))
}

function ParticleField() {
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '-5%',
            width: p.size,
            height: p.size,
            background: 'var(--accent)',
            boxShadow: `0 0 ${p.size * 2}px var(--accent)`,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.1],
            x: [0, p.drift],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

export default function S01_Title() {
  const t = useT()

  return (
    <SlideBase>
      <ParticleField />

      <div className="relative flex flex-col items-center gap-6" style={{ zIndex: 1 }}>
        {/* Glow backdrop */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse, rgba(27,122,61,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <h1
          className="text-[9rem] font-bold tracking-tighter leading-none select-none relative"
          style={{ fontFamily: 'Inter, sans-serif' }}
          aria-label={TITLE}
        >
          {TITLE.split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              custom={i}
              variants={letterVariants}
              initial="hidden"
              animate="visible"
              className="inline-block"
              style={{ color: i >= 3 ? 'var(--accent)' : 'var(--text-primary)' }}
            >
              {char}
            </motion.span>
          ))}
        </h1>

        <SlideDescription delay={1.0}>
          {t(SLIDE_TEXT.title.subtitle)}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: 'reverse' }}
            className="inline-block ml-0.5"
            style={{ color: 'var(--accent)' }}
          >
            |
          </motion.span>
        </SlideDescription>

        <NarrativePanel delay={1.2} className="mt-6 max-w-2xl text-center">
          <p>{t(NARRATIVES.title.paragraphs[0])}</p>
          {NARRATIVES.title.callouts && (
            <p className="mt-2 font-medium" style={{ color: 'var(--accent)' }}>
              {t(NARRATIVES.title.callouts[0])}
            </p>
          )}
        </NarrativePanel>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="text-base mt-8"
          style={{ color: 'var(--text-secondary)', fontFamily: 'JetBrains Mono, monospace' }}
        >
          {t(SLIDE_TEXT.title.group)}
        </motion.span>
      </div>
    </SlideBase>
  )
}
