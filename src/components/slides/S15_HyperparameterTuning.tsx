import { useState, useMemo, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { SlideBase, SlideHeading, NarrativePanel, TwoColumnSlide, SlideColumn } from './SlideBase'
import { useT } from '../../hooks/useT'
import { SLIDE_TEXT } from '../../data/i18n/slides'
import { NARRATIVES } from '../../data/i18n/narratives'

// Pre-computed accuracy for different parameter combos (simulated)
function computeAccuracy(nEst: number, maxDepth: number, maxFeat: number): number {
  const estFactor = 1 - Math.exp(-nEst / 30)
  const depthFactor = maxDepth <= 3 ? 0.7 + maxDepth * 0.05 : maxDepth <= 10 ? 0.92 : 0.92 - (maxDepth - 10) * 0.008
  const featFactor = maxFeat === 1 ? 0.75 : maxFeat === 2 ? 0.92 : maxFeat === 3 ? 0.95 : 0.93
  return Math.min(0.98, estFactor * depthFactor * featFactor)
}

// Generate simple 2D boundary points
function generateBoundary(nEst: number, maxDepth: number, maxFeat: number): Array<{ x: number; y: number; cls: number }> {
  const points: Array<{ x: number; y: number; cls: number }> = []
  const resolution = 20
  for (let i = 0; i < resolution; i++) {
    for (let j = 0; j < resolution; j++) {
      const x = i / resolution
      const y = j / resolution
      const complexity = maxDepth / 20
      const smoothness = Math.min(nEst / 100, 1)
      const noise = Math.sin(x * 10 * complexity) * 0.1 * (1 - smoothness)
      const boundary = 0.3 + 0.4 * x + noise + (maxFeat > 2 ? 0.1 * Math.sin(y * 8) : 0)
      points.push({ x, y, cls: y > boundary ? 1 : 0 })
    }
  }
  return points
}

const SAMPLE_POINTS = [
  { x: 0.2, y: 0.8, cls: 1 }, { x: 0.3, y: 0.7, cls: 1 }, { x: 0.15, y: 0.9, cls: 1 },
  { x: 0.4, y: 0.6, cls: 1 }, { x: 0.5, y: 0.75, cls: 1 }, { x: 0.6, y: 0.85, cls: 1 },
  { x: 0.8, y: 0.2, cls: 0 }, { x: 0.7, y: 0.3, cls: 0 }, { x: 0.9, y: 0.15, cls: 0 },
  { x: 0.6, y: 0.4, cls: 0 }, { x: 0.85, y: 0.35, cls: 0 }, { x: 0.75, y: 0.1, cls: 0 },
]

// Canvas-based heatmap for smooth boundary rendering
function BoundaryCanvas({ boundary, width, height }: {
  boundary: Array<{ x: number; y: number; cls: number }>
  width: number
  height: number
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    const resolution = 20
    const cellW = width / resolution
    const cellH = height / resolution

    boundary.forEach((p) => {
      const px = p.x * width
      const py = p.y * height
      ctx.fillStyle = p.cls === 1
        ? 'rgba(27,122,61,0.15)'
        : 'rgba(56,189,248,0.14)'
      ctx.fillRect(px, py, cellW + 1, cellH + 1)
    })
  }, [boundary, width, height])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ transition: 'opacity 0.3s', imageRendering: 'auto' }}
    />
  )
}

export default function S15_HyperparameterTuning() {
  const t = useT()
  const [nEstimators, setNEstimators] = useState(50)
  const [maxDepth, setMaxDepth] = useState(8)
  const [maxFeatures, setMaxFeatures] = useState(2)

  const accuracy = useMemo(
    () => computeAccuracy(nEstimators, maxDepth, maxFeatures),
    [nEstimators, maxDepth, maxFeatures],
  )

  const boundary = useMemo(
    () => generateBoundary(nEstimators, maxDepth, maxFeatures),
    [nEstimators, maxDepth, maxFeatures],
  )

  // Check if sample points are misclassified
  const pointStatuses = useMemo(() => {
    return SAMPLE_POINTS.map((pt) => {
      // Find nearest boundary cell
      const resolution = 20
      const bx = Math.min(Math.floor(pt.x * resolution), resolution - 1)
      const by = Math.min(Math.floor(pt.y * resolution), resolution - 1)
      const idx = bx * resolution + by
      const predicted = boundary[idx]?.cls ?? 0
      return { ...pt, misclassified: predicted !== pt.cls }
    })
  }, [boundary])

  return (
    <SlideBase>
      <SlideHeading>{t(SLIDE_TEXT.hyperparams.heading)}</SlideHeading>

      <TwoColumnSlide>
        <SlideColumn>
          <NarrativePanel delay={0.4}>
            {t(NARRATIVES.hyperparams.paragraphs[0])}
            {' '}
            {t(NARRATIVES.hyperparams.paragraphs[1])}
          </NarrativePanel>

          <NarrativePanel variant="insight" delay={0.6}>
            {t(NARRATIVES.hyperparams.callouts![0])}
          </NarrativePanel>
        </SlideColumn>

        <SlideColumn>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25, delay: 0.3 }}
            className="flex flex-col gap-5"
          >
            {/* Sliders panel */}
            <div className="flex flex-col gap-5">
              <SliderControl
                label={t(SLIDE_TEXT.hyperparams.nEstimators)}
                value={nEstimators}
                min={1}
                max={200}
                onChange={setNEstimators}
              />
              <SliderControl
                label={t(SLIDE_TEXT.hyperparams.maxDepth)}
                value={maxDepth}
                min={1}
                max={20}
                onChange={setMaxDepth}
              />
              <SliderControl
                label={t(SLIDE_TEXT.hyperparams.maxFeatures)}
                value={maxFeatures}
                min={1}
                max={4}
                onChange={setMaxFeatures}
              />

              {/* Accuracy readout */}
              <div className="mt-2 pt-4" style={{ borderTop: '1px solid var(--border)' }}>
                <div className="flex justify-between items-baseline">
                  <span className="text-sm uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    OOB Accuracy
                  </span>
                  <span
                    className="text-3xl tabular-nums font-medium"
                    style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
                  >
                    {(accuracy * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border)' }}>
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: 'var(--accent)' }}
                    animate={{ width: `${accuracy * 100}%` }}
                    transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                  />
                </div>
              </div>
            </div>

            {/* Decision boundary visualization */}
            <div
              className="w-full rounded-lg overflow-hidden relative"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                aspectRatio: '1',
                maxHeight: '280px',
              }}
            >
              {/* Canvas heatmap */}
              <BoundaryCanvas boundary={boundary} width={280} height={280} />

              {/* SVG overlay for data points */}
              <svg viewBox="0 0 1 1" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
                {pointStatuses.map((pt, i) => (
                  <g key={`pt-${i}`}>
                    {/* Pulse ring for misclassified */}
                    {pt.misclassified && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={0.04}
                        fill="none"
                        stroke={pt.cls === 1 ? '#1B7A3D' : '#B07D2B'}
                        strokeWidth={0.003}
                        opacity={0.5}
                      >
                        <animate
                          attributeName="r"
                          values="0.024;0.05;0.024"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="opacity"
                          values="0.6;0.1;0.6"
                          dur="1.5s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    )}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={0.024}
                      fill={pt.cls === 1 ? '#1B7A3D' : '#B07D2B'}
                      stroke={pt.misclassified ? '#f87171' : (pt.cls === 1 ? '#1B7A3D' : '#B07D2B')}
                      strokeWidth={pt.misclassified ? 0.006 : 0.004}
                      fillOpacity={0.8}
                    />
                  </g>
                ))}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[11px]" style={{ fontFamily: 'var(--font-mono)' }}>
                <span style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  {t({ en: 'Simulated data', zh: '模拟数据' })}
                </span>
                <div className="flex gap-3">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#1B7A3D' }} />
                    <span style={{ color: 'var(--text-muted)' }}>Yes</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: '#B07D2B' }} />
                    <span style={{ color: 'var(--text-muted)' }}>No</span>
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </SlideColumn>
      </TwoColumnSlide>
    </SlideBase>
  )
}

function SliderControl({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (v: number) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-baseline">
        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{label}</span>
        <span
          className="text-sm tabular-nums"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}
        >
          {value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
