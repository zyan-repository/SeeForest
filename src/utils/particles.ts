export interface Particle {
  readonly x: number
  readonly y: number
  readonly size: number
  readonly opacity: number
  readonly delay: number
  readonly duration: number
}

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return (s - 1) / 2147483646
  }
}

export function generateParticles(
  count: number,
  seed: number = 42,
  options: {
    minSize?: number
    maxSize?: number
    minOpacity?: number
    maxOpacity?: number
    minDuration?: number
    maxDuration?: number
  } = {},
): readonly Particle[] {
  const {
    minSize = 2,
    maxSize = 6,
    minOpacity = 0.1,
    maxOpacity = 0.4,
    minDuration = 3,
    maxDuration = 8,
  } = options

  const rand = seededRandom(seed)
  const particles: Particle[] = []

  for (let i = 0; i < count; i++) {
    particles.push({
      x: rand() * 100,
      y: rand() * 100,
      size: minSize + rand() * (maxSize - minSize),
      opacity: minOpacity + rand() * (maxOpacity - minOpacity),
      delay: rand() * 2,
      duration: minDuration + rand() * (maxDuration - minDuration),
    })
  }

  return particles
}
