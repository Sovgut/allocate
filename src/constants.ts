/**
 * Represents the index of the current key in the `Keys` tuple.
 *
 * This constant is used to access the current key from a `Keys` tuple,
 * which typically contains a pair of strings representing the current and required keys.
 *
 * @type {number}
 * @example
 * const keys: Keys = ["_a", "a"];
 * const currentKey = keys[CURRENT_KEY]; // "_a"
 */
export const CURRENT_KEY: number = 0

/**
 * Represents the index of the required key in the `Keys` tuple.
 *
 * This constant is used to access the required key from a `Keys` tuple,
 * which typically contains a pair of strings representing the current and required keys.
 *
 * @type {number}
 * @example
 * const keys: Keys = ["_a", "a"];
 * const requiredKey = keys[REQUIRED_KEY]; // "a"
 */
export const REQUIRED_KEY: number = 1
