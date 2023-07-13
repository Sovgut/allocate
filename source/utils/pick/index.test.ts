import {pick} from './';

test("pick function should split the input string at the first occurrence of '.'", () => {
    expect(pick("a.b.c")).toEqual(["a", "b.c"]);
    expect(pick("*.b.c")).toEqual(["*", "b.c"]);
    expect(pick("a.*.c")).toEqual(["a", "*.c"]);
    expect(pick("a.b.*")).toEqual(["a", "b.*"]);
})