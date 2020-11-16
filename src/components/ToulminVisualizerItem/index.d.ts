import React from "react";
interface MyProps {
    className?: string;
    title: string;
    value: string;
}
interface MyState {
}
export default class ToulminVisualizerItem extends React.Component<MyProps, MyState> {
    static defaultProps: {
        className: string;
    };
    constructor(p: any);
    render(): JSX.Element;
}
export {};
