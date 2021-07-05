//@ts-ignore
import {ExplanationObject} from "argueview/dist/typings/IExplanation";
//@ts-ignore
import { FeatureListVisualizer, ToulminVisualizer } from "argueview";
import React from 'react';
import './App.css';
import explanation from "./explanation.json";
import explanationNegative from "./explanation_negative.json";
import explanationExceptions from "./explanation_exceptions.json";

function App() {
	return (
		<div className="App">
			<ToulminVisualizer explanation={explanationNegative as ExplanationObject} />
			<FeatureListVisualizer explanation={explanationNegative as ExplanationObject}
								   framing={"positive"}
								   lct={"label"}
								   thresholdBadge={-1}
								   thresholdOmit={0.001}
								   visualization={"bar"}
								   interactive={true}
								   omitIntercept={true}
								   colors={["#1f77b4", "#DFE81A", "#FF7F0E"]} />
		</div>
	);
}

export default App;
