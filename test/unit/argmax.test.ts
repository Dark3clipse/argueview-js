import {expect, it} from "@jest/globals";
import {argmax, argmin} from "../../src/argmax";

const example = [5, 2, -5, 9, 10, -7];

it("argmax to return argument of largest value within array", () => {
	expect(argmax(example)).toBe(4);
});

it("argmin to return argument of smallest value within array", () => {
	expect(argmin(example)).toBe(5);
});