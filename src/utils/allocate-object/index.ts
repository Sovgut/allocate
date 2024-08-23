import { invoke } from '@/utils/invoke'
import type { Keys } from '@/internal.types.ts'
import { CURRENT_KEY, REQUIRED_KEY } from '@/constants'
import { isEmpty } from '@/utils/is-empty'

/**
 * Allocates the source object to a new object based on the provided key mappings.
 *
 * This function maps keys from the source object to the required keys in the resulting object
 * according to the `keys` and `rest` tuples. If both `rest[CURRENT_KEY]` and `rest[REQUIRED_KEY]` are
 * not empty, the function invokes the `invoke` function recursively to handle nested key mappings.
 * If either `rest[CURRENT_KEY]` or `rest[REQUIRED_KEY]` is empty, the function directly maps the key
 * from the source to the required key.
 *
 * @param {any} source - The source object that contains the data to be transformed. This object should
 *                       include keys that will be mapped to new keys as defined by the `keys` and `rest` parameters.
 * @param {Keys} keys - A tuple of two strings where:
 *                      - The first element (`keys[CURRENT_KEY]`) is the key in the source object to be mapped.
 *                      - The second element (`keys[REQUIRED_KEY]`) is the new key name to be used in the resulting object.
 * @param {Keys} rest - A tuple of two strings where:
 *                      - The first element (`rest[CURRENT_KEY]`) represents the remaining key path in the source object.
 *                      - The second element (`rest[REQUIRED_KEY]`) represents the remaining key path for the resulting object.
 * @return {any} - The resulting object after key allocation, where keys from the source object are transformed
 *                 based on the provided mappings.
 *
 * @example
 * const source = { _a: { __b: true } };
 * const keys: Keys = ["_a", "a"];
 * const rest: Keys = ["__b", "b"];
 * const result = allocateObject(source, keys, rest);
 * // result is { a: { b: true } }
 */
export function allocateObject(source: any, keys: Keys, rest: Keys): any {
  const allocated: any = {}

  if (!isEmpty(rest[CURRENT_KEY]) && !isEmpty(rest[REQUIRED_KEY])) {
    allocated[keys[REQUIRED_KEY]] = invoke(source[keys[CURRENT_KEY]], [rest[CURRENT_KEY], rest[REQUIRED_KEY]])
  }
  else {
    allocated[keys[REQUIRED_KEY]] = source[keys[CURRENT_KEY]]
  }

  return allocated
}
