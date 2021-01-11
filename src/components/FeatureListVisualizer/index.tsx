import React from "react";
import ErrorMessage from "./../ErrorMessage";
import styles from "./../FeatureListVisualizer/index.module.scss";
import FeatureListVisualizerHeader from "./../FeatureListVisualizerHeader";
import FeatureListVisualizerItem from "./../FeatureListVisualizerItem";
import {Attack, ExplanationObject, Feature, Support} from "../../IExplanation";
import {LineAwesomeLoader} from "./../../LineAwesomeLoader";


export type SortBy = "index" | "contribution" | "name";
export type SortDirection = "asc" | "desc";
export type Framing = "decision-class" | "positive" | "negative";
export type LatentContinuousTargetDisplay = "none" | "label" | "anti-label";
export type VisualizationType = "badge" | "bar";

interface MyProps{
	className?: string;
	explanation: ExplanationObject;
	source?: number;
	framing?: Framing;
	lct?: LatentContinuousTargetDisplay;
	thresholdBadge?: number;
	thresholdOmit?: number;
	omitIntercept?: boolean;
	visualization?: VisualizationType;

	/** @deprecated Use `thresholdBadge` instead. */
	threshold?: number;
}

interface MyState{
	sort: SortBy;
	sortDirection: SortDirection;
}

export default class FeatureListVisualizer extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		source: 0,
		framing: "positive",
		lct: "label",
		threshold: -2,
		thresholdBadge: 0,
		thresholdOmit: -1,
		omitIntercept: false,
		visualization: "badge"
	}

	constructor(p){
		super(p);
		this.state = {
			sort: "index",
			sortDirection: "asc"
		}
	}

	private findContribution(e: ExplanationObject, f: Feature): Attack | Support{
		return 	e.explanation.support.find((v)=>v.source==this.props.source && v.feature==f.index) ||
				e.explanation.attack.find((v)=>v.source==this.props.source && v.feature==f.index);
	}

	private sortFunctionContribution(explanation: ExplanationObject, dir:string, a: Feature, b: Feature): number {
		const ac = this.findContribution(explanation, a)?.contribution || 0;
		const bc = this.findContribution(explanation, b)?.contribution || 0;
		const v = (bc - ac);
		//console.log(`A: index=${a.index} contribution=${ac}  B: index=${b.index} contribution=${bc}  R: v=${v}`);
		return (dir == "asc"?1:-1) * v;
	};

	public componentDidMount() {
		LineAwesomeLoader();
	}

	public render() {

		// set thresholds based on properties
		let thresholdBadge = this.props.thresholdBadge;
		let thresholdOmit = this.props.thresholdOmit;

		// support old syntax
		if (this.props.threshold != -2){
			thresholdBadge = this.props.threshold;
			thresholdOmit = -1;
		}

		// prepare
		const items = [];
		let explanation: ExplanationObject = JSON.parse(JSON.stringify(this.props.explanation));
		let features = explanation.data.sources[this.props.source].features;
		const values = explanation.case.sources[this.props.source].features;

		// remove class feature is exists
		features = features.filter((f)=>{
			if (f.name == "class"){
				if (values.length > f.index){
					values.splice(f.index, 1);
				}
				return false;
			}
			return true;
		});

		// add virtual feature 'intercept'
		if (!this.props.omitIntercept){
			const icp_index = features.length;
			features.push({
				name: "intercept",
				index: icp_index,
				description: "Contribution independent of the features.",
				nominal_value: null,
				data_type: "numeric",
				number_of_missing_values: 0,
				is_ignore: true,
				is_target: true,
				is_row_identifier: true
			});
			values.push({
				value: explanation.explanation.base
			});
			const icp = explanation.explanation.base;
			explanation.explanation.support.push({
				source: this.props.source,
				feature: icp_index,
				contribution: icp,
				value: FeatureListVisualizer.interceptValue(Math.sign(icp))
			});
		}

		// compute max contribution
		const maxContribution = Math.abs(this.findContribution(explanation, features.sort((a, b) => this.sortFunctionContribution(explanation, "asc", a, b))[0]).contribution);

		// sort features
		let sortFunction: (a: Feature, b: Feature) => number;
		switch(this.state.sort){
			case "index":
				sortFunction = (a, b) =>{
					return (this.state.sortDirection == "asc"?1:-1) * (a.index - b.index);
				};
				break;
			case "contribution":
				sortFunction = (a, b) => this.sortFunctionContribution(explanation, this.state.sortDirection, a, b);
				break;
			case "name":
				sortFunction = (a, b)=>{
					return (this.state.sortDirection == "asc"?1:-1) * (a.name > b.name ? 1:-1);
				}
				break;
		}
		features.sort(sortFunction);

		// generate feature list
		let parity = true;
		for (let i=0; i<features.length; i++){
			const f = features[i];
			if (typeof values[f.index] === "undefined"){
				continue;
			}
			const v = values[f.index].value;
			const c = this.findContribution(explanation, f);
			let contribution = 0;
			if (c?.contribution){
				contribution = c.contribution;
			}
			if (Math.abs(c.contribution) < thresholdOmit && f.name != "intercept"){
				continue;
			}
			items.push(<FeatureListVisualizerItem key={`item-${i}`} explanation={explanation} framing={this.props.framing} lct={this.props.lct} feature={f} value={v} contribution={contribution} maxContribution={maxContribution} thresholdBadge={thresholdBadge} rationale={c?.value} visualization={this.props.visualization} parity={parity} />)
			parity = !parity;
		}

		let error: boolean = false;
		let errorMsg: string = "";
		let errorAdditional: string = "";

		// invalid input
		if (!explanation.data.latent_continuous_target && this.props.lct != "none"){
			error = true;
			errorMsg = "Cannot render with a latent continuous target: not defined in explanation.";
			errorAdditional = "If this explanation was created in Python, make sure you call ArgueView.latent_continuous_target() prior to saving your explanation.";
		}


		// render
		return (<div className={[styles.root, this.props.className].join(' ')}>
			{error &&
			<ErrorMessage className={""} message={errorMsg} additional={errorAdditional} />}

			{!error &&
			<FeatureListVisualizerHeader sort={this.state.sort} sortDirection={this.state.sortDirection} update={this.update} />}

			{!error && items}
		</div>);
	}

	private update = (sort: SortBy, sortDirection: SortDirection) => {
		this.setState({
			sort: sort,
			sortDirection: sortDirection
		});
	}

	private static interceptValue(sign: number): string{
		return `The intercept's contribution is the contribution independent of the other features.`;
	}
}