import React from 'react';
import { ButtonGroup } from 'react-bootstrap';

/**
 * Button Group Component 
 * @param {*} props - Object
 */
const ButtonGroupComp = (props) => {
    return (
        <ButtonGroup>
            {props.children}
        </ButtonGroup>
    )
}

export default ButtonGroupComp;