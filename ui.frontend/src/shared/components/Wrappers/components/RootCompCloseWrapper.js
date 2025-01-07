import React, { Component } from 'react';
import { isFunction } from '../../../utils/Utility/Utility';
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper';

/**
 * Root Component Close Wrapper Component Used to Close the Content
 * If the Clicked is happend OutSide the C
 */
class RootCompCloseWrapper extends Component {

    /**
     * Handle Root Close
     */
    handleRootCloseHandler = (event) => {
        const { handleRootClose } = this.props
        if (isFunction(handleRootClose)) {
            handleRootClose(event); // Calling the Parent Compoent
        }
    }
    
    /**
     * render function
     */
    render() {
        const { children, disabled = true, event } = this.props;
        return (
            <RootCloseWrapper
                disabled={disabled}
                onRootClose={this.handleRootCloseHandler}
                event={event}>
                {children}
            </RootCloseWrapper>
        );
    }
}

// Default Export
export default RootCompCloseWrapper;