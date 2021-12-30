import path from 'node:path'
import { expect, test } from 'vitest'
import { findAll, findOne } from '../src'

test('index.ts gets typescript', () => {
  expect(findOne('index.ts')).toBe('typescript')
})

test('index.js gets javascript', () => {
  expect(findOne('index.js')).toBe('javascript')
})

test('/home/user/projects/elixir/main.ex gets elixir', () => {
  expect(findOne('main.ex')).toBe('elixir')
})

test('test.html gets html', () => {
  expect(findOne('test.html')).toBe('html')
})

test('a/test.cake gets csharp, coffee for findAll', () => {
  const filename = path.basename('a/test.cake')

  expect(findAll(filename)).toEqual(['coffee', 'csharp'])
})

test('a/b/c/test.yml.mysql gets mysql, yaml for findAll', () => {
  const filename = path.basename('a/b/c/test.yml.mysql')

  expect(findAll(filename)).toEqual(['sql', 'yaml'])
})

test('src/main.rs gets rust, xml for findAll, prioritizing rust for findOne', () => {
  const filename = path.basename('src/main.rs')
  console.log(filename)
  expect(findOne(filename)).toBe('rust')
  expect(findAll(filename)).toEqual(['rust', 'xml'])
})

test('this/is/a/directory/with/a/nonexistent.ext gets undefined', () => {
  const filename = path.basename('this/is/a/directory/with/a/nonexistent.ext')

  expect(findOne(filename)).toBe(undefined)
})
