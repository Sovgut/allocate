import { describe, expect, it } from "vitest";
import {isEmpty} from "@/utils/is-empty";

describe("isEmpty()", () => {
    it("It should return 'true' when input is an empty string", () => {
        expect(isEmpty("")).toEqual(true);
    })

    it("It should return 'true' when input is 'undefined'", () => {
        expect(isEmpty(undefined)).toEqual(true);
    })

    it("It should return 'false' when input is a non-empty string", () => {
        expect(isEmpty("test")).toEqual(false);
    })
})