import {invoke} from "../invoke";
import {Keys} from "../../types";
import {CURRENT_KEY, REQUIRED_KEY} from "../../constants";

/**
 * Allocates the source object to a new object based on the provided key mappings.
 * If nested key allocations are needed, invoke function is called recursively.
 * @param {any} source - The source object structure.
 * @param {Keys} keys - A tuple of current and required keys.
 * @param {Keys} rest - A tuple of remaining current and required keys
 * @return {any} - The resulting object after allocation.
 */
export function allocateObject(source: any, keys: Keys, rest: Keys): any {
    const allocated: any = {};

    if (rest[CURRENT_KEY]?.length > 0 && rest[REQUIRED_KEY]?.length > 0) {
        allocated[keys[REQUIRED_KEY]] = invoke(source[keys[CURRENT_KEY]], [rest[CURRENT_KEY], rest[REQUIRED_KEY]])
    } else {
        allocated[keys[REQUIRED_KEY]] = source[keys[CURRENT_KEY]];
    }

    return allocated;
}