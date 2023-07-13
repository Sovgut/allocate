declare module '@sovgut/allocate' {
    /**
     * A map of key value pairs that define how to replace keys in the source.
     */
    type AllocateSchema = Record<string, string>;

    /**
     * A function to replace keys in an object or an array of objects following provided schema.
     *
     * @template TSource The type of the input source to be reshaped.
     * @template TAllocated The type of the output object after key allocation.
     * @param {TSource} source - The source object or array to be traversed.
     * @param {AllocateSchema} schema - The key mapping schema where each key-value pair represents oldKey-newKey mapping.
     * @returns {TAllocated} - The new object or array with the replaced keys.
     */
    export function allocate<TSource = any, TAllocated = any>(
        source: TSource,
        schema: AllocateSchema
    ): TAllocated;
}