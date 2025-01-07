import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';

/**
 * Button Group Component 
 * @param {*} props - Object
 */
const ButtonToolBarComp = (props) => {
    return (
        <ButtonToolbar>
            {props.children}
        </ButtonToolbar>
    )
}

export default ButtonToolBarComp;