import { invoke } from '@/utils/invoke'
import type { AllocateSchema } from '@/internal.types.ts'

/**
 * A function to replace keys in an object or an array of objects following provided schema.
 *
 * @template TResult The type of the output object after key allocation.
 * @param {NonNullable<object | object[]>} source - The source object or array to be traversed.
 * @param {AllocateSchema} schema - The key mapping schema where each key-value pair represents oldKey-newKey mapping.
 * @returns {TResult} - The new object or array with the replaced keys.
 */
export function allocate<TResult>(source: NonNullable<object | object[]>, schema: AllocateSchema): TResult {
  if (typeof schema !== 'object') {
    throw new TypeError('allocate(source, ->schema<-): Invalid schema')
  }

  if (typeof source !== 'object') {
    throw new TypeError('allocate(->source<-, schema): Invalid source (it is not an object or an array)')
  }

  let allocated = Array.isArray(source) ? [] : {}

  for (const current of Object.keys(schema)) {
    const required = schema[current]

    if (Array.isArray(source)) {
      allocated = [...(allocated as TResult[]), ...invoke(source, [current, required])]
    }
    else {
      allocated = { ...allocated, ...invoke(source, [current, required]) }
    }
  }

  return allocated as TResult
}

export type { AllocateSchema } from '@/internal.types.ts'
