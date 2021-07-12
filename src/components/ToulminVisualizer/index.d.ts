import React from "react";
import { ExplanationObject } from "../../IExplanation";
interface MyProps {
    className?: string;
    explanation: ExplanationObject;
    components?: string[];
}
interface MyState {
}
export default class ToulminVisualizer extends React.Component<MyProps, MyState> {
    static defaultProps: {
        className: string;
        components: string[];
    };
    constructor(p: any);
    private get qualifier();
    private get lrat();
    render(): JSX.Element;
}
export {};
