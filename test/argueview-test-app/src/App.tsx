import {ExplanationObject} from "argueview/dist/typings/explanation";
import React from 'react';
import './App.css';
import { FeatureListVisualizer } from "argueview";
import explanation from "./explanation.json";

function App() {
    return (
    <div className="App">
      <FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"original"} lct={"none"} threshold={0.01} />
    </div>
  );
}

export default App;
