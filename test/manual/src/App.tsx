import {ExplanationObject} from "argueview/dist/typings/IExplanation";
import React from 'react';
import './App.css';
import { FeatureListVisualizer } from "argueview";
import explanation from "./explanation.json";

function App() {
    return (
    <div className="App">
      <FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"original"} lct={"none"} thresholdBadge={0} thresholdOmit={0.007} />
    </div>
  );
}

export default App;
