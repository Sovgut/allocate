import {allocateObject} from "./index";

test("allocateObject function should replace the keys in the input object based on provided mappings", () => {
    expect(allocateObject({_a: true}, ["_a", "a"], ["", ""])).toEqual({a: true})
    expect(allocateObject({_a: {__b: true}}, ["_a", "a"], ["__b", "b"])).toEqual({a: {b: true}})
    expect(allocateObject({a: {_b: true}}, ["a", "a"], ["_b", "b"])).toEqual({a: {b: true}})
    expect(allocateObject({_a: {b: true}}, ["_a", "a"], ["b", "b"])).toEqual({a: {b: true}})
    expect(allocateObject({_a: {__b: {___c: true}}}, ["_a", "a"], ["__b.___c", "b.c"])).toEqual({a: {b: {c: true}}})
    expect(allocateObject({a: {_b: {__c: true}}}, ["a", "a"], ["_b.__c", "b.c"])).toEqual({a: {b: {c: true}}})
    expect(allocateObject({_a: {b: {__c: true}}}, ["_a", "a"], ["b.__c", "b.c"])).toEqual({a: {b: {c: true}}})
    expect(allocateObject({_a: {__b: {c: true}}}, ["_a", "a"], ["__b.c", "b.c"])).toEqual({a: {b: {c: true}}})
})