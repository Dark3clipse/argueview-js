import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {afterEach, beforeEach, expect, it} from "@jest/globals";
import ToulminVisualizer from "../../src/components/ToulminVisualizer";
import {ExplanationObject} from "../../src/IExplanation";
import explanation from "../explanation.json";
import explanationExceptions from "../explanation_exceptions.json";


let container = null;
beforeEach(() => {
	// setup a DOM element as a render target
	container = document.createElement("div");
	document.body.appendChild(container);
});

afterEach(() => {
	// cleanup on exiting
	unmountComponentAtNode(container);
	container.remove();
	container = null;
});

it("renders with backing and grounds", () => {
	act(() => {
		render(<ToulminVisualizer explanation={explanation as ExplanationObject} />, container);
	});
	expect(container.textContent).toBe("DecisionYou are applicable for a loan.Leading rationaleYour credit history gives us confidence in your capabilities.QualifierThe class 'You are applicable for a loan.' is 77.28% more certain than the other possible classes.BackingSupported by Sophia Hadash, MSc from Jheronimus Academy of Data Science.");
});

it("renders without backing and grounds", () => {
	act(() => {
		render(<ToulminVisualizer explanation={explanationExceptions as ExplanationObject} />, container);
	});
	expect(container.textContent).toBe("DecisionYou are applicable for a loan.QualifierThe class 'You are applicable for a loan.' is 77.28% more certain than the other possible classes.");
});