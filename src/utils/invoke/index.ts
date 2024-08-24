import { pick } from '@/utils/pick'
import { allocateObject } from '@/utils/allocate-object'
import { allocateArray } from '@/utils/allocate-array'
import { CURRENT_KEY, REQUIRED_KEY } from '@/constants'
import type { Keys } from '@/internal.types.ts'

/**
 * Invokes the appropriate allocation function based on the source and key mappings.
 *
 * This function determines whether the source should be allocated as an array or an object,
 * based on the `currentKey` from the `keys` tuple. If the `currentKey` is '*', it delegates
 * the allocation to the `allocateArray` function, otherwise, it uses the `allocateObject` function.
 * The `keys` tuple provides the key mappings for transformation, with support for both direct and nested mappings.
 *
 * @param {any} source - The source structure (either an object or an array) to be transformed.
 *                       This is the data that will be processed and re-mapped based on the provided `keys`.
 * @param {Keys} keys - A tuple of two strings where:
 *                      - The first element (`keys[CURRENT_KEY]`) is the current key or path to be transformed.
 *                      - The second element (`keys[REQUIRED_KEY]`) is the required key or path for the transformed output.
 *
 * @return {any} - The resulting object or array after applying the key mappings. If the `currentKey` is '*',
 *                 an array is returned; otherwise, an object is returned.
 *
 * @example
 * const source = [{ _a: { __b: true } }, { _a: { __b: false } }];
 * const keys: Keys = ["_a[].__b", "a[].b"];
 * const result = invoke(source, keys);
 * // result is [{ a: { b: true } }, { a: { b: false } }]
 *
 * @example
 * const source = { _a: { __b: true } };
 * const keys: Keys = ["_a", "a"];
 * const rest: Keys = ["__b", "b"];
 * const result = invoke(source, keys);
 * // result is { a: { b: true } }
 */
export function invoke(source: any, keys: Keys): any {
  const [currentKey, restCurrent] = pick(keys[CURRENT_KEY])
  const [requiredKey, restRequired] = pick(keys[REQUIRED_KEY])

  if (currentKey === '[]') {
    return allocateArray(source, [restCurrent, restRequired])
  }

  return allocateObject(source, [currentKey, requiredKey], [restCurrent, restRequired])
}
