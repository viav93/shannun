import React from 'react';

/**
 * Component Used to Display the SR - Only Text
 */
const SrOnlySpan = (props) => {
    const { children } = props;
    return (<span className="sr-only">{children}</span>)
};

// Default Export
export default SrOnlySpan;