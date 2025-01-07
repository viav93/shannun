import React from 'react';
import { HelpBlock } from 'react-bootstrap';

const FieldErrorBlockComp = (props) => {
    const { controlId, field = {} } = props;
    const {errorMsg = "", error = false, focusStatus = false} = field;
    
    return <HelpBlock 
        id={controlId + "_err"} 
        aria-hidden={(error && focusStatus) ? true : false}
        bsClass="form-item__error">{errorMsg}</HelpBlock>
}

export default FieldErrorBlockComp;
