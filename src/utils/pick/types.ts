/**
 * A type that represents a key in string form.
 *
 * This type is used to define a single key in a path or mapping schema. It represents a key as a string
 * in various data structures and operations where a key is required.
 *
 * @example
 * const key: Key = "someKey";
 */
export type Key = string

/**
 * A type that represents the rest of the path.
 *
 * This type is used to represent the remaining portion of a path after the initial key. It is useful for
 * handling nested paths or hierarchical data structures where part of the path needs to be specified
 * as a string.
 *
 * @example
 * const rest: Rest = "nested.path";
 */
export type Rest = string
