import { useMemo, useRef, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Tree3D } from './Tree3D'
import { usePresentation, getCurrentPresenter } from '../../store/usePresentation'
import { TOTAL_SLIDES } from '../../data/slideConfig'
import type { Presenter } from '../../types'

function generateTreePositions(count: number, spread: number, seed: number): Array<{
  position: [number, number, number]
  scale: number
  color: string
}> {
  const trees: Array<{ position: [number, number, number]; scale: number; color: string }> = []
  const colors = ['#2D6A4F', '#3A7D5E', '#1B7A3D', '#4A8B5E', '#2D8A4E']

  for (let i = 0; i < count; i++) {
    const pseudoRandom = (n: number) => {
      const x = Math.sin(n * 12.9898 + seed * 78.233) * 43758.5453
      return x - Math.floor(x)
    }

    const angle = pseudoRandom(i * 3) * Math.PI * 2
    const radius = 2 + pseudoRandom(i * 7) * spread
    const x = Math.cos(angle) * radius
    const z = -2 - pseudoRandom(i * 11) * 8

    trees.push({
      position: [x, -1.5, z],
      scale: 0.4 + pseudoRandom(i * 13) * 0.6,
      color: colors[Math.floor(pseudoRandom(i * 17) * colors.length)],
    })
  }

  return trees
}

const PRESENTER_LIGHT_COLORS: Record<Presenter, string> = {
  1: '#2D6A4F', // deep teal
  2: '#B07D2B', // amber gold
  3: '#8B4513', // saddle brown
}

function CameraDrift({ slideIndex }: { slideIndex: number }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 1 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    // Slide-based camera drift
    const baseDriftX = Math.sin(slideIndex * 0.18) * 0.6
    const baseDriftY = 1 + Math.cos(slideIndex * 0.12) * 0.15

    // Mouse parallax
    const parallaxX = mouseRef.current.x * 0.3
    const parallaxY = mouseRef.current.y * -0.15

    targetRef.current.x = baseDriftX + parallaxX
    targetRef.current.y = baseDriftY + parallaxY

    // Smooth lerp
    camera.position.x += (targetRef.current.x - camera.position.x) * 0.02
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.02
  })

  return null
}

function ForestContent({ density, presenter, slideIndex }: { density: number; presenter: Presenter; slideIndex: number }) {
  const trees = useMemo(() => generateTreePositions(density, 6, 42), [density])
  const lightColor = PRESENTER_LIGHT_COLORS[presenter]

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 3]} intensity={0.8} color="#FFF8E7" />
      <pointLight position={[-3, 4, -2]} intensity={0.2} color={lightColor} />
      <fog attach="fog" args={['#FAFAF7', 5, 18]} />
      <CameraDrift slideIndex={slideIndex} />

      {trees.map((tree, i) => (
        <Tree3D
          key={i}
          position={tree.position}
          scale={tree.scale}
          color={tree.color}
          swaySpeed={0.3 + (i % 5) * 0.1}
        />
      ))}
    </>
  )
}

interface ForestSceneProps {
  className?: string
}

export function ForestScene({ className = '' }: ForestSceneProps) {
  const currentSlide = usePresentation(s => s.currentSlide)
  const presenter = getCurrentPresenter(currentSlide)

  const isBookendSlide = currentSlide === 0 || currentSlide === TOTAL_SLIDES - 1
  const opacity = isBookendSlide ? 0.35 : 0.06

  const density = presenter === 1 ? 8 : presenter === 2 ? 15 : 25

  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        opacity,
        transition: 'opacity 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        camera={{ position: [0, 1, 6], fov: 50 }}
        dpr={[1, 1.5]}
        frameloop="always"
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', pointerEvents: 'auto' }}
      >
        <ForestContent density={density} presenter={presenter} slideIndex={currentSlide} />
      </Canvas>
    </div>
  )
}
