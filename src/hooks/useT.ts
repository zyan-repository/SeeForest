import { usePresentation } from '../store/usePresentation'
import type { Locale } from '../types'

type I18nString = { readonly en: string; readonly zh: string }

export function useT() {
  const locale = usePresentation(s => s.locale)

  return function t(text: I18nString): string {
    return text[locale]
  }
}

export function useLocale(): Locale {
  return usePresentation(s => s.locale)
}
