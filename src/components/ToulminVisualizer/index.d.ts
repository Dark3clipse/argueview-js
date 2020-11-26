import React from "react";
import { ExplanationObject } from "src/explanation";
interface MyProps {
    className?: string;
    explanation: ExplanationObject;
}
interface MyState {
}
export default class ToulminVisualizer extends React.Component<MyProps, MyState> {
    static defaultProps: {
        className: string;
    };
    constructor(p: any);
    private get qualifier();
    private get lrat();
    render(): JSX.Element;
}
export {};
