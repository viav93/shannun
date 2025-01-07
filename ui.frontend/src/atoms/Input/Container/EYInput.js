import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { validate } from "shared/utils/Validations/ValidateField";
import InputGroup from '../Presentation/InputGroup';
import { isFunction } from 'shared/utils/Utility/Utility';

class EYInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showValidationImage: false,
            focusStatus: false
        };
    }
    activeInputRef = null;

    setActiveEle = activeEleRef => {
        this.activeInputRef = activeEleRef;
    }

    preventPasteOption = () => {
        const inputbox = document.getElementById("guestPassword");
        inputbox.onpaste = e => {
            e.preventDefault();
            return false;
        };
    }
    handleFocus = () => {
        document.getElementById("guestPassword") && this.preventPasteOption();
        const { onFocusHandler } = this.props;
        if (isFunction(onFocusHandler)) {
            onFocusHandler();
        }
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        const { field } = this.props;
        field.value = value;
        field.error = false;
        field.errorMsg = "";

        this.props.onChange(id, field);
    }
    handleClear = () => {
        const { controlId, field } = this.props;
        field.value = "";

        const activeDomInput = ReactDOM.findDOMNode(this.activeInputRef);
        activeDomInput.focus();

        this.props.onChange(controlId, field);
    }
    handleBlur = () => {
        const { controlId, field } = this.props;
        const updatedField = validate(field);
        this.setState({ focusStatus: false });
        this.props.onChange(controlId, updatedField);
    }

    componentDidMount() {
        const { isCallChild, promoClicked, onFocusHandler } = this.props;
        if (isCallChild && isCallChild === true) {
            this.handleBlur();
        }
        if (promoClicked) {
            setTimeout(() => {
                if (isFunction(onFocusHandler)) {
                    onFocusHandler();
                }
            }, 1000)
        }
    }

    render() {
        const { controlId, field, onKeyPress, placeHolder, ariaLabel, noClearButton, disabled, maxLengthValue } = this.props;
        const { showValidationImage, focusStatus } = this.state;
        field.focusStatus = focusStatus;

        return (
            <InputGroup
                controlId={controlId}
                field={field}
                maxLengthValue= {maxLengthValue}
                handleChange={this.handleChange}
                handleBlur={this.handleBlur}
                handleClear={this.handleClear}
                handleFocus={this.handleFocus}
                onKeyPress={onKeyPress}
                setActiveEle={this.setActiveEle}
                inputPlaceHolder={placeHolder}
                showValidationImage={showValidationImage || this.props.showValidationImage}
                ariaLabel={ariaLabel}
                noClearButton={noClearButton}
                disabled={disabled}
            />
        );
    }
}
EYInput.defaultProps = {
    field: { error: false, value: "", requiredMsg: "", isRequired: false }
}
EYInput.propTypes = {
    controlId: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    field: PropTypes.object.isRequired
}

export default EYInput;
