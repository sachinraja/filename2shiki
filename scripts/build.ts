import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import { BUNDLED_LANGUAGES, Lang } from 'shiki'
import yaml from 'js-yaml'
import { GrammarData } from '../src/types'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

type ExtraGrammarData = GrammarData & {
  aliases?: string[]
}

type Grammars = Record<string, ExtraGrammarData>

const build = () => {
  const grammarFilepath = path.join(__dirname, 'grammar.yaml')

  const grammarData = Object.entries(
    yaml.load(fs.readFileSync(grammarFilepath, 'utf8')) as Grammars
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

  fs.writeFileSync(
    path.join(__dirname, '..', 'src', 'languages.ts'),
    `import { Lang } from 'shiki'\nimport { GrammarData } from './types'\nexport const languageMap = ${JSON.stringify(
      resolvedObject
    )} as Record<Lang, GrammarData>`,
    'utf8'
  )
}

build()
