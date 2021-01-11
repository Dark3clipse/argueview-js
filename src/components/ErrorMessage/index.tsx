import React from "react";
import {ExclamationTriangleIcon} from "react-line-awesome";
import styles from "./index.module.scss";


export type ErrorLevel = "error" | "warning";

interface MyProps{
	className?: string;
	message: string;
	additional?: string;
	level?: ErrorLevel;
}

interface MyState{

}

export default class ErrorMessage extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: "",
		level: "error"
	}

	public render() {
		return (<div className={[this.props.className, styles.root].join(' ')}>
			<ExclamationTriangleIcon className={styles.icon} />
			<div className={styles.text}>
				<div className={[styles.fontSizeContentMedium, styles.title].join(' ')}>{this.props.message}</div>
				<div className={styles.fontSizeContentIntermediate}>{this.props.additional}</div>
			</div>
		</div>);
	}
}