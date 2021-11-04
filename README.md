# filename2shiki

filename to Shiki language

Please note that this is a [pure ESM package](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

## Installation

```shell
npm install filename2shiki
```

## Usage

```js
import * as filename2shiki from 'filename2shiki'
import path from 'node:path'

// get only filename
const filename = path.basename('src/main.rs') // 'main.rs'

// use fineOne to get one language
const language = filename2shiki.findOne(filename) // 'rust'

// use findAll to get all languages
const languages = filename2shiki.findAll(filename) // ['rust', 'xml']
```
