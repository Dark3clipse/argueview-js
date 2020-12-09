import React from "react";
import styles from "./../FeatureListVisualizer/index.module.scss";
import FeatureListVisualizerHeader from "./../FeatureListVisualizerHeader";
import FeatureListVisualizerItem from "./../FeatureListVisualizerItem";
import {Attack, ExplanationObject, Feature, Support} from "./../../explanation";


export type SortBy = "index" | "contribution" | "name";
export type SortDirection = "asc" | "desc";
export type Framing = "original" | "positive" | "negative";
export type LatentContinuousTargetDisplay = "none" | "label" | "anti-label";

interface MyProps{
	className?: string;
	explanation: ExplanationObject;
	source?: number;
	framing?: Framing;
	lct?: LatentContinuousTargetDisplay;
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
		threshold: 0
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

	public render() {

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
		(icp > 0 ? explanation.explanation.support : explanation.explanation.attack).push({
			source: this.props.source,
			feature: icp_index,
			contribution: icp,
			value: this.interceptValue(Math.sign(icp))
		});

		// sort features
		let sortFunction: (a: Feature, b: Feature) => number;
		switch(this.state.sort){
			default:
			case "index":
				sortFunction = (a, b) => {
					return (this.state.sortDirection == "asc"?1:-1) * (a.index - b.index);
				};
				break;
			case "contribution":
				sortFunction = (a, b) => {
					const ac = this.findContribution(explanation, a)?.contribution || 0;
					const bc = this.findContribution(explanation, b)?.contribution || 0;
					const v = (bc - ac);
					//console.log(`A: index=${a.index} contribution=${ac}  B: index=${b.index} contribution=${bc}  R: v=${v}`);
					return (this.state.sortDirection == "asc"?1:-1) * v;
				};
				break;
			case "name":
				sortFunction = (a, b) => {
					return (this.state.sortDirection == "asc"?1:-1) * (a.name > b.name ? 1:-1);
				};
				break;
		}
		features.sort(sortFunction);

		// generate feature list
		for (let i=0; i<features.length; i++){
			const f = features[i];
			if (typeof values[f.index] === "undefined"){
				continue;
			}
			const v = values[f.index].value;
			const c = this.findContribution(explanation, f);
			let contribution = 0;
			if (c?.contribution && Math.abs(c.contribution) >= this.props.threshold){
				contribution = c.contribution;
			}
			items.push(<FeatureListVisualizerItem key={`item-${i}`} explanation={explanation} framing={this.props.framing} lct={this.props.lct} feature={f} value={v} contribution={contribution} rationale={c?.value} parity={i%2==0} />)
		}

		// render
		return (<div className={[styles.root, this.props.className].join(' ')}>
			<FeatureListVisualizerHeader sort={this.state.sort} sortDirection={this.state.sortDirection} update={this.update} />
			{items}
		</div>);
	}

	private update = (sort: SortBy, sortDirection: SortDirection) => {
		this.setState({
			sort: sort,
			sortDirection: sortDirection
		});
	}

	private interceptValue(sign: number): string{
		return `The intercept's contribution is the contribution independent of the other features.`;
	}
}