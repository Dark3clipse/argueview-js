import React, {DOMElement, ReactElement} from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {afterEach, beforeEach, expect, it} from "@jest/globals";
import FeatureListVisualizer from "../../src/components/FeatureListVisualizer";
import {ExplanationObject} from "../../src/IExplanation";
import explanation from "../explanation.json";
import explanationNegative from "../explanation_negative.json";
import explanationExceptions from "../explanation_exceptions.json";
import ReactTestUtils from 'react-dom/test-utils';


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

class BadgeExpectation{
	sign: "-" | "+" | "neutral";
	label: "" | "applicability" | "inapplicability";
	color: "green" | "red" | "blue";
}
const badgeExpectation = (classLabel: string, framing: string, lct: string, featureDirection: string): BadgeExpectation => {
	const e = new BadgeExpectation();

	// label
	switch(lct){
		case "none":
			e.label = "";
			break;
		case "label":
			e.label = "applicability";
			break;
		case "anti-label":
			e.label = "inapplicability";
			break;
	}

	// sign
	if ((classLabel == "applicable" 	&& ((featureDirection == "+applicable" && lct != "anti-label") 	|| (featureDirection == "-applicable" && lct == "anti-label"))) ||
		(classLabel == "inapplicable" 	&& ((featureDirection == "+applicable" && lct == "label") 		|| (featureDirection == "-applicable" && lct != "label"))) ||
		(classLabel == "exceptions"	&& (featureDirection == "+applicable"))){
		e.sign = "+";
	}else if (featureDirection!="neutral"){
		e.sign = "-";
	}else{
		e.sign = "neutral";
	}

	// color
	if ((classLabel == "applicable" 	&& ((featureDirection == "+applicable" && framing != "negative") || (featureDirection == "-applicable" && framing == "negative"))) ||
		(classLabel == "inapplicable" 	&& ((featureDirection == "+applicable" && framing == "positive") || (featureDirection == "-applicable" && framing != "positive"))) ||
		(classLabel == "exceptions"	&& (featureDirection == "+applicable"))){
		e.color = "green";
	}else if (featureDirection!="neutral"){
		e.color = "red";
	}else{
		e.color = "blue";
	}

	return e;
}

const classLabels = ["applicable", "inapplicable", "exceptions"];
const framing = ["decision-class", "positive", "negative"];
const lct = ["none", "label", "anti-label"];
const featureDirection = ["+applicable", "-applicable", "neutral"];
for (let c of classLabels){
	for (let d of featureDirection){
		for (let l of lct){
			for (let f of framing){
				const e = badgeExpectation(c, f, l, d);
				const exp = c=="exceptions"?explanationExceptions:(c=="applicable"?explanation:explanationNegative);

				if (c=="exceptions" && l != "none"){

					// test errors
					for (let vis of ["badge", "bar"]){
						it("should show an error when explanation has no lct but lct labels are requested", ()=> {
							// render component
							act(() => {
								render(<FeatureListVisualizer explanation={exp as ExplanationObject} framing={f as any} lct={l as any} visualization={vis as any} />, container);
							});
							expect(container.textContent).toBe("Cannot render with a latent continuous target: not defined in explanation.If this explanation was created in Python, make sure you call ArgueView.latent_continuous_target() prior to saving your explanation.");
						});
					}

				}else{

					// test badge
					it(`renders badge '${e.sign}${e.label} (${e.color})' given: class='${c}', feature: '${d}', lct: '${l}', framing: '${f}'`, ()=>{
						act(() => {
							render(<FeatureListVisualizer explanation={exp as ExplanationObject} framing={f as any} lct={l as any} visualization={"badge"} thresholdBadge={-1} />, container);
						});

						// obtain badge label
						let lbl;
						if (c=="applicable" || c=="exceptions"){
							if (d == "+applicable"){
								lbl = container.firstChild.children[1].firstChild.firstChild.firstChild; // use feature 'checking_status'
							}else if (d == "-applicable"){
								lbl = container.firstChild.children[8].firstChild.firstChild.firstChild; // use feature 'installment_commitment'
							}else{
								lbl = container.firstChild.children[14].firstChild.firstChild.firstChild; // use feature 'other_payment_plans'
							}
						}else{
							if (d == "+applicable"){
								lbl = container.firstChild.children[1].firstChild.firstChild.firstChild; // use feature 'checking_status'
							}else if (d == "-applicable"){
								lbl = container.firstChild.children[2].firstChild.firstChild.firstChild; // use feature 'duration'
							}else{
								lbl = container.firstChild.children[14].firstChild.firstChild.firstChild; // use feature 'other_payment_plans'
							}
						}

						// test badge label color
						let cl = "neutral";
						switch(e.color){
							case "green": cl = "positive"; break;
							case "red": cl = "negative"; break;
						}
						expect(lbl.classList.contains(cl)).toBe(true);

						// test badge label sign
						if (d != "neutral") {
							expect(lbl.textContent.charAt(0)).toBe(e.sign);
						}

						// test badge label text
						expect(lbl.textContent.replace(/[\+\-(0-9)\.\%\s]/g, "")).toBe(e.label);
					});

					// test bar
					it(`renders bar '${e.sign}${e.label} (${e.color}, ${e.sign=="+"?"right":"left"})' given: class='${c}', feature: '${d}', lct: '${l}', framing: '${f}'`, ()=>{
						act(() => {
							render(<FeatureListVisualizer explanation={exp as ExplanationObject} framing={f as any} lct={l as any} visualization={"bar"} thresholdBadge={-1} />, container);
						});

						// obtain badge label
						let bar;
						if (c=="applicable" || c=="exceptions"){
							if (d == "+applicable"){
								bar = container.firstChild.children[1].firstChild.firstChild.firstChild; // use feature 'checking_status'
							}else if (d == "-applicable"){
								bar = container.firstChild.children[8].firstChild.firstChild.firstChild; // use feature 'installment_commitment'
							}else{
								bar = container.firstChild.children[14].firstChild.firstChild.firstChild; // use feature 'other_payment_plans'
							}
						}else{
							if (d == "+applicable"){
								bar = container.firstChild.children[1].firstChild.firstChild.firstChild; // use feature 'checking_status'
							}else if (d == "-applicable"){
								bar = container.firstChild.children[2].firstChild.firstChild.firstChild; // use feature 'duration'
							}else{
								bar = container.firstChild.children[14].firstChild.firstChild.firstChild; // use feature 'other_payment_plans'
							}
						}

						// whether the bar is large (text within bar) or small (text outside bar)
						const barSize = bar.children.length == 3 ? "large" : "small";
						const barLeft = (barSize=="large" ? bar.children[0] : bar.children[1]);
						const barRight = (barSize=="large" ? bar.children[2] : bar.children[3]);
						const barDirection = (barLeft.style.visibility == "visible" ? "left" : "right");
						const barActive = barDirection == "left" ? barLeft : barRight;
						const barText = bar.children[0].textContent;

						// test bar direction
						if (d != "neutral"){
							expect(barDirection).toBe(e.sign=="-"?"left":"right");
						}

						// test bar color
						let cl = "neutral";
						switch(e.color){
							case "green": cl = "positive"; break;
							case "red": cl = "negative"; break;
						}
						expect(barActive.classList.contains(cl)).toBe(true);

						// test bar label sign
						if (d != "neutral") {
							expect(barText.charAt(0)).toBe(e.sign);

							// test badge label text
							expect(barText.replace(/[\+\-(0-9)\.\%\s]/g, "")).toBe(e.label);
						}
					});
				}
			}
		}
	}
}

const thresholdBadge = [-1, 0, 0.01, 0.03, 0.1];
const thresholdBadgeExpectationsApplicable = [21, 20, 5, 3, 1];
const thresholdBadgeExpectationsInapplicable = [21, 20, 5, 3, 1];
const thresholdOmit = [-1, 0.001, 0.003, 0.007];
const thresholdOmitExpectationsApplicable = [22, 18, 12, 6];
const thresholdOmitExpectationsInapplicable = [22, 16, 11, 6];
for (let i=0; i<thresholdBadge.length; i++) {
	const tb = thresholdBadge[i];
	for (let j=0; j<thresholdOmit.length; j++) {
		const to = thresholdOmit[j];
		if (tb > 0 && to != -1) continue;
		it(`renders with: thresholdBadge=${tb}, thresholdOmit=${to}`, () => {
			for (let c of classLabels) {
				for (let d of featureDirection) {
					for (let l of lct) {
						for (let f of framing) {
							for (let vis of ["badge", "bar"]) {

								const test = ()=>{
									// test #n of items -> omit thresholds
									expect(container.firstChild.children.length).toBe((c == "applicable" || c == "exceptions") ? thresholdOmitExpectationsApplicable[j] : thresholdOmitExpectationsInapplicable[j]);

									// test #n of badges
									if (to == -1 && vis!="bar") {
										const expectedPercentSymbols = ((c == "applicable" || c == "exceptions") ? thresholdBadgeExpectationsApplicable[i] : thresholdBadgeExpectationsInapplicable[i]) * (vis=="bar"?2:1);
										expect((container.textContent.match(/%/g) || []).length).toBe(expectedPercentSymbols);
									}
								}

								act(() => {
									render(<FeatureListVisualizer
										explanation={((c == "applicable" || c == "exceptions") ? explanation : explanationNegative) as ExplanationObject}
										framing={f as any} lct={l as any} visualization={vis as any} thresholdBadge={tb}
										thresholdOmit={to}/>, container);
								});
								test();

								// test old syntax
								if (to == -1){
									act(() => {
										render(<FeatureListVisualizer
											explanation={((c == "applicable" || c == "exceptions") ? explanation : explanationNegative) as ExplanationObject}
											framing={f as any} lct={l as any} visualization={vis as any} threshold={tb} />, container);
									});
									test();
								}
							}
						}
					}
				}
			}
		});
	}
}

it("should sort on header click", ()=>{

	// render component
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"decision-class"} lct={"none"} thresholdBadge={0} />, container);
	});

	// obtain header element
	const hContribution = (c): any => c.firstChild.firstChild.firstChild;
	const hName = (c): any => c.firstChild.children[0].children[1];

	// function for testing badge framing
	const testLabels = (c, reversed = false): any => {
		const r1 = reversed?'negative':'positive';
		const r2 = reversed?'positive':'negative';
		for(let i=0; i<(reversed?9:11); i++){
			expect(c.firstChild.children[i+1].firstChild.firstChild.firstChild.classList.contains(r1)).toBe(true);
		}
		for(let i=(reversed?10:12); i<21; i++){
			expect(c.firstChild.children[i+1].firstChild.firstChild.firstChild.classList.contains(r2)).toBe(true);
		}
	}


	// functions for alphabetical testing
	const testAlphabeticalOrderFunction = (direction: "asc" | "desc", a: string, b: string) => {
		return (direction == "asc"?1:-1) * (a.localeCompare(b) ? 1:-1);
	};
	const testAlphabeticalOrder = (direction: "asc" | "desc")=>{
		let prev = "";
		for(let i=0; i<21; i++){
			const lbl = container.firstChild.children[i+1].firstChild.children[1].textContent;
			if (i!=0){
				expect(testAlphabeticalOrderFunction(direction, lbl, prev)).toBe((direction == "asc"?1:-1));
			}
			prev = lbl;
		}
	}

	// click contribution header
	act(()=>{
		//hContribution(container).dispatchEvent(new MouseEvent("click"));
		ReactTestUtils.Simulate.click(hContribution(container));
	});
	//expect(container.textContent).toBe("");
	testLabels(container, false);
	act(()=>{
		//hContribution(container).dispatchEvent(new MouseEvent("click"));
		ReactTestUtils.Simulate.click(hContribution(container));
	});
	testLabels(container, true);


	// click name header
	act(()=>{
		ReactTestUtils.Simulate.click(hName(container));
	});
	testAlphabeticalOrder("asc");
	act(()=>{
		ReactTestUtils.Simulate.click(hName(container));
	});
	testAlphabeticalOrder("desc");
});


it("should expand and collapse on feature click", ()=>{

	// render component
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"decision-class"} lct={"none"} />, container);
	});

	// obtain first feature element
	const feature = container.firstChild.children[1];

	// expect collapsed
	expect(feature.children[1].classList.contains("hidden")).toBe(true);

	// click feature
	act(()=>{
		ReactTestUtils.Simulate.click(feature);
	});
	expect(feature.children[1].classList.contains("hidden")).toBe(false);

	// click feature again
	act(()=>{
		ReactTestUtils.Simulate.click(feature);
	});
	expect(feature.children[1].classList.contains("hidden")).toBe(true);
});

it("should alternate row colors", ()=>{

	// render component
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"decision-class"} lct={"none"} />, container);
	});

	for(let i=1; i<21; i++){
		const row = container.firstChild.children[i];
		expect(row.classList.contains("parity")).toBe((i-1)%2==0);
	}
});