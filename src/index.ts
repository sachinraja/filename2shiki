import { Lang } from 'shiki'
import { sortedLanguages } from './languages'
import { ExtensionsAndFilenames } from './types'

const doesLanguageMatchesFilename = (
  language: ExtensionsAndFilenames,
  filename: string,
) => {
  if (language.extensions?.find((extension) => filename.endsWith(extension))) {
    return true
  }

  if (language.filenames?.includes(filename)) return true

  return false
}

/**
 * Find the first language that matches the filename.
 * @param filename Must be a basename. e.g. 'index.ts', not `src/index.ts`
 */
export const findOne = (filename: string) => {
  for (const languages of Object.values(sortedLanguages)) {
    const foundLanguage = languages.find(([, language]) => doesLanguageMatchesFilename(language, filename))

    if (foundLanguage) return foundLanguage[0]
  }
}

/**
 * Find the all languages that match the filename.
 * @param filename Must be a basename. e.g. 'index.ts', not `src/index.ts`
 */
export const findAll = (filename: string) => {
  const allFoundLanguages: Lang[] = []

  for (const languages of Object.values(sortedLanguages)) {
    const foundLanguages = languages.filter(([, language]) => doesLanguageMatchesFilename(language, filename))

    allFoundLanguages.push(...foundLanguages.map(([languageId]) => languageId))
  }

  return allFoundLanguages
}
