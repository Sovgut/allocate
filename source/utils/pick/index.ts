import {type Key, type Rest} from "./types";

/**
 * Splits the provided path string at the first occurrence of '.'.
 * @param {string} path - A key path to be split.
 * @return {[Key, Rest]} - A tuple of key and rest of the path.
 */
export function pick(path: string): [Key, Rest] {
    const [key, ...rest] = path.split('.');

    return [key, rest.join('.')];
}