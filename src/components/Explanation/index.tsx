import React from "react";
import {argmax} from "src/argmax";
import FeatureInfoPanelContainer from "../FeatureInfoPanelContainer/index";
import FeatureListVisualizer, {
	Framing,
	LatentContinuousTargetDisplay,
	VisualizationType
} from "../FeatureListVisualizer/index";
import ToulminVisualizer from "../ToulminVisualizer/index";
import styles from "./index.module.scss";
import {ExplanationObject} from "../../IExplanation";


interface MyProps{
	className?: string;
	explanation: ExplanationObject;
	source?: number;

	components?: string[];

	framing?: Framing;
	lct?: LatentContinuousTargetDisplay;
	thresholdBadge?: number;
	thresholdOmit?: number;
	visualization?: VisualizationType;
	interactive?: boolean;
	intercept?: boolean;
	colors?: string[];
	colorNames?: string[];

	/** @deprecated Use `thresholdBadge` instead. */
	threshold?: number;
}

interface MyState{

}

export default class Explanation extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		source: 0,
		components: ["all"],

		framing: "positive",
		lct: "label",
		threshold: -2,
		thresholdBadge: 0,
		thresholdOmit: -1,
		visualization: "badge",
		colors: ["#1f77b4", "#DFE81A", "#FF7F0E"],
		colorNames: ["blue", "yellow", "orange"]
	}

	constructor(p) {
		super(p);
	}

	public render() {

		let framing = this.props.framing;
		let l, c, cc;
		const e = this.props.explanation;
		if (framing == "decision-class"){
			const cls = argmax(e.case.class_proba);
			const mcc = e.data.latent_continuous_target ? e.data.latent_continuous_target.mapping[cls] : 0;
			if (mcc < 0){
				framing = "negative";
				l = e.data.latent_continuous_target.anti_label;
			}else{
				framing = "positive";
				l = e.data.latent_continuous_target.label;
			}
		}else{
			if (framing == "positive"){
				l = e.data.latent_continuous_target.label;
			}else{
				l = e.data.latent_continuous_target.anti_label;
			}
		}
		c = this.props.colorNames[0];
		cc = this.props.colors[0];
		c = c.charAt(0).toUpperCase() + c.slice(1);

		return (<div className={[styles.root, this.props.className].join(' ')}>
			<div className={styles.left}>
				<ToulminVisualizer className={[].join(' ')} explanation={this.props.explanation} components={this.props.components} />
				<div className={styles.framingLabel}>
					<a style={{color: cc}}>{c}</a>
					<a>{`properties contribute towards ${l}.`}</a>
				</div>
				<FeatureListVisualizer className={[].join(' ')}
									   explanation={this.props.explanation}
									   framing={this.props.framing}
									   lct={this.props.lct}
									   threshold={this.props.threshold}
									   thresholdBadge={this.props.thresholdBadge}
									   thresholdOmit={this.props.thresholdOmit}
									   omitIntercept={true}
									   visualization={this.props.visualization}
									   interactive={true}
									   colors={this.props.colors} />
				<div className={styles.regressionLabel}>
					<a>{`${(this.props.explanation.explanation.base*100).toFixed(1)}% of the final prediction can not be explained by these properties.`}</a>
				</div>
			</div>
			<div className={styles.right}>
				<div className={styles.descriptionLabel}>
					<a>Here you can find more information about each property.</a>
				</div>
				<FeatureInfoPanelContainer className={[styles.width100].join(' ')} explanation={this.props.explanation} source={this.props.source} />
				{this.props.thresholdOmit > 0 &&
				<div className={styles.descriptionNoteLabel}>
					<a>{`Note. Some of these properties might be missing from your explanation since they contribute less than ${(this.props.thresholdOmit*100).toFixed(1)}% towards the prediction.`}</a>
				</div>}
			</div>
		</div>);
	}
}