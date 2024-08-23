import {invoke} from "@/utils/invoke";
import {Keys} from "@/internal.types.ts";
import {CURRENT_KEY, REQUIRED_KEY} from "@/constants";

/**
 * Iterates over the source array and allocates each item based on the provided key mappings.
 * @param {any} source - The source array structure.
 * @param {Keys} keys - A tuple of current and required keys.
 * @return {any[]} - The resulting array after allocation.
 */
export function allocateArray(source: any, keys: Keys): any[] {
    const allocated: any[] = [];

    for (const item of source) {
        allocated.push(invoke(item, [keys[CURRENT_KEY], keys[REQUIRED_KEY]]))
    }

    return allocated;
}