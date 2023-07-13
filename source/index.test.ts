import {allocate} from "./";

test("allocate function should map input object keys according to the provided mapping", () => {
    expect(allocate({_a: true}, {"_a": "a"})).toEqual({a: true})
})

test("allocate function should correctly map nested input object keys according to the provided mapping", () => {
    expect(allocate({_a: {__b: true}}, {"_a.__b": "a.b"})).toEqual({a: {b: true}})
    expect(allocate({a: {_b: true}}, {"a._b": "a.b"})).toEqual({a: {b: true}})
    expect(allocate({_a: {b: true}}, {"_a.b": "a.b"})).toEqual({a: {b: true}})
})

test("allocate function should correctly map nested array fields according to the provided mapping", () => {
    expect(allocate({_a: [{__b: true}, {__b: true}]}, {"_a.*.__b": "a.*.b"})).toEqual({a: [{b: true}, {b: true}]})
    expect(allocate([{_a: true}, {_a: true}], {"*._a": "*.a"})).toEqual([{a: true}, {a: true}])
})
