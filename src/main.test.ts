import { describe, expect, it } from "vitest";
import {allocate} from "@/main";

describe("allocate()", () => {
    it("should map input object keys according to the provided mapping", () => {
        expect(allocate({_a: true}, {"_a": "a"})).toEqual({a: true})
    })

    it("should correctly map nested input object keys according to the provided mapping", () => {
        expect(allocate({_a: {__b: true}}, {"_a.__b": "a.b"})).toEqual({a: {b: true}})
        expect(allocate({a: {_b: true}}, {"a._b": "a.b"})).toEqual({a: {b: true}})
        expect(allocate({_a: {b: true}}, {"_a.b": "a.b"})).toEqual({a: {b: true}})
    })

    it("should correctly map nested array fields according to the provided mapping", () => {
        expect(allocate({_a: [{__b: true}, {__b: true}]}, {"_a.*.__b": "a.*.b"})).toEqual({a: [{b: true}, {b: true}]})
        expect(allocate([{_a: true}, {_a: true}], {"*._a": "*.a"})).toEqual([{a: true}, {a: true}])
    })

    it("should throw an error if one of the argument is incorrect", () => {
        expect(() => allocate({}, undefined as any)).toThrowError("allocate(source, ->schema<-): Invalid schema")
        expect(() => allocate(undefined as any, {})).toThrowError("allocate(->source<-, schema): Invalid source (it is not an object or an array)")
    })
})