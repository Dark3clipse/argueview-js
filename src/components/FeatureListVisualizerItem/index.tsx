import React from "react";
import Bar from "./../Bar";
import {argmax} from "./../../argmax";
import Badge, {BadgeDirection} from "./../Badge";
import {Framing, LatentContinuousTargetDisplay, VisualizationType} from "./../FeatureListVisualizer";
import styles from "./../FeatureListVisualizerItem/index.module.scss";
import {ExplanationObject, Feature} from "../../IExplanation";


interface MyProps{
	className?: string;
	feature: Feature;
	value: number;
	contribution?: number;
	maxContribution?: number;
	parity?: boolean;
	framing?: Framing;
	explanation: ExplanationObject;
	rationale?: string;
	lct?: LatentContinuousTargetDisplay;
	visualization?: VisualizationType;
	thresholdBadge: number;
	interactive: boolean;
	colors: string[];
}

interface MyState{
	collapsed: boolean;
	hover: boolean;
}

export interface BadgeData{
	sign?: number;
	label?: string;
	framing?: "positive" | "negative" | "neutral";
}

export default class FeatureListVisualizerItem extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		parity: true,
		contribution: 0,
		maxContribution: 1,
		framing: "positive",
		lct: "label",
		rationale: "",
		visualization: "badge"
	}


	constructor(p: MyProps | Readonly<MyProps>){
		super(p);
		this.state = {
			collapsed: !p.interactive,
			hover: false
		}
	}

	public render() {
		const d = this.badgeData();
		const threshold = (Math.abs(this.props.contribution) > this.props.thresholdBadge);
		return (<div className={[styles.root, this.props.className, this.props.parity?styles.parity:null].join(' ')} onClick={()=>this.setState({collapsed: !this.state.collapsed})} onMouseEnter={()=>this.setState({hover: true})} onMouseLeave={()=>this.setState({hover: false})}>
			<div className={styles.top}>
				<div className={styles.contribution}>
					{this.props.visualization == "badge" && threshold &&
					<Badge className={[styles.visualization, styles.badge].join(' ')} contribution={Math.abs(this.props.contribution)} label={d.label} sign={d.sign} framing={d.framing} colors={this.props.colors} />}
					{this.props.visualization == "bar" &&
					<Bar className={[styles.visualization, styles.bar].join(' ')} contribution={threshold?Math.abs(this.props.contribution):0} maxContribution={this.props.maxContribution} label={d.label} sign={d.sign} framing={d.framing} selected={this.state.collapsed || this.state.hover || !this.props.interactive} colors={this.props.colors}/>}
				</div>
				<div className={[styles.label, styles.topPadding].join(' ')}>
					<a className={styles.label}>{this.props.feature.name}</a>
					<a className={styles.stackedValue}>{this.props.feature.nominal_value?this.props.feature.nominal_value[this.props.value]:this.props.value}</a>
				</div>
				<div className={[styles.value, styles.topPadding].join(' ')}>
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
		}else if (mcc < 0){
			g = "negative";
		}else{
			g = "neutral"
		}
		return g;
	}

	private featureDirection(): "+label" | "-label" | "+decision" | "-decision" | "neutral"{
		const is = this.framing_global_default();

		if (this.props.contribution==0){
			return "neutral";
		}
		if (is == "positive"){ 										// class = applicable -> +contrib = +applicable
			return (this.props.contribution>0?"+label":"-label");
		}else if (is == "negative"){ 								// class = inapplicable -> +contrib = -applicable
			return (this.props.contribution>0?"-label":"+label");
		}else{
			return (this.props.contribution>0?"+decision":"-decision");
		}
	}

	private badgeData(): BadgeData{
		const e = this.props.explanation;
		const r: BadgeData = {};
		const is = this.framing_global_default();
		const d = this.featureDirection();

		// badge label
		switch(this.props.lct){
			case "none":
				r.label = "";
				break;
			case "label":
				r.label = e.data.latent_continuous_target.label;
				break;
			case "anti-label":
				r.label = e.data.latent_continuous_target.anti_label;
				break;
		}

		// sign
		if (((is == "positive" 	&& ((d == "+label" && this.props.lct != "anti-label") 	|| (d == "-label" && this.props.lct == "anti-label"))) ||
			(is == "negative" 	&& ((d == "+label" && this.props.lct == "label") 		|| (d == "-label" && this.props.lct != "label"))) ||
			(is == "neutral"	&& (d == "+decision")))
			&& this.props.contribution != 0){
			r.sign = 1;
		}else if (d!="neutral" && this.props.contribution != 0){
			r.sign = -1;
		}else{
			r.sign = 0;
		}

		// color
		if (((is == "positive" 	&& ((d == "+label" && this.props.framing != "negative") 	|| (d == "-label" && this.props.framing == "negative"))) ||
			(is == "negative" 	&& ((d == "+label" && this.props.framing == "positive") 	|| (d == "-label" && this.props.framing != "positive"))) ||
			(is == "neutral"	&& (d == "+decision")))
			&& this.props.contribution != 0){
			r.framing = "positive";
		}else if (d!="neutral" && this.props.contribution != 0){
			r.framing = "negative";
		}else{
			r.framing = "neutral";
		}

		return r;
	}
}