import { motion } from 'framer-motion'

interface MiniNode {
  readonly x: number
  readonly y: number
  readonly parentX?: number
  readonly parentY?: number
  readonly label: string
  readonly isLeaf: boolean
}

function generateRandomTree(seed: number): MiniNode[] {
  const nodes: MiniNode[] = []
  let s = seed
  const rand = () => {
    s = (s * 16807 + 0) % 2147483647
    return s / 2147483647
  }

  const features = ['Outlook', 'Temp', 'Humid', 'Wind']
  const pick = () => features[Math.floor(rand() * features.length)]

  const build = (x: number, y: number, d: number, px?: number, py?: number) => {
    const isLeaf = d >= 2 || (d >= 1 && rand() < 0.35)
    const label = isLeaf ? (rand() > 0.45 ? 'Y' : 'N') : pick()
    nodes.push({ x, y, parentX: px, parentY: py, isLeaf, label })
    if (!isLeaf) {
      const spread = 70 / (d + 1)
      build(x - spread, y + 90, d + 1, x, y)
      build(x + spread, y + 90, d + 1, x, y)
    }
  }

  build(150, 35, 0)
  return nodes
}

const TREE_COLORS = ['#2D6A4F', '#1B7A3D', '#6B4226', '#8B4513', '#B07D2B']

const TREES = Array.from({ length: 5 }, (_, i) => ({
  id: i,
  color: TREE_COLORS[i],
  nodes: generateRandomTree(42 + i * 137),
}))

export function ForestGrowth() {
  return (
    <div className="w-full flex gap-3 justify-center">
      {TREES.map((tree, treeIdx) => (
        <motion.div
          key={tree.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 20, delay: treeIdx * 0.15 }}
          className="relative rounded-lg overflow-hidden"
          style={{
            width: 240,
            height: 340,
            background: 'rgba(242,240,235,0.85)',
            border: '1px solid rgba(213,208,200,0.6)',
          }}
        >
          <div
            className="absolute top-2 left-0 right-0 text-center text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-mono)', color: tree.color }}
          >
            Tree {tree.id + 1}
          </div>

          <svg viewBox="0 0 300 320" className="w-full h-full" style={{ marginTop: 12 }}>
            {tree.nodes.map((node, i) => {
              if (node.parentX === undefined || node.parentY === undefined) return null
              return (
                <motion.line
                  key={`e-${i}`}
                  x1={node.parentX}
                  y1={node.parentY + 12}
                  x2={node.x}
                  y2={node.y - 12}
                  stroke={tree.color}
                  strokeWidth={1.5}
                  strokeOpacity={0.4}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.4, delay: treeIdx * 0.15 + i * 0.08 }}
                />
              )
            })}

            {tree.nodes.map((node, i) => {
              const w = node.isLeaf ? 44 : 72
              const h = 32
              return (
                <motion.g
                  key={`n-${i}`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: 'spring' as const,
                    stiffness: 300,
                    damping: 18,
                    delay: treeIdx * 0.15 + i * 0.08,
                  }}
                >
                  <rect
                    x={node.x - w / 2}
                    y={node.y - h / 2}
                    width={w}
                    height={h}
                    rx={4}
                    fill={node.isLeaf
                      ? (node.label === 'Y' ? 'rgba(45,138,78,0.15)' : 'rgba(192,57,43,0.12)')
                      : `${tree.color}18`}
                    stroke={node.isLeaf
                      ? (node.label === 'Y' ? '#2D8A4E' : '#C0392B')
                      : tree.color}
                    strokeWidth={1}
                  />
                  <text
                    x={node.x}
                    y={node.y + 6}
                    textAnchor="middle"
                    fill={node.isLeaf
                      ? (node.label === 'Y' ? '#2D8A4E' : '#C0392B')
                      : tree.color}
                    fontSize={15}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight={node.isLeaf ? 700 : 600}
                  >
                    {node.label}
                  </text>
                </motion.g>
              )
            })}
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
