# `allocate` _(@sovgut/allocate)_

This npm package exports a handy TypeScript function named `allocate`. The package is designed to allow developers to
replace keys in an object or an array of objects according to a provided key mapping schema. This is especially useful
when you need to reshape data according to certain rules but you want to do it without spending significant time
formatting your data.

## Test Coverage

The `allocate` function is thoroughly tested to ensure its correctness and robustness. All of its edge cases are well
covered and each new release is required to maintain or improve this high level of testing.

## Installation

You can install `allocate` function npm package via npm:

`npm install @sovgut/allocate`

## Examples

Consider the following examples on how you can use the allocate function:

### Example 1 - Basic Usage

```typescript
import {allocate} from '@sovgut/allocate';

const source = {_a: true};
const schema = {"_a": "a"};
const allocated = allocate(source, schema);
console.log(allocated); // Outputs: { a: true }
```

### Example 2 - Nested Object Allocation

```typescript
import {allocate} from '@sovgut/allocate';

const source = {_a: {_b: true}};
const schema = {"_a._b": "a.b"};
const allocated = allocate(source, schema);
console.log(allocated); // Outputs: { a: { b: true } }
```

### Example 3 - Array Allocation

```typescript
import {allocate} from '@sovgut/allocate';

const source = [{_a: true}, {_a: true}];
const schema = {"_a": "a"};
const allocated = allocate(source, schema);
console.log(allocated); // Outputs: [ { a: true }, { a: true } ]
```

### Example 4 - Complex Allocation

```typescript
import {allocate} from '@sovgut/allocate';

const source = {_a: {_b: [{_c: true}, {_c: true}]}};
const schema = {"_a._b.*._c": "a.b.*.c"};
const allocated = allocate(source, schema);
console.log(allocated); // Outputs: { a: { b: [ { c: true }, { c: true } ] } }
```

## API Definition

```typescript
type AllocateSchema = Record<string, string>;

export function allocate<TSource = any, TAllocated = any>(
    source: TSource,
    schema: AllocateSchema
): TAllocated;
```

#### Explanation:

- On Function Parameters:
    - `source: TSource` - The structure you want to transform, this can be of any type (`TSource`), such as an object or
      an array.
    - `schema: AllocateSchema` - This is a map of key value pairs that define how to replace keys in the source.
- On Return Type:
    - `TAllocated` - The function returns a new structure of type `TAllocated`. This transformed structure corresponds
      to the original source structure but its keys are modified as defined by the schema.
- On Generic Types (`TSource` and `TAllocated`):
    - These types are placeholders for any type that will be replaced with the actual types when you call the function.
      The default type is any, but you can specify a more precise type according to your requirements.
- On `AllocateSchema` type:
    - This is a type alias for the schema object which is a `Record<string, string>`, wherein both keys and values are
      string.

This function replaces the keys in a given source according to the provided schema and returns the newly created
structure. Please note that this will not mutate the original source but create a new copy with the keys replaced.
For example:

```typescript
import {allocate} from '@sovgut/allocate';

const source = {_a: true};
const schema = {"_a": "a"};
const result = allocate(source, schema);
console.log(result); // Outputs: { a: true }
```

This example will replace the `_a` key from the source object with `a` as per the provided schema, and log the newly
allocated object `{ a: true }`.

> If you have any suggestions or feedback, feel free to open an issue or send a PR.

## Building and Bundling The Project

#### 1. Installing Dependencies

Before building the project, make sure to install all necessary dependencies. This can be done using `npm`. Navigate to
your project root and run:

```npm install```

#### 2. Bundling

This project uses esbuild for bundling JavaScript files into a single file in both CommonJS and ES Module format. This
can be done using the bundle script specified in `package.json`. Run the bundle script with the following command:

```npm run bundle```

> Upon success, you should now have the bundled files `index.cjs` and `index.esm.js` in your `dist` directory.

#### 3. Testing

```npm run test```

> Remember, before publishing the package, make sure all tests are passing.

## License

MIT

## Authors

Serhii Sovhut / Sergey Sovgut