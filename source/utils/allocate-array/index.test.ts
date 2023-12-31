import {allocateArray} from "./index";

test("allocateArray function should replace keys in each object of the input array according to the provided mapping", () => {
    expect(allocateArray([{_a: true}, {_a: true}], ["_a", "a"])).toEqual([{a: true}, {a: true}])
    expect(allocateArray([{_a: {__b: true}}, {_a: {__b: true}}], ["_a.__b", "a.b"])).toEqual([{a: {b: true}}, {a: {b: true}}])
})