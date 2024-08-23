# @sovgut/allocate

A powerful utility for transforming the keys of objects or arrays of objects according to a specified schema. This package allows you to replace keys in deeply nested structures with ease.

## Features

- **Key Replacement:** Easily replace keys in objects or arrays based on a schema.
- **Nested Structures:** Supports nested objects and arrays, even with complex paths.
- **Array Handling:** Seamlessly process arrays of objects, applying key replacement to each item.

## Installation

Install the package via npm:

```bash
npm install @sovgut/allocate
```

Or via yarn:

```bash
yarn add @sovgut/allocate
```

## Usage

### Basic Key Replacement

Replace keys in a simple object:

```javascript
import { allocate } from '@sovgut/allocate'

const source = { _a: true }
const schema = { _a: 'a' }
const allocated = allocate(source, schema)

console.log(allocated) // Outputs: { a: true }
```

### Nested Key Replacement

Handle nested structures with dot notation:

```javascript
import { allocate } from '@sovgut/allocate'

const source = { _a: { _b: true } }
const schema = { '_a._b': 'a.b' }
const allocated = allocate(source, schema)

console.log(allocated) // Outputs: { a: { b: true } }
```

### Array of Objects

Apply key replacement to each object in an array:

```javascript
import { allocate } from '@sovgut/allocate'

const source = [{ _a: true }, { _a: true }]
const schema = { _a: 'a' }
const allocated = allocate(source, schema)

console.log(allocated) // Outputs: [ { a: true }, { a: true } ]
```

### Complex Nested Structures

Work with deeply nested arrays and objects:

```javascript
import { allocate } from '@sovgut/allocate'

const source = { _a: { _b: [{ _c: true }, { _c: true }] } }
const schema = { '_a._b.*._c': 'a.b.*.c' }
const allocated = allocate(source, schema)

console.log(allocated) // Outputs: { a: { b: [ { c: true }, { c: true } ] } }
```

## API

```ts
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
export declare function allocate<TResult>(source: NonNullable<object | object[]>, schema: AllocateSchema): TResult

/**
 * A map of key-value pairs that define how to replace keys in the source.
 *
 * The keys of this record represent the current keys in the source object,
 * and the values represent the required keys that will replace them in the allocated object.
 *
 * @type {Record<string, string>}
 *
 * @example
 * const schema: AllocateSchema = {
 *   "_a": "a",
 *   "_b": "b"
 * };
 * // This schema will transform { _a: true, _b: true } into { a: true, b: true }
 */
export declare type AllocateSchema = Record<string, string>
```

#### Parameters:
- `source`: The source object or array of objects to be transformed.
- `schema`: An object defining the mapping between old keys and new keys. Use dot notation for nested keys and `*` to indicate array elements.

#### Returns:
- A new object or array with keys replaced according to the schema.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
