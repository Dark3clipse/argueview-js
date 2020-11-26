import React from "react";
import {argmax} from "src/argmax";
import styles from "src/components/ToulminVisualizer/index.module.scss";
import ToulminVisualizerItem from "src/components/ToulminVisualizerItem";
import {ExplanationObject} from "src/explanation";


interface MyProps{
	className?: string;
	explanation: ExplanationObject;
}

interface MyState{

}

export default class ToulminVisualizer extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: ""
	}


	constructor(p){
		super(p);
	}

	private get qualifier(): string{
		const cls = argmax(this.props.explanation.case.class_proba);
		const proba_decision = this.props.explanation.case.class_proba[cls];
		const proba_uncertain = 1 / this.props.explanation.case.class_proba.length;
		const full_range = 1 - proba_uncertain;
		const pos = proba_decision - proba_uncertain;
		const qualifier = (pos / full_range) * 100;
		return `The class '${this.props.explanation.data.classes[cls]}' is ${qualifier.toFixed(2)}% more certain than the other possible classes.`;
	}

	private get lrat(): string{
		const lrat = this.props.explanation.explanation.support.sort((a, b)=>a.contribution-b.contribution)[0];
		return lrat.value;
	}

	public render() {
		const cls = argmax(this.props.explanation.case.class_proba);
		const clsName = this.props.explanation.data.classes[cls];
		return (<div className={[styles.root, this.props.className].join(' ')}>
			<ToulminVisualizerItem title={"Decision"} value={clsName} />
			<ToulminVisualizerItem title={"Leading rationale"} value={this.lrat} />
			<ToulminVisualizerItem title={"Qualifier"} value={this.qualifier} />
			<ToulminVisualizerItem title={"Backing"} value={this.props.explanation.backing} />
		</div>);
	}
}