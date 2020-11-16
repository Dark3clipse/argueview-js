import React from "react";
import styles from "src/components/ToulminVisualizerItem/index.module.scss";


interface MyProps{
	className?: string;
	title: string;
	value: string;
}

interface MyState{

}

export default class ToulminVisualizerItem extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: ""
	}


	constructor(p){
		super(p);
	}

	public render() {
		return (<div className={[styles.root, this.props.className].join(' ')}>
			<div className={styles.label}>
				<a>{this.props.title}</a>
			</div>
			<div className={styles.value}>
				<a>{this.props.value}</a>
			</div>
		</div>);
	}
}