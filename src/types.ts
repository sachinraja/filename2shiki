import { Lang } from 'shiki'

export type ExtensionsAndFilenames = {
  extensions?: string[]
  filenames?: string[]
}

export type LanguageMap = Record<Lang, ExtensionsAndFilenames>

export type LanguageType = 'programming' | 'markup' | 'data' | 'prose'

export type GrammarData = ExtensionsAndFilenames & {
  type: LanguageType
}

export type LanguageEntry = [Lang, ExtensionsAndFilenames]
export type SortedLanguages = Record<LanguageType, LanguageEntry[]>
