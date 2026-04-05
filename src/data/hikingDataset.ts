import type { DataPoint } from '../types'

export const HIKING_DATASET: readonly DataPoint[] = [
  { features: { outlook: 'Sunny', temperature: 'Hot', humidity: 'High', wind: 'Weak' }, label: 'No' },
  { features: { outlook: 'Sunny', temperature: 'Hot', humidity: 'High', wind: 'Strong' }, label: 'No' },
  { features: { outlook: 'Overcast', temperature: 'Hot', humidity: 'High', wind: 'Weak' }, label: 'Yes' },
  { features: { outlook: 'Rain', temperature: 'Mild', humidity: 'High', wind: 'Weak' }, label: 'Yes' },
  { features: { outlook: 'Rain', temperature: 'Cool', humidity: 'Normal', wind: 'Weak' }, label: 'Yes' },
  { features: { outlook: 'Rain', temperature: 'Cool', humidity: 'Normal', wind: 'Strong' }, label: 'No' },
  { features: { outlook: 'Overcast', temperature: 'Cool', humidity: 'Normal', wind: 'Strong' }, label: 'Yes' },
  { features: { outlook: 'Sunny', temperature: 'Mild', humidity: 'High', wind: 'Weak' }, label: 'No' },
  { features: { outlook: 'Sunny', temperature: 'Cool', humidity: 'Normal', wind: 'Weak' }, label: 'Yes' },
  { features: { outlook: 'Rain', temperature: 'Mild', humidity: 'Normal', wind: 'Weak' }, label: 'Yes' },
  { features: { outlook: 'Sunny', temperature: 'Mild', humidity: 'Normal', wind: 'Strong' }, label: 'Yes' },
  { features: { outlook: 'Overcast', temperature: 'Mild', humidity: 'High', wind: 'Strong' }, label: 'Yes' },
  { features: { outlook: 'Overcast', temperature: 'Hot', humidity: 'Normal', wind: 'Weak' }, label: 'Yes' },
  { features: { outlook: 'Rain', temperature: 'Mild', humidity: 'High', wind: 'Strong' }, label: 'No' },
] as const

export const FEATURE_NAMES = ['outlook', 'temperature', 'humidity', 'wind'] as const
export const FEATURE_VALUES: Record<string, readonly string[]> = {
  outlook: ['Sunny', 'Overcast', 'Rain'],
  temperature: ['Hot', 'Mild', 'Cool'],
  humidity: ['High', 'Normal'],
  wind: ['Weak', 'Strong'],
} as const
