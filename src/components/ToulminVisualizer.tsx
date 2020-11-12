import React from "react";
import styles from "./ToulminVisualizer.module.scss";


interface MyProps{
	className?: string
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

	public render() {
		return (<div className={[styles.root, this.props.className].join(' ')}>
			{"Hello World!"}
		</div>);
	}
}