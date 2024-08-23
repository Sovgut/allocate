import { describe, expect, it } from 'vitest'
import { invoke } from '@/utils/invoke'

describe('invoke()', () => {
  it('should replace the specified key in the input object according to the provided mapping', () => {
    expect(invoke({ _a: true }, ['_a', 'a'])).toEqual({ a: true })
  })

  it('should replace the nested key `_a.__b` with `a.b` in the input object', () => {
    expect(invoke({ _a: { __b: true } }, ['_a.__b', 'a.b'])).toEqual({ a: { b: true } })
  })

  it('should replace the nested key `a._b` with `a.b` in the input object', () => {
    expect(invoke({ a: { _b: true } }, ['a._b', 'a.b'])).toEqual({ a: { b: true } })
  })

  it('should replace the nested key `_a.b` with `a.b` in the input object', () => {
    expect(invoke({ _a: { b: true } }, ['_a.b', 'a.b'])).toEqual({ a: { b: true } })
  })

  it('should replace keys in objects within an array, changing `_a.*.__b` to `a.*.b`', () => {
    expect(invoke({ _a: [{ __b: true }, { __b: true }] }, ['_a.*.__b', 'a.*.b'])).toEqual({ a: [{ b: true }, { b: true }] })
  })

  it('should replace keys in arrays of objects, changing `*._a` to `*.a`', () => {
    expect(invoke([{ _a: true }, { _a: true }], ['*._a', '*.a'])).toEqual([{ a: true }, { a: true }])
  })
})
