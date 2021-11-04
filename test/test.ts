import { findAll, findOne, getSortedLanguages } from '../src'
import { SortedLanguages } from '../src/types'

let sortedLanguages: SortedLanguages

beforeAll(() => {
  sortedLanguages = getSortedLanguages()
})

test('index.ts gets typescript', () => {
  expect(findOne(sortedLanguages, 'index.ts')).toBe('typescript')
})

test('index.js gets javascript', () => {
  expect(findOne(sortedLanguages, 'index.js')).toBe('javascript')
})

test('/home/user/projects/elixir/main.ex gets elixir', () => {
  expect(findOne(sortedLanguages, 'main.ex')).toBe('elixir')
})

test('test.html gets html', () => {
  expect(findOne(sortedLanguages, 'test.html')).toBe('html')
})

test('a/test.cake gets csharp, coffee for findAll', () => {
  expect(findAll(sortedLanguages, 'a/test.cake')).toEqual(['coffee', 'csharp'])
})

test('a/b/c/test.yml.mysql gets mysql, yaml for findAll', () => {
  expect(findAll(sortedLanguages, 'a/b/c/test.yml.mysql')).toEqual([
    'sql',
    'yaml',
  ])
})

test('this/is/a/directory/with/a/nonexistent.ext gets undefined', () => {
  expect(
    findOne(sortedLanguages, 'this/is/a/directory/with/a/nonexistent.ext')
  ).toBe(undefined)
})
