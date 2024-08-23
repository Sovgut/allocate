/**
 * Checks if a string value is empty or undefined.
 *
 * This function checks if the given value is either 'undefined' or an empty string.
 * Returns 'true' if the value is 'undefined' or an empty string, 'false' otherwise.
 *
 * @param {string | undefined} value - The string value to check. This can be either a string or 'undefined'.
 * @returns {boolean} Returns 'true' if the value is 'undefined' or an empty string, 'false' otherwise.
 */
export function isEmpty(value: string | undefined): boolean {
  if (typeof value === 'undefined')
    return true

  return value.length === 0
}
