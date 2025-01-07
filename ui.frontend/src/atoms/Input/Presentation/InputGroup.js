import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';
import FieldErrorBlockComp from '../../FieldErrorBlock';

const InputGroup = props => {
    const { controlId, field = {}, handleChange, handleBlur, handleFocus, handleClear, onKeyPress,
        setActiveEle, inputPlaceHolder = "", maxLengthValue = "", ariaLabel = "", noClearButton = false, disabled = false } = props;
    const { type = "text", label = "", value = "" } = field;
    const ariaDescribedBy = field.error ? { 'aria-describedby': controlId + '_err' } : {};
    const ariaInvalid = field.error ? { 'aria-invalid': 'true' } : { 'aria-invalid': 'false' };
    const fieldTypeCheck = (type === "password") ? { 'type': 'password' } : { 'type': type }
    const fieldTypeCheck2 = (type === "textarea") ? { 'componentClass': "textarea" } : fieldTypeCheck;
    const fieldType = (type === "text" || type === "number") ? { 'type': 'text' } : fieldTypeCheck2;
    /*
   * replace char onkeyup
   */
    const handleFieldKeyUp = (e, field) => {
        const { format = "" } = field;
        if (format === "DD/MM/YYYY") {
            e.target.value = e.target ? masked(e.target.value, e.keyCode) : e.target.value;
            field.value = e.target.value;
        } else {
            e.target.value = e.target ? e.target.value.replace(/[^\d]/g, '') : e.target.value;
            field.value = e.target.value;
        }
    }

    const dateFormat = (field) =>{
        if(!field.value.includes('/')) {
            if(field.value.length === 8) {
                field.value = field.value.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
            }
        }
        return handleBlur
    }
    
    const masked = (input, keyCode) => {
        var isShift = false;
        var seperator = "/";
        if(keyCode === 16) {
            isShift = true;
        }
        if(((keyCode >= 48 && keyCode <= 57) || keyCode === 8 || keyCode <= 37 || keyCode <= 39 || (keyCode >= 96 && keyCode <= 105)) && isShift === false && input.length<=10) {
            if ((input.length === 2 || input.length === 5) && keyCode !== 8) {
                input += seperator;
            }            
        } else if(input.length>=10) {
            if(input.indexOf('/') === -1 && input.length === 10) {
                input = input.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
            } else {
                const dateArr = input.split('/');
                if(dateArr[0].length>=3) {
                    dateArr[0] = dateArr[0].substring(0,2)
                } 
                if(dateArr[1].length>=3) {
                    dateArr[1] = dateArr[1].substring(0,2)
                } 
                if(dateArr[2].length>=5) {
                    dateArr[2] = dateArr[2].substring(0,4)
                }
                input = dateArr.join('/');
                //input = input.substring(0, 10)
            }
            
        } else {
            input = input.replace(/[^\d/]/g, '');;
        }
        //Validate the Input
        let fslash = -1, sslash = -1;
        for(let i = 0; i < input.length; i++) {
            if (input.charAt(i) === '/' && fslash === -1) {
                fslash = i;
            } else if (input.charAt(i) === '/' && fslash !== -1) {
                sslash = i;
            }
        }
        if(fslash>2) {
            input = input.replace(/[^\d]/g, '');
            input = input.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
        }
        if(sslash === -1 && input.length === 10) {
            input = input.replace(/[^\d]/g, '');
            input = input.replace(/^(\d{2})(\d{2})(\d{4}).*/, '$1/$2/$3');
        }
        return input;
    }
    return <FormGroup controlId={controlId} bsClass="form-item" className="form-item--text">
        <FormControl
            ref={(input) => { setActiveEle(input) }}
            {...fieldType}
            maxLength={maxLengthValue}
            autoComplete="off"
            placeholder={inputPlaceHolder}
            bsClass="form-item__field"
            className={field.noMouseflow ? "no-mouseflow" : (field.format === "DD/MM/YYYY")? "date-format": ""}
            onChange={handleChange}
            onBlur={field.format === "DD/MM/YYYY" ? dateFormat(field) : handleBlur}
            onFocus={handleFocus}
            onKeyUp={field.type === "number" || field.format === "DD/MM/YYYY" ? (e) => handleFieldKeyUp(e, field) : () => { }} //only accept number
            onKeyPress={onKeyPress}
            value={value}
            aria-label={ariaLabel}
            {...ariaInvalid}
            {...ariaDescribedBy}
            disabled={disabled}
        />
        <label
            htmlFor={controlId}
            id={controlId + "Label"}
            className={`form-item__label`}>
            {label + " "}
            {field.isRequired && <span className="sr-only">required</span>}
        </label>
        {value !== "" && !noClearButton ?
            <button
                type="button"
                className="ecom-reset-field"
                onClick={handleClear}>
                <span className="sr-only">Clear</span>
            </button>
            : ""}
        <FieldErrorBlockComp controlId={controlId} ariaHidden={(field.error && field.focusStatus) ? true : false} field={field} />
    </FormGroup >
}

export default InputGroup;
