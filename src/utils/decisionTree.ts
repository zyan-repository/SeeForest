import type { TreeNode, DataPoint } from '../types'
import { giniImpurity } from './gini'

function majorityLabel(data: readonly DataPoint[]): string {
  const counts = new Map<string, number>()
  for (const d of data) {
    counts.set(d.label, (counts.get(d.label) ?? 0) + 1)
  }
  let best = ''
  let bestCount = 0
  for (const [label, count] of counts) {
    if (count > bestCount) {
      best = label
      bestCount = count
    }
  }
  return best
}

function uniqueValues(data: readonly DataPoint[], feature: string): readonly string[] {
  const values = new Set<string>()
  for (const d of data) {
    values.add(String(d.features[feature]))
  }
  return [...values]
}

function bestSplit(
  data: readonly DataPoint[],
  features: readonly string[],
): { feature: string; value: string; gain: number } | null {
  let bestGain = 0
  let bestFeature = ''
  let bestValue = ''

  const parentGini = giniImpurity(data.map(d => d.label))

  for (const feature of features) {
    const values = uniqueValues(data, feature)
    for (const value of values) {
      const left = data.filter(d => String(d.features[feature]) === value)
      const right = data.filter(d => String(d.features[feature]) !== value)

      if (left.length === 0 || right.length === 0) continue

      const leftGini = giniImpurity(left.map(d => d.label))
      const rightGini = giniImpurity(right.map(d => d.label))
      const gain = parentGini
        - (left.length / data.length) * leftGini
        - (right.length / data.length) * rightGini

      if (gain > bestGain) {
        bestGain = gain
        bestFeature = feature
        bestValue = value
      }
    }
  }

  if (bestGain === 0) return null
  return { feature: bestFeature, value: bestValue, gain: bestGain }
}

export function buildTree(
  data: readonly DataPoint[],
  features: readonly string[],
  maxDepth: number = 5,
  depth: number = 0,
): TreeNode {
  if (data.length === 0) {
    return { label: 'Unknown', samples: 0, gini: 0 }
  }

  const labels = data.map(d => d.label)
  const currentGini = giniImpurity(labels)

  if (currentGini === 0 || depth >= maxDepth || features.length === 0) {
    return {
      label: majorityLabel(data),
      samples: data.length,
      gini: currentGini,
    }
  }

  const split = bestSplit(data, features)
  if (!split) {
    return {
      label: majorityLabel(data),
      samples: data.length,
      gini: currentGini,
    }
  }

  const leftData = data.filter(d => String(d.features[split.feature]) === split.value)
  const rightData = data.filter(d => String(d.features[split.feature]) !== split.value)

  return {
    feature: split.feature,
    threshold: undefined,
    samples: data.length,
    gini: currentGini,
    left: buildTree(leftData, features, maxDepth, depth + 1),
    right: buildTree(rightData, features, maxDepth, depth + 1),
  }
}

export function predictTree(node: TreeNode, point: DataPoint): string {
  if (node.label !== undefined && !node.feature) {
    return node.label
  }
  if (!node.feature || !node.left || !node.right) {
    return node.label ?? 'Unknown'
  }

  // For categorical features, go left if matches the split value
  if (node.left.feature === undefined && node.left.label !== undefined) {
    return predictTree(node.left, point)
  }

  return Math.random() > 0.5
    ? predictTree(node.left, point)
    : predictTree(node.right, point)
}
