import React, {DOMElement, ReactElement} from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {afterEach, beforeEach, expect, it} from "@jest/globals";
import FeatureListVisualizer from "../../src/components/FeatureListVisualizer";
import {ExplanationObject} from "../../src/IExplanation";
import explanation from "../explanation.json";
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

it("renders with varying framing, lct, and thresholds", () => {

	// predefined expected results
	const rPosNone = "ContributionPropertyValue+8.09% positivechecking_statusno checkingno checkingRationale:You have a sufficient amount on your checking account.Description:Status of existing checking account, in Deutsche Mark.+0.39% positiveduration2424Rationale:We believe the duration of the credit is appropriate.Description:Duration in months+0.01% positivecredit_historydelayed previouslydelayed previouslyRationale:Your credit history gives us confidence in your capabilities.Description:Credit history (credits taken, paid back duly, delays, critical accounts)+0.08% positivepurposefurniture/equipmentfurniture/equipmentRationale:We are interested in providing loans for the purpose of buying a radio or tv.Description:Purpose of the credit (car, television,...)+0.42% positivecredit_amount13761376Rationale:Your credit amount gives us confidence in your capabilities.Description:Credit amount+5.11% positivesavings_status<100<100Rationale:Your savings give us confidence in your capabilities.Description:Status of savings account/bonds, in Deutsche Mark.+0.14% positiveemployment>=7>=7Rationale:The duration of your current employment gives us confidence in your capabilities.Description:Present employment, in number of years.-0.13% negativeinstallment_commitment44Rationale:With the requested loan included, your installment rate is below the threshold.Description:Installment rate in percentage of disposable income-0.10% negativepersonal_statusfemale singlefemale singleRationale:We have more confidence in providing loans to females in general.Description:Personal status (married, single,...) and sex-0.46% negativeother_partiesco applicantco applicantRationale:The lack of a co-applicant or guarantor gives us confidence in your capabilities.Description:Other debtors / guarantors-0.10% negativeresidence_since11Rationale:The duration of your current residence gives us confidence in your capabilities.Description:Present residence since X years-1.88% negativeproperty_magnitudeno known propertyno known propertyRationale:The fact that you own a car gives us confidence in your capabilities.Description:Property (e.g. real estate)-0.28% negativeage2828Rationale:Your age gives us confidence in your capabilities.Description:Age in yearsother_payment_plansstoresstoresDescription:Other installment plans (banks, stores)+0.37% positivehousingownownRationale:Living in owned housing increases the confidence we have in your capabilities.Description:Housing (rent, own,...)+0.29% positiveexisting_credits11Rationale:The amount of your credits gives us confidence in your capabilities.Description:Number of existing credits at this bank+0.22% positivejobunemp/unskilled non resunemp/unskilled non resRationale:Your current employment responsibilities supports our confidence in your capabilities.Description:Job-0.41% negativenum_dependents11Rationale:The number of people that are liable to provide maintenance for gives us confidence in your capabilities.Description:Number of people being liable to provide maintenance for-0.53% negativeown_telephonenonenoneRationale:The lack of ownership of a telephone gives us confidence in your capabilities.Description:Telephone (yes,no)-1.23% negativeforeign_workernonoRationale:Because you are a foreign worker, we have more confidence in your capabilities.Description:Foreign worker (yes,no)+78.65% positiveintercept0.78654289206541440.7865428920654144Rationale:The intercept's contribution is the contribution independent of the other features.Description:Contribution independent of the features.";
	const rNegNone = "ContributionPropertyValue+8.09% positivechecking_statusno checkingno checkingRationale:You have a sufficient amount on your checking account.Description:Status of existing checking account, in Deutsche Mark.+0.39% positiveduration2424Rationale:We believe the duration of the credit is appropriate.Description:Duration in months+0.01% positivecredit_historydelayed previouslydelayed previouslyRationale:Your credit history gives us confidence in your capabilities.Description:Credit history (credits taken, paid back duly, delays, critical accounts)+0.08% positivepurposefurniture/equipmentfurniture/equipmentRationale:We are interested in providing loans for the purpose of buying a radio or tv.Description:Purpose of the credit (car, television,...)+0.42% positivecredit_amount13761376Rationale:Your credit amount gives us confidence in your capabilities.Description:Credit amount+5.11% positivesavings_status<100<100Rationale:Your savings give us confidence in your capabilities.Description:Status of savings account/bonds, in Deutsche Mark.+0.14% positiveemployment>=7>=7Rationale:The duration of your current employment gives us confidence in your capabilities.Description:Present employment, in number of years.-0.13% negativeinstallment_commitment44Rationale:With the requested loan included, your installment rate is below the threshold.Description:Installment rate in percentage of disposable income-0.10% negativepersonal_statusfemale singlefemale singleRationale:We have more confidence in providing loans to females in general.Description:Personal status (married, single,...) and sex-0.46% negativeother_partiesco applicantco applicantRationale:The lack of a co-applicant or guarantor gives us confidence in your capabilities.Description:Other debtors / guarantors-0.10% negativeresidence_since11Rationale:The duration of your current residence gives us confidence in your capabilities.Description:Present residence since X years-1.88% negativeproperty_magnitudeno known propertyno known propertyRationale:The fact that you own a car gives us confidence in your capabilities.Description:Property (e.g. real estate)-0.28% negativeage2828Rationale:Your age gives us confidence in your capabilities.Description:Age in yearsother_payment_plansstoresstoresDescription:Other installment plans (banks, stores)+0.37% positivehousingownownRationale:Living in owned housing increases the confidence we have in your capabilities.Description:Housing (rent, own,...)+0.29% positiveexisting_credits11Rationale:The amount of your credits gives us confidence in your capabilities.Description:Number of existing credits at this bank+0.22% positivejobunemp/unskilled non resunemp/unskilled non resRationale:Your current employment responsibilities supports our confidence in your capabilities.Description:Job-0.41% negativenum_dependents11Rationale:The number of people that are liable to provide maintenance for gives us confidence in your capabilities.Description:Number of people being liable to provide maintenance for-0.53% negativeown_telephonenonenoneRationale:The lack of ownership of a telephone gives us confidence in your capabilities.Description:Telephone (yes,no)-1.23% negativeforeign_workernonoRationale:Because you are a foreign worker, we have more confidence in your capabilities.Description:Foreign worker (yes,no)+78.65% positiveintercept0.78654289206541440.7865428920654144Rationale:The intercept's contribution is the contribution independent of the other features.Description:Contribution independent of the features.";
	const rPosLbl = "ContributionPropertyValue+8.09% applicabilitychecking_statusno checkingno checkingRationale:You have a sufficient amount on your checking account.Description:Status of existing checking account, in Deutsche Mark.+0.39% applicabilityduration2424Rationale:We believe the duration of the credit is appropriate.Description:Duration in months+0.01% applicabilitycredit_historydelayed previouslydelayed previouslyRationale:Your credit history gives us confidence in your capabilities.Description:Credit history (credits taken, paid back duly, delays, critical accounts)+0.08% applicabilitypurposefurniture/equipmentfurniture/equipmentRationale:We are interested in providing loans for the purpose of buying a radio or tv.Description:Purpose of the credit (car, television,...)+0.42% applicabilitycredit_amount13761376Rationale:Your credit amount gives us confidence in your capabilities.Description:Credit amount+5.11% applicabilitysavings_status<100<100Rationale:Your savings give us confidence in your capabilities.Description:Status of savings account/bonds, in Deutsche Mark.+0.14% applicabilityemployment>=7>=7Rationale:The duration of your current employment gives us confidence in your capabilities.Description:Present employment, in number of years.-0.13% applicabilityinstallment_commitment44Rationale:With the requested loan included, your installment rate is below the threshold.Description:Installment rate in percentage of disposable income-0.10% applicabilitypersonal_statusfemale singlefemale singleRationale:We have more confidence in providing loans to females in general.Description:Personal status (married, single,...) and sex-0.46% applicabilityother_partiesco applicantco applicantRationale:The lack of a co-applicant or guarantor gives us confidence in your capabilities.Description:Other debtors / guarantors-0.10% applicabilityresidence_since11Rationale:The duration of your current residence gives us confidence in your capabilities.Description:Present residence since X years-1.88% applicabilityproperty_magnitudeno known propertyno known propertyRationale:The fact that you own a car gives us confidence in your capabilities.Description:Property (e.g. real estate)-0.28% applicabilityage2828Rationale:Your age gives us confidence in your capabilities.Description:Age in yearsother_payment_plansstoresstoresDescription:Other installment plans (banks, stores)+0.37% applicabilityhousingownownRationale:Living in owned housing increases the confidence we have in your capabilities.Description:Housing (rent, own,...)+0.29% applicabilityexisting_credits11Rationale:The amount of your credits gives us confidence in your capabilities.Description:Number of existing credits at this bank+0.22% applicabilityjobunemp/unskilled non resunemp/unskilled non resRationale:Your current employment responsibilities supports our confidence in your capabilities.Description:Job-0.41% applicabilitynum_dependents11Rationale:The number of people that are liable to provide maintenance for gives us confidence in your capabilities.Description:Number of people being liable to provide maintenance for-0.53% applicabilityown_telephonenonenoneRationale:The lack of ownership of a telephone gives us confidence in your capabilities.Description:Telephone (yes,no)-1.23% applicabilityforeign_workernonoRationale:Because you are a foreign worker, we have more confidence in your capabilities.Description:Foreign worker (yes,no)+78.65% applicabilityintercept0.78654289206541440.7865428920654144Rationale:The intercept's contribution is the contribution independent of the other features.Description:Contribution independent of the features.";
	const rNegLbl = "ContributionPropertyValue+8.09% applicabilitychecking_statusno checkingno checkingRationale:You have a sufficient amount on your checking account.Description:Status of existing checking account, in Deutsche Mark.+0.39% applicabilityduration2424Rationale:We believe the duration of the credit is appropriate.Description:Duration in months+0.01% applicabilitycredit_historydelayed previouslydelayed previouslyRationale:Your credit history gives us confidence in your capabilities.Description:Credit history (credits taken, paid back duly, delays, critical accounts)+0.08% applicabilitypurposefurniture/equipmentfurniture/equipmentRationale:We are interested in providing loans for the purpose of buying a radio or tv.Description:Purpose of the credit (car, television,...)+0.42% applicabilitycredit_amount13761376Rationale:Your credit amount gives us confidence in your capabilities.Description:Credit amount+5.11% applicabilitysavings_status<100<100Rationale:Your savings give us confidence in your capabilities.Description:Status of savings account/bonds, in Deutsche Mark.+0.14% applicabilityemployment>=7>=7Rationale:The duration of your current employment gives us confidence in your capabilities.Description:Present employment, in number of years.-0.13% applicabilityinstallment_commitment44Rationale:With the requested loan included, your installment rate is below the threshold.Description:Installment rate in percentage of disposable income-0.10% applicabilitypersonal_statusfemale singlefemale singleRationale:We have more confidence in providing loans to females in general.Description:Personal status (married, single,...) and sex-0.46% applicabilityother_partiesco applicantco applicantRationale:The lack of a co-applicant or guarantor gives us confidence in your capabilities.Description:Other debtors / guarantors-0.10% applicabilityresidence_since11Rationale:The duration of your current residence gives us confidence in your capabilities.Description:Present residence since X years-1.88% applicabilityproperty_magnitudeno known propertyno known propertyRationale:The fact that you own a car gives us confidence in your capabilities.Description:Property (e.g. real estate)-0.28% applicabilityage2828Rationale:Your age gives us confidence in your capabilities.Description:Age in yearsother_payment_plansstoresstoresDescription:Other installment plans (banks, stores)+0.37% applicabilityhousingownownRationale:Living in owned housing increases the confidence we have in your capabilities.Description:Housing (rent, own,...)+0.29% applicabilityexisting_credits11Rationale:The amount of your credits gives us confidence in your capabilities.Description:Number of existing credits at this bank+0.22% applicabilityjobunemp/unskilled non resunemp/unskilled non resRationale:Your current employment responsibilities supports our confidence in your capabilities.Description:Job-0.41% applicabilitynum_dependents11Rationale:The number of people that are liable to provide maintenance for gives us confidence in your capabilities.Description:Number of people being liable to provide maintenance for-0.53% applicabilityown_telephonenonenoneRationale:The lack of ownership of a telephone gives us confidence in your capabilities.Description:Telephone (yes,no)-1.23% applicabilityforeign_workernonoRationale:Because you are a foreign worker, we have more confidence in your capabilities.Description:Foreign worker (yes,no)+78.65% applicabilityintercept0.78654289206541440.7865428920654144Rationale:The intercept's contribution is the contribution independent of the other features.Description:Contribution independent of the features.";
	const rPosAlbl = "ContributionPropertyValue-8.09% inapplicabilitychecking_statusno checkingno checkingRationale:You have a sufficient amount on your checking account.Description:Status of existing checking account, in Deutsche Mark.-0.39% inapplicabilityduration2424Rationale:We believe the duration of the credit is appropriate.Description:Duration in months-0.01% inapplicabilitycredit_historydelayed previouslydelayed previouslyRationale:Your credit history gives us confidence in your capabilities.Description:Credit history (credits taken, paid back duly, delays, critical accounts)-0.08% inapplicabilitypurposefurniture/equipmentfurniture/equipmentRationale:We are interested in providing loans for the purpose of buying a radio or tv.Description:Purpose of the credit (car, television,...)-0.42% inapplicabilitycredit_amount13761376Rationale:Your credit amount gives us confidence in your capabilities.Description:Credit amount-5.11% inapplicabilitysavings_status<100<100Rationale:Your savings give us confidence in your capabilities.Description:Status of savings account/bonds, in Deutsche Mark.-0.14% inapplicabilityemployment>=7>=7Rationale:The duration of your current employment gives us confidence in your capabilities.Description:Present employment, in number of years.+0.13% inapplicabilityinstallment_commitment44Rationale:With the requested loan included, your installment rate is below the threshold.Description:Installment rate in percentage of disposable income+0.10% inapplicabilitypersonal_statusfemale singlefemale singleRationale:We have more confidence in providing loans to females in general.Description:Personal status (married, single,...) and sex+0.46% inapplicabilityother_partiesco applicantco applicantRationale:The lack of a co-applicant or guarantor gives us confidence in your capabilities.Description:Other debtors / guarantors+0.10% inapplicabilityresidence_since11Rationale:The duration of your current residence gives us confidence in your capabilities.Description:Present residence since X years+1.88% inapplicabilityproperty_magnitudeno known propertyno known propertyRationale:The fact that you own a car gives us confidence in your capabilities.Description:Property (e.g. real estate)+0.28% inapplicabilityage2828Rationale:Your age gives us confidence in your capabilities.Description:Age in yearsother_payment_plansstoresstoresDescription:Other installment plans (banks, stores)-0.37% inapplicabilityhousingownownRationale:Living in owned housing increases the confidence we have in your capabilities.Description:Housing (rent, own,...)-0.29% inapplicabilityexisting_credits11Rationale:The amount of your credits gives us confidence in your capabilities.Description:Number of existing credits at this bank-0.22% inapplicabilityjobunemp/unskilled non resunemp/unskilled non resRationale:Your current employment responsibilities supports our confidence in your capabilities.Description:Job+0.41% inapplicabilitynum_dependents11Rationale:The number of people that are liable to provide maintenance for gives us confidence in your capabilities.Description:Number of people being liable to provide maintenance for+0.53% inapplicabilityown_telephonenonenoneRationale:The lack of ownership of a telephone gives us confidence in your capabilities.Description:Telephone (yes,no)+1.23% inapplicabilityforeign_workernonoRationale:Because you are a foreign worker, we have more confidence in your capabilities.Description:Foreign worker (yes,no)-78.65% inapplicabilityintercept0.78654289206541440.7865428920654144Rationale:The intercept's contribution is the contribution independent of the other features.Description:Contribution independent of the features.";
	const rNegAlbl = "ContributionPropertyValue-8.09% inapplicabilitychecking_statusno checkingno checkingRationale:You have a sufficient amount on your checking account.Description:Status of existing checking account, in Deutsche Mark.-0.39% inapplicabilityduration2424Rationale:We believe the duration of the credit is appropriate.Description:Duration in months-0.01% inapplicabilitycredit_historydelayed previouslydelayed previouslyRationale:Your credit history gives us confidence in your capabilities.Description:Credit history (credits taken, paid back duly, delays, critical accounts)-0.08% inapplicabilitypurposefurniture/equipmentfurniture/equipmentRationale:We are interested in providing loans for the purpose of buying a radio or tv.Description:Purpose of the credit (car, television,...)-0.42% inapplicabilitycredit_amount13761376Rationale:Your credit amount gives us confidence in your capabilities.Description:Credit amount-5.11% inapplicabilitysavings_status<100<100Rationale:Your savings give us confidence in your capabilities.Description:Status of savings account/bonds, in Deutsche Mark.-0.14% inapplicabilityemployment>=7>=7Rationale:The duration of your current employment gives us confidence in your capabilities.Description:Present employment, in number of years.+0.13% inapplicabilityinstallment_commitment44Rationale:With the requested loan included, your installment rate is below the threshold.Description:Installment rate in percentage of disposable income+0.10% inapplicabilitypersonal_statusfemale singlefemale singleRationale:We have more confidence in providing loans to females in general.Description:Personal status (married, single,...) and sex+0.46% inapplicabilityother_partiesco applicantco applicantRationale:The lack of a co-applicant or guarantor gives us confidence in your capabilities.Description:Other debtors / guarantors+0.10% inapplicabilityresidence_since11Rationale:The duration of your current residence gives us confidence in your capabilities.Description:Present residence since X years+1.88% inapplicabilityproperty_magnitudeno known propertyno known propertyRationale:The fact that you own a car gives us confidence in your capabilities.Description:Property (e.g. real estate)+0.28% inapplicabilityage2828Rationale:Your age gives us confidence in your capabilities.Description:Age in yearsother_payment_plansstoresstoresDescription:Other installment plans (banks, stores)-0.37% inapplicabilityhousingownownRationale:Living in owned housing increases the confidence we have in your capabilities.Description:Housing (rent, own,...)-0.29% inapplicabilityexisting_credits11Rationale:The amount of your credits gives us confidence in your capabilities.Description:Number of existing credits at this bank-0.22% inapplicabilityjobunemp/unskilled non resunemp/unskilled non resRationale:Your current employment responsibilities supports our confidence in your capabilities.Description:Job+0.41% inapplicabilitynum_dependents11Rationale:The number of people that are liable to provide maintenance for gives us confidence in your capabilities.Description:Number of people being liable to provide maintenance for+0.53% inapplicabilityown_telephonenonenoneRationale:The lack of ownership of a telephone gives us confidence in your capabilities.Description:Telephone (yes,no)+1.23% inapplicabilityforeign_workernonoRationale:Because you are a foreign worker, we have more confidence in your capabilities.Description:Foreign worker (yes,no)-78.65% inapplicabilityintercept0.78654289206541440.7865428920654144Rationale:The intercept's contribution is the contribution independent of the other features.Description:Contribution independent of the features.";

	// functions for getting label various elements from root
	const lblFirst = (c): any => c.firstChild.children[1].firstChild.firstChild.firstChild; // first label element
	const lblMid = (c): any => c.firstChild.children[8].firstChild.firstChild.firstChild; // label of first reversed item in example
	const lblIcpt = (c): any => c.firstChild.lastChild.firstChild.firstChild.firstChild; // label of intercept

	// function for testing badge framing
	const testLabels = (c, reversed = false): any => {
		const r1 = reversed?'negative':'positive';
		const r2 = reversed?'positive':'negative';
		expect(lblFirst(container).classList.contains(r1)).toBe(true);
		expect(lblMid(container).classList.contains(r2)).toBe(true);
		expect(lblIcpt(container).classList.contains(r1)).toBe(true);
	}

	// lct = none
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"original"} lct={"none"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rPosNone);
	testLabels(container, false);
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"positive"} lct={"none"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rPosNone);
	testLabels(container, false);
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"negative"} lct={"none"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rNegNone);
	testLabels(container, true);


	// lct = label
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"original"} lct={"label"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rPosLbl);
	testLabels(container, false);
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"positive"} lct={"label"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rPosLbl);
	testLabels(container, false);
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"negative"} lct={"label"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rNegLbl);
	testLabels(container, true);


	// lct = anti-label
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"original"} lct={"anti-label"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rPosAlbl);
	testLabels(container, false);
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"positive"} lct={"anti-label"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rPosAlbl);
	testLabels(container, false);
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"negative"} lct={"anti-label"} threshold={0} />, container);
	});
	expect(container.textContent).toBe(rNegAlbl);
	testLabels(container, true);
});

it("should sort on header click", ()=>{

	// render component
	act(() => {
		render(<FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"original"} lct={"none"} threshold={0} />, container);
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