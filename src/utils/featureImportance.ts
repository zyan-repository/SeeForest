// Pre-computed feature importance values for the hiking dataset
// In a real scenario, these would be computed via permutation importance
export const FEATURE_IMPORTANCE: Record<string, number> = {
  outlook: 0.342,
  humidity: 0.268,
  wind: 0.215,
  temperature: 0.175,
}

export function getSortedFeatures(): Array<{ feature: string; importance: number }> {
  return Object.entries(FEATURE_IMPORTANCE)
    .map(([feature, importance]) => ({ feature, importance }))
    .sort((a, b) => b.importance - a.importance)
}
