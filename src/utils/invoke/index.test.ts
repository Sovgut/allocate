import { describe, expect, it } from 'vitest'
import { invoke } from '@/utils/invoke'

describe('invoke()', () => {
  it('should replace the specified key in the input object', () => {
    expect(invoke({ _a: true }, ['_a', 'a'])).toEqual({ a: true })
  })

  it('should recursively replace nested keys correctly', () => {
    expect(invoke({ _a: { __b: true } }, ['_a.__b', 'a.b'])).toEqual({ a: { b: true } })
    expect(invoke({ a: { _b: true } }, ['a._b', 'a.b'])).toEqual({ a: { b: true } })
    expect(invoke({ _a: { b: true } }, ['_a.b', 'a.b'])).toEqual({ a: { b: true } })
  })

  it('should correctly replace keys in nested array fields', () => {
    expect(invoke({ _a: [{ __b: true }, { __b: true }] }, ['_a.*.__b', 'a.*.b'])).toEqual({ a: [{ b: true }, { b: true }] })
    expect(invoke([{ _a: true }, { _a: true }], ['*._a', '*.a'])).toEqual([{ a: true }, { a: true }])
  })
})
