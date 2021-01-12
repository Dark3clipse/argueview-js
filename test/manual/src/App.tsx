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
        <ToulminVisualizer explanation={explanation as ExplanationObject} />
        <FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"decision-class"} lct={"none"} thresholdBadge={-1} thresholdOmit={0.001} visualization={"bar"} />
    </div>
  );
}

export default App;
