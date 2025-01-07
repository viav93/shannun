import React from 'react';
import { Alert } from "react-bootstrap";

/**
 * Alert Component Presentation View
 * @param {*} props - Object
 */
const AlertCompItems = (props) => {
    return (
        <Alert {...props} />
    );
};

// default export
export default AlertCompItems;