/**
 * A type that represents the current key in the source object.
 */
type CurrentKey = string;

/**
 * A type that represents the required key to be in the allocated object.
 */
type RequiredKey = string;

/**
 * A type that represents a tuple of CurrentKey and RequiredKey.
 */
export type Keys = [CurrentKey, RequiredKey];

/**
 * A map of key value pairs that define how to replace keys in the source.
 */
export type AllocateSchema = Record<string, string>;