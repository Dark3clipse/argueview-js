import React from "react";
import {argmax} from "./../../argmax";
import Badge, {BadgeDirection} from "./../Badge";
import {Framing, LatentContinuousTargetDisplay} from "./../FeatureListVisualizer";
import styles from "./../FeatureListVisualizerItem/index.module.scss";
import {ExplanationObject, Feature} from "../../IExplanation";


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
		lct: "label",
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
					<Badge className={styles.badge} contribution={Math.abs(this.props.contribution)} label={this.label()} sign={this.sign()} framing={this.framing()} />}
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

	/**Determine the direction the original explanation is framed in.
	 * @returns {BadgeDirection} */
	private framing_global_default(): BadgeDirection{
		let g: BadgeDirection;
		const e = this.props.explanation;
		const cls = argmax(e.case.class_proba);
		const mcc = e.data.latent_continuous_target ? e.data.latent_continuous_target.mapping[cls] : 0;
		if (mcc > 0){
			g = "positive";
		}else{
			g = "negative";
		}
		return g;
	}

	/**Determine the direction the explanation should be framed in.
	 * @returns {BadgeDirection} */
	private framing_global_target(): BadgeDirection{
		let g: BadgeDirection;
		if (this.props.framing != "original"){
			g = this.props.framing;
		}else{
			const e = this.props.explanation;
			g = this.framing_global_default();
		}
		return g;
	}

	/**Determine the direction this item should be framed in.
	 * @returns {BadgeDirection} */
	public framing(): BadgeDirection{
		const should = this.framing_global_target();
		const is = this.framing_global_default();
		let r: BadgeDirection = is;

		// flip function
		const flip = ()=>{
			if (r == "positive"){
				r = "negative";
			}else{
				r = "positive";
			}
		}

		if (is != should){
			flip();
		}

		if (this.sign()==-1){
			flip();
		}

		if (this.props.lct=="anti-label"){
			flip();
		}

		return r;
	}

	/**Compute sign of this item based on the framing and lct.
	 * @returns {number} `1` or `-1`. */
	public sign(): number{
		let sign = this.props.contribution / Math.abs(this.props.contribution);

		if (this.props.lct == "anti-label"){
			// signs must be reversed because we frame according to anti-labels.
			sign *= -1;
		}

		return sign;
	}

	public label(): string{
		const e = this.props.explanation;

		// compute signed contribution
		const c = Math.abs(this.props.contribution) * this.sign();

		// determine labels
		if (this.props.lct == "none"){
			return c > 0 ? "positive" : "negative";
		}else{
			if (this.props.lct == "label"){
				return e.data.latent_continuous_target.label;
			}else{
				return e.data.latent_continuous_target.anti_label;
			}
		}
	}
}