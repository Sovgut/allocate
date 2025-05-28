import { describe, it, expect } from 'vitest';
import { allocate } from './Allocate.ts';

describe('allocate', () => {
  describe('Basic Key Replacement', () => {
    it('should replace keys in a simple object', () => {
      const source = { foo: true, qux: false };
      const schema = { foo: 'bar' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({ bar: true, qux: false });
    });

    it('should handle multiple key replacements', () => {
      const source = { foo: true, qux: false, baz: 'test' };
      const schema = { foo: 'bar', qux: 'quux' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({ bar: true, quux: false, baz: 'test' });
    });
  });

  describe('Nested Key Replacement', () => {
    it('should handle nested structures with dot notation', () => {
      const source = { foo: { bar: true, baz: false } };
      const schema = { 'foo.baz': 'bar.qux' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({ foo: { bar: true }, bar: { qux: false } });
    });

    it('should handle deeply nested paths', () => {
      const source = { a: { b: { c: { d: 'value' } } } };
      const schema = { 'a.b.c.d': 'x.y.z' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({ a: { b: { c: {} } }, x: { y: { z: 'value' } } });
    });
  });

  describe('Array of Objects', () => {
    it('should apply key replacement to each object in an array', () => {
      const source = [{ foo: true }, { foo: true, bar: 123 }];
      const schema = { '[].foo': '[].bar' };
      const result = allocate(source, schema);
      
      expect(result).toEqual([{ bar: true }, { bar: true }]);
    });

    it('should handle array with nested object key replacement', () => {
      const source = [{ user: { name: 'John', age: 30 } }, { user: { name: 'Jane', age: 25 } }];
      const schema = { '[].user.name': '[].person.fullName' };
      const result = allocate(source, schema);
      
      expect(result).toEqual([
        { user: { age: 30 }, person: { fullName: 'John' } },
        { user: { age: 25 }, person: { fullName: 'Jane' } }
      ]);
    });
  });

  describe('Complex Nested Structures', () => {
    it('should work with deeply nested arrays and objects', () => {
      const source = { foo: { bar: [{ baz: true }, { baz: true }] } };
      const schema = { 'foo.bar[].baz': 'foo.bar[].qux' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({ foo: { bar: [{ qux: true }, { qux: true }] } });
    });

    it('should handle multiple array levels', () => {
      const source = {
        data: [
          { items: [{ value: 1 }, { value: 2 }] },
          { items: [{ value: 3 }, { value: 4 }] }
        ]
      };
      const schema = { 'data[].items[].value': 'data[].items[].result' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({
        data: [
          { items: [{ result: 1 }, { result: 2 }] },
          { items: [{ result: 3 }, { result: 4 }] }
        ]
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle null source', () => {
      const result = allocate(null, { foo: 'bar' });
      expect(result).toBeNull();
    });

    it('should handle undefined source', () => {
      const result = allocate(undefined, { foo: 'bar' });
      expect(result).toBeUndefined();
    });

    it('should handle empty object', () => {
      const result = allocate({}, { foo: 'bar' });
      expect(result).toEqual({});
    });

    it('should handle empty array', () => {
      const result = allocate([], { '[].foo': '[].bar' });
      expect(result).toEqual([]);
    });

    it('should handle non-existent paths gracefully', () => {
      const source = { foo: 'bar' };
      const schema = { 'baz.qux': 'new.path' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({ foo: 'bar', new: { path: undefined } });
    });

    it('should handle self-referencing keys', () => {
      const source = { foo: { bar: 'value' } };
      const schema = { 'foo.bar': 'foo.bar' };
      const result = allocate(source, schema);
      
      expect(result).toEqual({ foo: { bar: 'value' } });
    });
  });

  describe('Type Preservation', () => {
    it('should preserve data types', () => {
      const source = {
        str: 'string',
        num: 123,
        bool: true,
        null: null,
        arr: [1, 2, 3],
        obj: { nested: true }
      };
      const schema = {
        str: 'newStr',
        num: 'newNum',
        bool: 'newBool',
        null: 'newNull',
        arr: 'newArr',
        obj: 'newObj'
      };
      const result = allocate(source, schema);
      
      expect(result).toEqual({
        newStr: 'string',
        newNum: 123,
        newBool: true,
        newNull: null,
        newArr: [1, 2, 3],
        newObj: { nested: true }
      });
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle multiple transformations on the same object', () => {
      const source = {
        user: {
          firstName: 'John',
          lastName: 'Doe',
          address: {
            street: '123 Main St',
            city: 'Boston'
          }
        }
      };
      const schema = {
        'user.firstName': 'profile.name.first',
        'user.lastName': 'profile.name.last',
        'user.address.street': 'profile.location.street',
        'user.address.city': 'profile.location.city'
      };
      const result = allocate(source, schema);
      
      expect(result).toEqual({
        profile: {
          name: {
            first: 'John',
            last: 'Doe'
          },
          location: {
            street: '123 Main St',
            city: 'Boston'
          }
        },
        user: {
          address: {}
        }
      });
    });

    it('should handle array to object transformation', () => {
      const source = {
        items: [
          { id: 1, name: 'Item 1' },
          { id: 2, name: 'Item 2' }
        ]
      };
      const schema = {
        'items[].id': 'products[].productId',
        'items[].name': 'products[].productName'
      };
      const result = allocate(source, schema);
      
      expect(result).toEqual({
        products: [
          { productId: 1, productName: 'Item 1' },
          { productId: 2, productName: 'Item 2' }
        ],
        items: [
          {},
          {}
        ]
      });
    });
  });
});