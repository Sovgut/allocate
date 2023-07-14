import {isEmpty} from "./index";

test("It should return 'true' when input is an empty string", () => {
    expect(isEmpty("")).toEqual(true);
})

test("It should return 'true' when input is 'undefined'", () => {
    expect(isEmpty(undefined)).toEqual(true);
})

test("It should return 'false' when input is a non-empty string", () => {
    expect(isEmpty("test")).toEqual(false);
})