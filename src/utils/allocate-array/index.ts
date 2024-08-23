import { invoke } from '@/utils/invoke'
import type { Keys } from '@/internal.types.ts'
import { CURRENT_KEY, REQUIRED_KEY } from '@/constants'

/**
 * Iterates over the source array and allocates each item based on the provided key mappings.
 *
 * This function processes each element of the source array, applying key mappings as defined
 * by the `keys` tuple. It uses the `invoke` function to transform each item in the array according
 * to the provided key mappings. The function returns a new array where each item has been transformed
 * according to the specified keys.
 *
 * @param {any[]} source - The source array containing items to be transformed. Each item in the array
 *                         should be an object where the keys will be mapped according to the schema.
 * @param {Keys} keys - A tuple of two strings representing the current key and the required key.
 *                      The first element (`keys[CURRENT_KEY]`) is the current key to be mapped, and the second
 *                      element (`keys[REQUIRED_KEY]`) is the new key that will replace the current key in the resulting items.
 * @return {any[]} - The resulting array where each item has been transformed according to the key mappings.
 *
 * @example
 * const source = [{ _a: true }, { _a: false }];
 * const keys: Keys = ["_a", "a"];
 * const result = allocateArray(source, keys);
 * // result is [{ a: true }, { a: false }]
 */
export function allocateArray(source: any, keys: Keys): any[] {
  const allocated: any[] = []

  for (const item of source) {
    allocated.push(invoke(item, [keys[CURRENT_KEY], keys[REQUIRED_KEY]]))
  }

  return allocated
}
