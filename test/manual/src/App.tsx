//@ts-ignore
import {ExplanationObject} from "argueview/dist/typings/IExplanation";
//@ts-ignore
import { FeatureListVisualizer, ToulminVisualizer, FeatureInfoPanelContainer, Explanation } from "argueview";
import React from 'react';
import './App.css';
import explanation from "./explanation.json";
import explanationNegative from "./explanation_negative.json";
import explanationExceptions from "./explanation_exceptions.json";

function App() {
	return (
		<div className="App">
			<Explanation explanation={explanationNegative as ExplanationObject}
					source={0}
					components={["decision"]}
					framing={"negative"}
					lct={"label"}
					thresholdBadge={-1}
					thresholdOmit={0.003}
					visualization={"bar"}
					colors={["#1f77b4", "#DFE81A", "#FF7F0E"]}
					colorNames={["blue", "yellow", "orange"]} />
		</div>
	);
}

export default App;
