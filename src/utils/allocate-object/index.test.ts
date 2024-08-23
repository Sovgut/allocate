import { describe, expect, it } from 'vitest'
import { allocateObject } from '@/utils/allocate-object'

describe('allocateObject()', () => {
  it('should map the key `_a` to `a` in the resulting object when no nested key allocation is required', () => {
    expect(allocateObject({ _a: true }, ['_a', 'a'], ['', ''])).toEqual({ a: true })
  })

  it('should map the key `_a` to `a` and retain the nested structure when the nested key `__b` is mapped to the same', () => {
    expect(allocateObject({ _a: { __b: true } }, ['_a', 'a'], ['__b', ''])).toEqual({ a: { __b: true } })
  })

  it('should map the key `_a` to `a` and retain the nested structure even when only the `required` key in the rest tuple is specified', () => {
    expect(allocateObject({ _a: { __b: true } }, ['_a', 'a'], ['', 'b'])).toEqual({ a: { __b: true } })
  })

  it('should map both the parent key `_a` to `a` and the nested key `__b` to `b` in the resulting object', () => {
    expect(allocateObject({ _a: { __b: true } }, ['_a', 'a'], ['__b', 'b'])).toEqual({ a: { b: true } })
  })
})
