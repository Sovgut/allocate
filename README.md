# @sovgut/allocate

<p align="center">
  <b>A lightweight TypeScript utility for transforming object and array structures by remapping keys according to a schema. Perfect for API response transformation, data migration, and object restructuring.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/@sovgut/allocate" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/@sovgut/allocate" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/sovgut/allocate" alt="license" />
</p>

## Features

- 🔄 **Key Remapping**: Transform object keys based on a simple schema
- 🎯 **Deep Path Support**: Navigate and transform deeply nested properties using dot notation
- 📦 **Array Handling**: Process arrays of objects with special `[]` notation
- 🌳 **Nested Transformations**: Handle complex nested structures with ease
- 🚀 **Zero Dependencies**: Lightweight and fast

## Installation

```bash
npm install @sovgut/allocate
```

```bash
yarn add @sovgut/allocate
```

```bash
pnpm add @sovgut/allocate
```

## Table of Contents

- [Quick Start](#quick-start)
- [Usage](#usage)
  - [Basic Example](#basic-example)
  - [Working with Nested Objects](#working-with-nested-objects)
  - [Array Transformations](#array-transformations)
  - [Complex Nested Arrays](#complex-nested-arrays)
  - [Root-Level Arrays](#root-level-arrays)
- [API Reference](#api-reference)
- [Important Notes](#important-notes)
- [Contributing](#-contributing)
- [License](#-license)

## Quick Start

Get started with `@sovgut/allocate` in seconds:

```typescript
import { allocate } from '@sovgut/allocate';

// Transform a simple object
const user = { firstName: 'John', lastName: 'Doe' };
const result = allocate(user, {
  firstName: 'name.first',
  lastName: 'name.last'
});
// Output: { name: { first: 'John', last: 'Doe' } }

// Transform an array of objects
const users = [{ id: 1, email: 'john@example.com' }];
const transformed = allocate(users, {
  '[].id': '[].userId',
  '[].email': '[].contact.email'
});
// Output: [{ userId: 1, contact: { email: 'john@example.com' } }]
```

## Usage

### Basic Example

```typescript
import { allocate } from '@sovgut/allocate';

const user = {
  firstName: 'John',
  lastName: 'Doe'
};

const schema = {
  firstName: 'name.first',
  lastName: 'name.last'
};

const result = allocate(user, schema);
// Result: { name: { first: 'John', last: 'Doe' } }
```

### Working with Nested Objects

Use dot notation to access and transform nested properties:

```typescript
const data = {
  user: {
    details: {
      email: 'john@example.com',
      phone: '123-456-7890'
    }
  }
};

const schema = {
  'user.details.email': 'contact.email',
  'user.details.phone': 'contact.phone'
};

const result = allocate(data, schema);
// Result: { 
//   contact: { email: 'john@example.com', phone: '123-456-7890' },
//   user: { details: {} }
// }
```

### Array Transformations

Transform arrays of objects using the `[]` notation:

```typescript
const data = {
  users: [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ]
};

const schema = {
  'users[].id': 'people[].userId',
  'users[].name': 'people[].fullName'
};

const result = allocate(data, schema);
// Result: {
//   people: [
//     { userId: 1, fullName: 'John' },
//     { userId: 2, fullName: 'Jane' }
//   ],
//   users: [{}, {}]
// }
```

### Complex Nested Arrays

Handle deeply nested array structures:

```typescript
const data = {
  departments: [
    {
      name: 'Engineering',
      teams: [
        { id: 1, lead: 'Alice' },
        { id: 2, lead: 'Bob' }
      ]
    }
  ]
};

const schema = {
  'departments[].teams[].lead': 'departments[].teams[].manager'
};

const result = allocate(data, schema);
// Result: {
//   departments: [{
//     name: 'Engineering',
//     teams: [
//       { id: 1, manager: 'Alice' },
//       { id: 2, manager: 'Bob' }
//     ]
//   }]
// }
```

### Root-Level Arrays

Transform arrays at the root level:

```typescript
const users = [
  { firstName: 'John', age: 30 },
  { firstName: 'Jane', age: 25 }
];

const schema = {
  '[].firstName': '[].name',
  '[].age': '[].years'
};

const result = allocate(users, schema);
// Result: [
//   { name: 'John', years: 30 },
//   { name: 'Jane', years: 25 }
// ]
```

## API Reference

### `allocate(source, schema)`

Transforms an object or array structure according to the provided schema.

#### Parameters

- **source**: `T` - The source object or array to transform. Can be:
  - A plain object
  - An array of objects
  - `null` or `undefined` (returns as-is)

- **schema**: `Record<string, string>` - A mapping of source paths to destination paths

#### Returns

Returns the transformed object/array with keys remapped according to the schema. The original source remains unchanged.

#### Path Syntax

- **Dot notation**: Access nested properties (e.g., `'user.profile.name'`)
- **Array notation**: Use `[]` to indicate array iteration (e.g., `'users[].name'`)
- **Combined**: Mix both notations (e.g., `'data[].items[].value'`)

## Important Notes

1. **Original Structure**: The function preserves parts of the original structure that aren't explicitly transformed
2. **Empty Objects**: After moving properties, empty parent objects remain in the result
3. **Type Preservation**: All value types are preserved during transformation
4. **Non-existent Paths**: Accessing non-existent paths results in `undefined` values
5. **Self-referencing**: Mapping a path to itself keeps the value in place

## 🤝 Contributing

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request on [GitHub](https://github.com/sovgut/allocate).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/sovgut">sovgut</a>
</p>

<p align="center">
  <a href="https://github.com/sovgut/allocate">GitHub</a> •
  <a href="https://www.npmjs.com/package/@sovgut/allocate">npm</a> •
  <a href="#-api-reference">Documentation</a>
</p>
