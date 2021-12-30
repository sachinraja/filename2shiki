import yaml from 'js-yaml'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { BUNDLED_LANGUAGES, Lang } from 'shiki'
import { GrammarData, LanguageType, SortedLanguages } from '../src/types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

type ExtraGrammarData = GrammarData & {
  aliases?: string[]
}

type Grammars = Record<string, ExtraGrammarData>

const getSortedLanguages = (languageMap: Record<Lang, GrammarData>) => {
  const languages = Object.entries(languageMap) as Array<[Lang, GrammarData]>

  const priorities: LanguageType[] = ['programming', 'markup', 'data', 'prose']

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const sortedLanguages = {} as SortedLanguages

  for (const priority of priorities) {
    sortedLanguages[priority] = []
  }

  for (const [languageId, language] of languages) {
    const foundPriority = priorities.find(
      (priority) => priority === language.type,
    )!

    sortedLanguages[foundPriority].push([
      languageId,
      {
        extensions: language.extensions,
        filenames: language.filenames,
      },
    ])
  }

  return sortedLanguages
}

const build = () => {
  const grammarFilepath = path.join(__dirname, 'linguist-languages.yaml')

  const grammarData = Object.entries(
    yaml.load(fs.readFileSync(grammarFilepath, 'utf8')) as Grammars,
  )

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const resolvedObject = {} as Record<string, GrammarData>

  for (const lang of BUNDLED_LANGUAGES) {
    const langData = grammarData.find(([langId, data]) => {
      if (langId.toLowerCase() === lang.id) return true

      if (data.aliases?.includes(lang.id)) return true
      if (lang.aliases?.includes(langId)) return true

      return false
    })

    if (!langData) continue

    const [, data] = langData

    resolvedObject[lang.id as Lang] = {
      extensions: data.extensions,
      filenames: data.filenames,
      type: data.type,
    }
  }

  const sortedLanguages = getSortedLanguages(resolvedObject)

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'languages.ts'),
    `import { SortedLanguages } from './types'\nexport const sortedLanguages = ${
      JSON.stringify(
        sortedLanguages,
      )
    } as SortedLanguages`,
    'utf8',
  )
}

build()
