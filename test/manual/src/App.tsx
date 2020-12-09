import {ExplanationObject} from "argueview/dist/typings/explanation";
import React from 'react';
import './App.css';
import { FeatureListVisualizer } from "argueview";
import explanation from "./explanation.json";

function App() {
    return (
    <div className="App">
      <FeatureListVisualizer explanation={explanation as ExplanationObject} framing={"positive"} lct={"none"} threshold={0} />
    </div>
  );
}

export default App;
