import type { Key, Rest } from '@/utils/pick/types'

/**
 * Splits a path string at the first occurrence of '.' into a key and the rest of the path.
 *
 * This function divides a dot-separated path into two parts: the initial key and the remaining
 * portion of the path. The first part is considered the `key`, and the remaining part is the `rest`.
 * This is useful for handling hierarchical paths or accessing nested properties in objects.
 *
 * @param {string} path - The dot-separated path string to be split.
 * @returns {[Key, Rest]} - A tuple where:
 *   - The first element (`Key`) is the initial key extracted from the path.
 *   - The second element (`Rest`) is the remaining path after the first key, joined as a string.
 *
 * @example
 * const [key, rest] = pick("parent.child.subchild");
 * // key is "parent"
 * // rest is "child.subchild"
 */
export function pick(path: string): [Key, Rest] {
  const [key, ...rest] = path.split('.')

  if (/\w+\[\]/.test(key)) {
    const arrayKey = key.slice(0, -2)

    rest.unshift('[]')

    return [arrayKey, rest.join('.')]
  }

  return [key, rest.join('.')]
}
