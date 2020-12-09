import React from "react";
import {SortDownIcon, SortUpIcon} from "react-line-awesome";
import {SortBy, SortDirection} from "./../FeatureListVisualizer";
import styles from "./../FeatureListVisualizerHeader/index.module.scss";
import {LineAwesomeLoader} from "./../../LineAwesomeLoader";


interface MyProps{
	className?: string;
	sort: SortBy;
	sortDirection: SortDirection;
	update?: (sort: SortBy, sortDirection: SortDirection) => void;
}

interface MyState{
	style;
}

export default class FeatureListVisualizerHeader extends React.Component<MyProps, MyState> {
	public static defaultProps = {
		className: ""
	}

	constructor(p){
		super(p);
		this.state = {
			style: null
		}
	}

	public componentDidMount() {
		LineAwesomeLoader();
	}

	public render() {
		return (<div className={[styles.root, this.props.className].join(' ')}>
			<div className={[styles.flex1, styles.contribution].join(' ')} onClick={()=>this.click("contribution")}>
				<a>{"Contribution"}</a>
				{this.props.sort == "contribution" && this.props.sortDirection == "asc" &&
				<SortDownIcon className={styles.sortButton} />}
				{this.props.sort == "contribution" && this.props.sortDirection == "desc" &&
				<SortUpIcon className={styles.sortButton} />}
			</div>
			<div className={[styles.flex2, styles.label].join(' ')} onClick={()=>this.click("name")}>
				<a>{"Property"}</a>
				{this.props.sort == "name" && this.props.sortDirection == "asc" &&
				<SortDownIcon className={styles.sortButton} />}
				{this.props.sort == "name" && this.props.sortDirection == "desc" &&
				<SortUpIcon className={styles.sortButton} />}
			</div>
			<div className={[styles.flex2, styles.value].join(' ')}>
				<a>{"Value"}</a>
			</div>
		</div>);
	}

	private click = (sort: SortBy) => {
		if (!this.props.update) return;
		if (this.props.sort == sort){
			// only change direction!
			this.props.update(this.props.sort, this.props.sortDirection=="asc"?"desc":"asc");
		}else{
			// change sort!
			this.props.update(sort, "asc");
		}
	}
}