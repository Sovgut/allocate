import { invoke } from '@/utils/invoke'
import type { AllocateSchema } from '@/internal.types.ts'

/**
 * Transforms the keys of an object or an array of objects according to a specified schema.
 *
 * The `allocate` function takes a source object (or array of objects) and a schema that defines
 * how the keys in the source should be transformed. It returns a new object (or array) with
 * the keys replaced as specified by the schema.
 *
 * @template TResult - The type of the resulting object or array after key allocation.
 * @param {NonNullable<object | object[]>} source - The source object or array to be transformed. It must be a non-null object or array of objects.
 * @param {AllocateSchema} schema - An object where each key-value pair defines the mapping from the old key to the new key.
 * @returns {TResult} - The transformed object or array with the keys replaced according to the schema.
 *
 * @throws {TypeError} Throws an error if the schema is not an object or if the source is not an object or an array.
 *
 * @example Basic Key Replacement
 * const source = { foo: true };
 * const schema = { "foo": "bar" };
 * const result = allocate(source, schema);
 * // result is { bar: true }
 *
 * @example Nested Key Replacement
 * const source = { foo: { bar: true } };
 * const schema = { "foo.bar": "foo.baz" };
 * const result = allocate(source, schema);
 * // result is { foo: { baz: true } }
 *
 * @example Array of Objects
 * const source = [{ foo: true }, { foo: true }];
 * const schema = { "foo": "bar" };
 * const result = allocate(source, schema);
 * // result is [{ bar: true }, { bar: true }]
 *
 * @example Complex Nested Structures
 * const source = { foo: { bar: [{ baz: true }, { baz: true }] } };
 * const schema = { "foo.bar.*.baz": "foo.hello.*.world" };
 * const result = allocate(source, schema);
 * // result is { foo: { hello: [{ world: true }, { world: true }] } }
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
