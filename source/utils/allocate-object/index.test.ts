import {allocateObject} from "./index";

test("", () => {
    expect(allocateObject({_a: true}, ["_a", "a"], ["", ""])).toEqual({a: true});
})

test("", () => {
    expect(allocateObject({_a: {__b: true}}, ["_a", "a"], ["__b", ""])).toEqual({a: {__b: true}});
})

test("", () => {
    expect(allocateObject({_a: {__b: true}}, ["_a", "a"], ["", "b"])).toEqual({a: {__b: true}});
})

test("", () => {
    expect(allocateObject({_a: {__b: true}}, ["_a", "a"], ["__b", "b"])).toEqual({a: {b: true}});
})