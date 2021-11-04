# filename2shiki

filename to Shiki language

Please note that this is a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## Installation

```shell
npm install filename2shiki
```

## Usage

```js
import { getSortedLanguages, findOne } from 'filename2shiki'

const sortedLanguages = getSortedLanguages()

// use fineOne to get one language
const language = findOne(sortedLanguages, 'src/index.js') // 'js'

// use findAll to get all languages
const languages = findAll(sortedLanguages, 'src/index.js') // ['js', 'jsx']
```
