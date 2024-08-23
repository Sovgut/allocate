import {invoke} from "@/utils/invoke";
import {AllocateSchema} from "@/internal.types.ts";

/**
 * A function to replace keys in an object or an array of objects following provided schema.
 *
 * @template TAllocated The type of the output object after key allocation.
 * @param {NonNullable<TAllocated>} source - The source object or array to be traversed.
 * @param {AllocateSchema} schema - The key mapping schema where each key-value pair represents oldKey-newKey mapping.
 * @returns {TAllocated} - The new object or array with the replaced keys.
 */
export function allocate<TAllocated = any>(source: NonNullable<TAllocated>, schema: AllocateSchema): TAllocated {
    if (typeof schema !== "object") return source as TAllocated;
    if (typeof source !== "object") return source as TAllocated;

    let allocated = Array.isArray(source) ? [] : {};

    for (const current of Object.keys(schema)) {
        const required = schema[current];

        if (Array.isArray(source)) {
            allocated = [...(allocated as TAllocated[]), ...invoke(source, [current, required])]
        } else {
            allocated = {...allocated, ...invoke(source, [current, required])}
        }
    }

    return allocated as TAllocated;
}

export type {AllocateSchema} from "@/internal.types.ts"