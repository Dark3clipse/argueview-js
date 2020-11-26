import React from "react";
import {argmax} from "src/argmax";
import Badge from "src/components/Badge";
import {Framing, LatentContinuousTargetDisplay} from "src/components/FeatureListVisualizer";
import styles from "src/components/FeatureListVisualizerItem/index.module.scss";
import {ExplanationObject, Feature} from "src/explanation";


interface MyProps{
	className?: string;
	feature: Feature;
	value: number;
	contribution?: number;
	parity?: boolean;
	framing?: Framing;
	explanation: ExplanationObject;
	rationale?: string;
	lct?: LatentContinuousTargetDisplay;
}

interface MyState{
	collapsed: boolean;
}

export default class FeatureListVisualizerItem extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		parity: true,
		contribution: 0,
		framing: "positive",
		lct: "positive",
		rationale: ""
	}


	constructor(p){
		super(p);
		this.state = {
			collapsed: false
		}
	}

	public render() {
		return (<div className={[styles.root, this.props.className, this.props.parity?styles.parity:null].join(' ')} onClick={()=>this.setState({collapsed: !this.state.collapsed})}>
			<div className={styles.top}>
				<div className={styles.contribution}>
					{this.props.contribution != 0 &&
					<Badge contribution={Math.abs(this.props.contribution)} label={this.label()} direction={this.sign()==1?"positive":"negative"} />}
				</div>
				<div className={styles.label}>
					<a className={styles.label}>{this.props.feature.name}</a>
					<a className={styles.stackedValue}>{this.props.feature.nominal_value?this.props.feature.nominal_value[this.props.value]:this.props.value}</a>
				</div>
				<div className={styles.value}>
					<a>{this.props.feature.nominal_value?this.props.feature.nominal_value[this.props.value]:this.props.value}</a>
				</div>
			</div>
			<div className={[styles.bottom, !this.state.collapsed?styles.hidden:null].join(' ')}>
				{this.props.rationale && this.props.contribution != 0 &&
				<div className={styles.bottomLine}>
					<div className={styles.bottomLabel}>
						<a className={styles.bold}>{"Rationale:"}</a>
					</div>
					<div>
						<a>{this.props.rationale}</a>
					</div>
				</div>}
				{this.props.feature.description &&
				<div className={styles.bottomLine}>
					<div className={styles.bottomLabel}>
						<a className={styles.bold}>{"Description:"}</a>
					</div>
					<div>
						<a>{this.props.feature.description}</a>
					</div>
				</div>}
			</div>
		</div>);
	}

	public sign(): number{
		const e = this.props.explanation;
		const cls = argmax(e.case.class_proba);
		const mcc = e.data.latent_continuous_target ? e.data.latent_continuous_target[cls] : 0;
		let sign = this.props.contribution / Math.abs(this.props.contribution);
		switch(this.props.framing){
			case "positive":

				// if current decision-class is negative: invert sign
				if (mcc < 0){
					sign *= -1;
				}
				break;

			case "negative":

				// if current decision-class is positive: invert sign
				if (mcc > 0){
					sign *= -1;
				}
				break;

			case "original":
				break;
		}
		return sign;
	}

	public label(): string{
		const e = this.props.explanation;
		const cls = argmax(e.case.class_proba);

		// compute signed contribution
		const c = Math.abs(this.props.contribution) * this.sign();

		// determine labels
		if (this.props.lct == "none"){
			return c > 0 ? "positive" : "negative";
		}else{
			if (this.props.lct == "positive"){
				return e.data.latent_continuous_target.label;
			}else{
				return e.data.latent_continuous_target.anti_label;
			}
		}
	}
}