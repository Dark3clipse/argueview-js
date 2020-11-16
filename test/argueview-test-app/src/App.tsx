import {ExplanationObject} from "argueview/dist/typings/explanation";
import React from 'react';
import './App.css';
import { ToulminVisualizer } from "argueview";
import explanation from "./explanation.json";

function App() {
    return (
    <div className="App">
      <ToulminVisualizer explanation={explanation as ExplanationObject} />
    </div>
  );
}

export default App;
