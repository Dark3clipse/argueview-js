import React from "react";
import FeatureInfoPanel from "../FeatureInfoPanel/index";
import styles from "./index.module.scss";
import {ExplanationObject} from "../../IExplanation";


interface MyProps{
	className?: string;
	explanation: ExplanationObject;
	source?: number;
}

interface MyState{

}

export default class FeatureInfoPanelContainer extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		source: 0
	}

	constructor(p){
		super(p);
	}

	public render() {


		// prepare
		const explanation: ExplanationObject = JSON.parse(JSON.stringify(this.props.explanation));
		let features = explanation.data.sources[this.props.source].features;

		// remove class feature is exists
		features = features.filter((f)=>{
			return f.name != "class";
		});

		const items = [];
		for (let i=0; i<features.length; i++){
			items.push(<FeatureInfoPanel explanation={this.props.explanation} feature={features[i]} key={`item-${i}`} parity={false} />);
		}

		// render
		return (<div className={[styles.root, this.props.className].join(' ')}>
			{items}
		</div>);
	}
}