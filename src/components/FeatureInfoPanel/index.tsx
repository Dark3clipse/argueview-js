import React from "react";
import styles from "./index.module.scss";
import {ExplanationObject, Feature} from "../../IExplanation";


interface MyProps{
	className?: string;
	feature: Feature;
	explanation: ExplanationObject;
	parity?: boolean;
}

interface MyState{
	collapsed: boolean;
	hover: boolean;
}


export default class FeatureInfoPanel extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		parity: true
	}


	constructor(p: MyProps | Readonly<MyProps>){
		super(p);
		this.state = {
			collapsed: false,
			hover: false
		}
	}

	public render() {
		return (<div className={[styles.root, this.props.className, this.props.parity?styles.parity:null].join(' ')} onClick={()=>this.setState({collapsed: !this.state.collapsed})} onMouseEnter={()=>this.setState({hover: true})} onMouseLeave={()=>this.setState({hover: false})}>
			<div className={styles.top}>
				<div className={[styles.label, styles.topPadding].join(' ')}>
					<a className={styles.label}>{this.props.feature.name}</a>
				</div>
			</div>
			<div className={[styles.bottom, !this.state.collapsed?styles.hidden:null].join(' ')}>
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
}