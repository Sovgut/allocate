/**
 * Checks if a string value is empty or undefined.
 *
 * This function determines if the given string value is either `undefined` or an empty string.
 * It returns `true` if the value is `undefined` or has a length of 0; otherwise, it returns `false`.
 *
 * @param {string | undefined} value - The string value to check. This can be either a string or `undefined`.
 * @returns {boolean} - Returns `true` if the value is `undefined` or an empty string, `false` otherwise.
 *
 * @example
 * isEmpty(undefined); // Returns: true
 * isEmpty("");       // Returns: true
 * isEmpty("text");   // Returns: false
 */
export function isEmpty(value: string | undefined): boolean {
  if (typeof value === 'undefined')
    return true

  return value.length === 0
}
