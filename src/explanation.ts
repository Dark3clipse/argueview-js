export interface Feature {
	index: number;
	name: string;
	data_type: string;
	nominal_value: string[];
	is_target: boolean;
	is_ignore: boolean;
	is_row_identifier: boolean;
	number_of_missing_values: number;
	description: string;
}

export interface Source {
	name: string;
	author: string;
	description: string;
	href: string;
	observations: number;
	type: string;
	year: number;
	features: Feature[];
}

export interface LatentContinuousTarget {
	label: string;
	anti_label: string;
	mapping: number[];
}

export interface Data {
	classes: string[];
	sources: Source[];
	latent_continuous_target: LatentContinuousTarget;
}

export interface Feature2 {
	value: number;
}

export interface Source2 {
	features: Feature2[];
}

export interface Case {
	id: number;
	class_proba: number[];
	sources: Source2[];
}

export interface Support {
	source: number;
	feature: number;
	contribution: number;
	value: string;
}

export interface Attack {
	source: number;
	feature: number;
	contribution: number;
	value: string;
}

export interface Explanation {
	support: Support[];
	attack: Attack[];
	base: number;
}

export interface ExplanationObject {
	data: Data;
	case: Case;
	explanation: Explanation;
	backing: string;
}