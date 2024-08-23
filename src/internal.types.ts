/**
 * A type that represents the current key in the source object.
 *
 * This type is a string that corresponds to the key present in the source object
 * before it is transformed according to the schema.
 *
 * @type {string}
 */
type CurrentKey = string

/**
 * A type that represents the required key to be in the allocated object.
 *
 * This type is a string that corresponds to the new key name that will be used
 * in the allocated object after transformation.
 *
 * @type {string}
 */
type RequiredKey = string

/**
 * A type that represents a tuple of `CurrentKey` and `RequiredKey`.
 *
 * This tuple defines the mapping from the current key to the required key,
 * where the first element is the `CurrentKey` and the second element is the `RequiredKey`.
 *
 * @type {[CurrentKey, RequiredKey]}
 *
 * @example
 * const keyMapping: Keys = ["_a", "a"];
 * // "_a" is the current key, "a" is the required key
 */
export type Keys = [CurrentKey, RequiredKey]

/**
 * A map of key-value pairs that define how to replace keys in the source.
 *
 * The keys of this record represent the current keys in the source object,
 * and the values represent the required keys that will replace them in the allocated object.
 *
 * @type {Record<string, string>}
 *
 * @example
 * const schema: AllocateSchema = {
 *   "_a": "a",
 *   "_b": "b"
 * };
 * // This schema will transform { _a: true, _b: true } into { a: true, b: true }
 */
export type AllocateSchema = Record<string, string>
