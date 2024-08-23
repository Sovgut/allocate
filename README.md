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
function allocate<TAllocated = any>(
    source: NonNullable<TAllocated>, 
    schema: AllocateSchema
): TAllocated
```

#### Parameters:
- `source`: The source object or array of objects to be transformed.
- `schema`: An object defining the mapping between old keys and new keys. Use dot notation for nested keys and `*` to indicate array elements.

#### Returns:
- A new object or array with keys replaced according to the schema.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
