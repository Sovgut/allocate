import { describe, expect, it } from 'vitest'
import { pick } from '@/utils/pick'

describe('pick()', () => {
  it('should split the input string at the first occurrence of `.`', () => {
    expect(pick('a.b.c')).toEqual(['a', 'b.c'])
  })

  it('should split the input string at the first occurrence of `.` when the first part is `[]`', () => {
    expect(pick('[].b.c')).toEqual(['[]', 'b.c'])
  })

  it('should split the input string at the first occurrence of `.` when `[]` is in the middle part', () => {
    expect(pick('a[].c')).toEqual(['a', '[].c'])
  })

  it('should split the input string at the first occurrence of `.` when `[]` is in the last part', () => {
    expect(pick('a.b[]')).toEqual(['a', 'b[]'])
  })
})
