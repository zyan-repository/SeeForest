export function giniImpurity(labels: readonly string[]): number {
  if (labels.length === 0) return 0
  const counts = new Map<string, number>()
  for (const label of labels) {
    counts.set(label, (counts.get(label) ?? 0) + 1)
  }
  let impurity = 1
  for (const count of counts.values()) {
    const p = count / labels.length
    impurity -= p * p
  }
  return impurity
}

export function informationGain(
  parentLabels: readonly string[],
  leftLabels: readonly string[],
  rightLabels: readonly string[],
): number {
  const parentGini = giniImpurity(parentLabels)
  const leftWeight = leftLabels.length / parentLabels.length
  const rightWeight = rightLabels.length / parentLabels.length
  return parentGini - leftWeight * giniImpurity(leftLabels) - rightWeight * giniImpurity(rightLabels)
}
