declare module "*.json" {
    const content: any;
    export default content;
}
declare module "*.scss" {
    const content: {
        [className: string]: string;
    };
    export default content;
}
declare module "src/components/ToulminVisualizer" {
    import React from "react";
    interface MyProps {
        className?: string;
    }
    interface MyState {
    }
    export default class ToulminVisualizer extends React.Component<MyProps, MyState> {
        static defaultProps: {
            className: string;
        };
        constructor(p: any);
        render(): JSX.Element;
    }
}
declare module "src/loader" {
    import "core-js";
    import "regenerator-runtime/runtime";
    import ToulminVisualizer from "src/components/ToulminVisualizer";
    export { ToulminVisualizer };
}
