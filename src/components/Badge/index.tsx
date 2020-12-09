import React from "react";
import styles from "./../Badge/index.module.scss";


export type BadgeDirection = "positive" | "negative" | "neutral";

interface MyProps{
	className?: string;
	contribution: number;
	label: string;
	framing?: BadgeDirection;
	sign?: number;
}

interface MyState{

}

export default class Badge extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		framing: "neutral",
		sign: 1
	}


	constructor(p){
		super(p);
	}

	public render() {
		return (<div className={[styles.root, this.props.className, styles[this.props.framing]].join(' ')}>
			<a>{this.text()}</a>
		</div>);
	}

	private text(): string{
		let r = '';

		// add sign
		switch(this.props.sign){
			default:
			case 1: r+="+"; break;
			case -1: r+="-"; break;
		}

		// add contribution as percentage
		r += `${(Math.abs(this.props.contribution)*100).toFixed(2)}% `;

		// add label
		r += this.props.label;

		return r;
	}
}