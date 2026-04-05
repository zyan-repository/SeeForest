import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Mesh } from 'three'

interface Tree3DProps {
  position: [number, number, number]
  scale?: number
  color?: string
  swaySpeed?: number
}

export function Tree3D({ position, scale = 1, color = '#2D6A4F', swaySpeed = 0.5 }: Tree3DProps) {
  const groupRef = useRef<Mesh>(null)
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * swaySpeed + phase) * 0.015
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.6, 0]} ref={groupRef}>
        <cylinderGeometry args={[0.04, 0.08, 1.2, 6]} />
        <meshStandardMaterial color="#6B4226" />

        {/* Canopy - stacked cones for low-poly look */}
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.5, 1.0, 6]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.85}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0, 1.3, 0]}>
          <coneGeometry args={[0.38, 0.8, 6]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.85}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <coneGeometry args={[0.25, 0.6, 6]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={0.85}
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </mesh>
    </group>
  )
}
