import type { BootstrapSample } from '../types'

function seededRandom(seed: number): () => number {
  let s = seed
  return () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }
}

export function createBootstrapSample(dataSize: number, seed: number): BootstrapSample {
  const random = seededRandom(seed)
  const indices: number[] = []
  const selected = new Set<number>()

  for (let i = 0; i < dataSize; i++) {
    const idx = Math.floor(random() * dataSize)
    indices.push(idx)
    selected.add(idx)
  }

  const oobIndices: number[] = []
  for (let i = 0; i < dataSize; i++) {
    if (!selected.has(i)) {
      oobIndices.push(i)
    }
  }

  return { indices, oobIndices }
}

export function bootstrapUniqueRatio(dataSize: number): number {
  return 1 - Math.pow(1 - 1 / dataSize, dataSize)
}
