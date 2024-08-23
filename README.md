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
import { allocate } from '@sovgut/allocate';

const source = { _a: true };
const schema = { "_a": "a" };
const allocated = allocate(source, schema);

console.log(allocated); // Outputs: { a: true }
```

### Nested Key Replacement

Handle nested structures with dot notation:

```javascript
import { allocate } from '@sovgut/allocate';

const source = { _a: { _b: true } };
const schema = { "_a._b": "a.b" };
const allocated = allocate(source, schema);

console.log(allocated); // Outputs: { a: { b: true } }
```

### Array of Objects

Apply key replacement to each object in an array:

```javascript
import { allocate } from '@sovgut/allocate';

const source = [{ _a: true }, { _a: true }];
const schema = { "_a": "a" };
const allocated = allocate(source, schema);

console.log(allocated); // Outputs: [ { a: true }, { a: true } ]
```

### Complex Nested Structures

Work with deeply nested arrays and objects:

```javascript
import { allocate } from '@sovgut/allocate';

const source = { _a: { _b: [{ _c: true }, { _c: true }] } };
const schema = { "_a._b.*._c": "a.b.*.c" };
const allocated = allocate(source, schema);

console.log(allocated); // Outputs: { a: { b: [ { c: true }, { c: true } ] } }
```

## API

```ts
/**
 * A function to replace keys in an object or an array of objects following provided schema.
 *
 * @template TResult The type of the output object after key allocation.
 * @param {NonNullable<object | object[]>} source - The source object or array to be traversed.
 * @param {AllocateSchema} schema - The key mapping schema where each key-value pair represents oldKey-newKey mapping.
 * @returns {TResult} - The new object or array with the replaced keys.
 */
export declare function allocate<TResult>(source: NonNullable<object | object[]>, schema: AllocateSchema): TResult;

/**
 * A map of key value pairs that define how to replace keys in the source.
 */
export declare type AllocateSchema = Record<string, string>;
```

#### Parameters:
- `source`: The source object or array of objects to be transformed.
- `schema`: An object defining the mapping between old keys and new keys. Use dot notation for nested keys and `*` to indicate array elements.

#### Returns:
- A new object or array with keys replaced according to the schema.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
