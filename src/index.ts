import { Lang } from 'shiki'
import { languageMap } from './languages'
import {
  ExtensionsAndFilenames,
  GrammarData,
  LanguageType,
  SortedLanguages,
} from './types'

export const getSortedLanguages = () => {
  const languages = Object.entries(languageMap) as Array<[Lang, GrammarData]>

  const priorities: LanguageType[] = ['programming', 'markup', 'data', 'prose']

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const sortedLanguages = {} as SortedLanguages

  for (const priority of priorities) {
    sortedLanguages[priority] = []
  }

  for (const [languageId, language] of languages) {
    const foundPriority = priorities.find(
      (priority) => priority === language.type
    )!

    sortedLanguages[foundPriority].push([languageId, language])
  }

  return sortedLanguages
}

const doesLanguageMatchesFilename = (
  language: ExtensionsAndFilenames,
  filename: string
) => {
  if (language.extensions?.find((extension) => filename.endsWith(extension)))
    return true

  if (language.filenames?.includes(filename)) return true

  return false
}

/**
 * Find the first language that matches the filename.
 * @param filename Must be a basename. e.g. 'index.ts', not `src/index.ts`
 */
export const findOne = (sortedLanguages: SortedLanguages, filename: string) => {
  for (const languages of Object.values(sortedLanguages)) {
    const foundLanguage = languages.find(([, language]) =>
      doesLanguageMatchesFilename(language, filename)
    )

    if (foundLanguage) return foundLanguage[0]
  }
}

/**
 * Find the all languages that match the filename.
 * @param filename Must be a basename. e.g. 'index.ts', not `src/index.ts`
 */
export const findAll = (sortedLanguages: SortedLanguages, filename: string) => {
  const allFoundLanguages: Lang[] = []

  for (const languages of Object.values(sortedLanguages)) {
    const foundLanguages = languages.filter(([, language]) =>
      doesLanguageMatchesFilename(language, filename)
    )

    allFoundLanguages.push(...foundLanguages.map(([languageId]) => languageId))
  }

  return allFoundLanguages
}
