import React, { PureComponent } from 'react';

/**
 * Async Component Used to get the Asyncronous Behavior
 */
class AsyncComponentWrapper extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            resolvedError: false,
            resolvedSuccess: false,
            error: '',
            data: ''
        };
    }

    /**
     * Component Did Mount
     */
    componentDidMount = () => {
        const { promise } = this.props;
        if (promise) {
            promise()
                .then((data) => {
                    this.setState({ resolvedSuccess: true, data })
                })
                .catch((error) => {
                    this.setState({ resolvedError: true, error })
                });
        }
    }

    /**
     * Used to render the Child Component
     */
    renderChildren = () => {
        const { children, childKey } = this.props;
        return React.Children.map(children, child => (
            React.cloneElement(child, {
                [childKey]: this.state.data
            })
        ))
    }

    /**
     * Render Function
     */
    render() {
        if (this.state.resolvedError) {
            return <h1>Error Occurred While Loading the Component</h1>;
        } else if (this.state.resolvedSuccess) {
            return <div>{this.renderChildren()}</div>;
        } else {
            return <h1>Loading...</h1>;
        }
    }
}

// Default Export
export default AsyncComponentWrapper;
