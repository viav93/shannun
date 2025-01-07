import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { isFunction, omitObject } from '../../../shared/utils/Utility/Utility';
import SharedConstants from '../../../shared/constants/SharedConstants';

/**
 * Button Component
 * @param {*} props - Object
 */
class ButtonComp extends Component {
    constructor(props) {
        super(props);        
    }
    btnRef = null;

    /**
     * Button ref Call Back
     */
    btnRefCallBack = (ele) => {
        const { refCallback } = this.props;
        this.btnRef = ele;
        if (isFunction(refCallback)) {
            refCallback(this.btnRef);
        }
    }

    render() {
        const restParam = omitObject(this.props, 'refCallback');
        return (
            <button  type="button"         
                ref={this.btnRefCallBack}
                {...restParam}
            />
        )
    }
}

/**
 * Close Button Component
 */
export const CloseButtonComp = (props) => {
    const { ariaLable, className, onClickHandler, ...rest } = props;
    /**
     * On Key Press Handler
     * @param {*} evt - Event Object
     */
    const onKeyPressHandler = (evt) => {
        // Char Code - Space and Enter
        const { SPACE, ENTER } = SharedConstants.KEY_CHAR_CODE;
            if ((evt.charCode === SPACE || evt.charCode === ENTER) && isFunction(onClickHandler)) {
                onClickHandler();
            }
    }

    return (
        <Button
            className={className || "closebtn-cls"}
            role="button"
            aria-label={ariaLable || "Close"}
            onClick={onClickHandler}
            onKeyPress={onKeyPressHandler}
            {...rest}
        >
            {props.children}
        </Button>
    )
}

export default ButtonComp;