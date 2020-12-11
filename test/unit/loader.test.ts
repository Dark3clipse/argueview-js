import {expect, it} from "@jest/globals";
import * as React from "react";
import {ToulminVisualizer, FeatureListVisualizer} from "./../../src/loader";


function isClassComponent(component) {
	return (
		typeof component === 'function' &&
		!!component.prototype.isReactComponent
	)
}
function isFunctionComponent(component) {
	return (
		typeof component === 'function' &&
		String(component).includes('return React.createElement')
	)
}
function isReactComponent(component) {
	return (
		isClassComponent(component) ||
		isFunctionComponent(component)
	)
}
function isElement(element) {
	return React.isValidElement(element);
}

it("should export React component ToulminVisualizer", () => {
	expect(isReactComponent(ToulminVisualizer)).toBe(true);
});

it("should export React component FeatureListVisualizer", () => {
	expect(isReactComponent(FeatureListVisualizer)).toBe(true);
});