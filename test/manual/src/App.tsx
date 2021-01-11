import {ExplanationObject} from "argueview/dist/typings/IExplanation";
import React from 'react';
import './App.css';
import { FeatureListVisualizer } from "argueview";
import explanation from "./explanation.json";
import explanationNegative from "./explanation_negative.json";
import explanationExceptions from "./explanation_exceptions.json";

function App() {
    return (
    <div className="App">
      <FeatureListVisualizer explanation={explanationExceptions as ExplanationObject} framing={"decision-class"} lct={"none"} thresholdBadge={-1} thresholdOmit={0.001} visualization={"bar"} />
    </div>
  );
}

export default App;
