//import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat)
const moment = {};
/*
 validation for FFP Number
*/
export function validFFPChar(value) {
    return value.match(/^([0-9]{10,12})$/g);
}

/*
 validation for Name
*/
export function validateName(value, props, errorMessage, icon, label) {
    let type = 'success';
    let errorMsg = '';

    if (value === '') {
        //name empty validation
        type = 'error';
        errorMsg = props.aemdata.mandatoryLastNameMessage;
    } else {
        const namechar = value.replace(/ /g, '');
        if (namechar.length < 2 || value.length > 29 || !validateLastName(namechar)) {
            type = 'error';
            errorMsg = errorMessage;
        }
    }

    return ({ type, value, errorMsg, icon, label });
}

export function validateFullName(value) {
    const namechar = value.replace(/ /g, '');
    if (namechar.length < 2 || value.length > 29 || !validateLastName(namechar)) {
        return true;
    }
    return false;
}

/*
 validation for Booking Reference Number
*/
export function validateBookingReference(value, props, hideFieldMessage, errorMessage) {
    let type = 'success';
    let errorMsg = '';
    const len = value.length;
    if (value === '') {
        //pnr number empty validation
        type = 'error';
        errorMsg = props.aemdata.mandatoryBookingReferenceMessage;
    } else if ((len === 5 || len === 6) && !validatePnr(value)) {
        type = 'error';
        errorMsg = errorMessage;
    } else if (len === 13) {
        if (!validTicketChar(value)) {
            type = 'error';
            errorMsg = errorMessage;
        }
    } else if (len >= 10 && len <= 12){
        if(!validFFPChar(value)){
            type = 'error';
            errorMsg = errorMessage;
        }
    } else if (len !== 13 && len !== 5 && len !== 6) {
        type = 'error';
        errorMsg = errorMessage;
    }
    if (hideFieldMessage) {
        errorMsg = '';
    }
    return ({ type, value, errorMsg });

}

export function validatepassword(value, blankMsg ,mailMsg,onlyValidate){
    const response = { value, type: "", errorMsg: "" };
    const passwordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,191}$/;
    if (value === "") {
        response.type = (onlyValidate) ? "" : "error";
        response.errorMsg = (onlyValidate) ? "" : (blankMsg ? blankMsg : "");
    } else if (!passwordRegEx.test(String(value))) {
        response.type = "error";
        response.errorMsg = mailMsg;
    }
    if (response.type === "error") {
        return false;
    }
    return true;
}

export function validatepin(value, blankMsg ,mailMsg,onlyValidate){
    const response = { value, type: "", errorMsg: "" };
    const passwordRegEx = /^[0-9a-zA-Z]{6,6}$/;
    if (value === "") {
        response.type = (onlyValidate) ? "" : "error";
        response.errorMsg = (onlyValidate) ? "" : (blankMsg ? blankMsg : "");
    } else if (!passwordRegEx.test(String(value))) {
        response.type = "error";
        response.errorMsg = mailMsg;
    }
    if (response.type === "error") {
        return false;
    }
    return true;
}

export function validateVoucher(value, blankMsg ,mailMsg, onlyValidate){
    const response = { value, type: "", errorMsg: "" };
    const passwordRegEx = /^[0-9]{16,16}$/;
    if (value === "") {
        response.type = (onlyValidate) ? "" : "error";
        response.errorMsg = (onlyValidate) ? "" : (blankMsg ? blankMsg : "");
    } else if (!passwordRegEx.test(String(value))) {
        response.type = "error";
        response.errorMsg = mailMsg;
    }
    if (response.type === "error") {
        return false;
    }
    return true;
}

/**
 * Check if a given input is valid format xx/xx/xxxxx
 */
export function checkDateFormat(testInp) {
    if (moment(testInp, 'DD/MM/YYYY', true).isValid()) {
        var SpecialTo = moment(testInp, "DD/MM/YYYY");
        /**
         * Sonar fix, below if...else statement is changed to single return statement
         *  if (moment().diff(SpecialTo) > 0) {
                //for date in the past
                return true;
            } else {
                // for date in today or in future
                return false;
            }
         */
        return (moment().diff(SpecialTo) > 0)
    } else {
        return false;
    }
}

/*
 validation for Email
*/
export function validateEmail(value, blankMsg, mailMsg, onlyValidate) {
    const response = { value, type: "", errorMsg: "" };
    const mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line
    if (value === "") {
        response.type = (onlyValidate) ? "" : "error";
        response.errorMsg = (onlyValidate) ? "" : (blankMsg ? blankMsg : "");
    } else if (!mailRegEx.test(String(value).toLowerCase())) {
        response.type = "error";
        response.errorMsg = mailMsg;
    }
    if (response.type === "error") {
        return false;
    }
    return true;
}

export function validateEYCName(value, blankMsg, nameMsg, onlyValidate) {
    const response = { value, type: "", errorMsg: "" };
    const nameRegEx = /^[a-z A-Z]+$/i;
    if (value === "") {
        response.type = (onlyValidate) ? "" : "error";
        response.errorMsg = (onlyValidate) ? "" : (blankMsg ? blankMsg : "");
    } else if (!nameRegEx.test(String(value).toLowerCase())) {
        response.type = "error";
        response.errorMsg = nameMsg;
    }
    if (response.type === "error") {
        return false;
    }
    return true;
}

/**
 * Email validation method
 */
export function isValidEmail(value) {
    const mailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;//eslint-disable-line
    if (!mailRegEx.test(String(value).toLowerCase())) {
        return false;
    }
    
    return true;
}

/*
 validation for GuestNumber
*/
export function validateGuestNumber(value, blankMsg, gusetNoMsg, icon, label, loyaltyCarrier) {
    const response = { type: "success", errorMsg: "", icon, label, value };
    let valid = true;
    if (loyaltyCarrier === 'EY') {
        if (value.toString().length === 12) {
            valid = validFFTicketChar(value)
        } else {
            valid = false;
        }
    } else {
        const letters = /^[0-9a-zA-Z]+$/;
        if (!value.toString().match(letters)) {
            valid = false;
        }
    }

    if (value === "") {
        response.type = "error";
        response.errorMsg = (blankMsg ? blankMsg : "");
    }
    else if (!valid) {
        response.type = "error";
        response.errorMsg = gusetNoMsg;
    }


    return response;
}

/*
 validation for shannun GuestNumber
*/
export function validateEYGuestNumber(value) {
    let valid = false;
    const valueToString = value.toString().length === 12
    if (valueToString && ((parseInt(value.toString().substr(0, 11)) % 7) === parseInt(value.toString()[11]))) {
        valid = true;
    }

    return valid;
}
/*
 validation for shannun GuestNumber chatacter limit under flow
*/
export const guestNumCharLimitUnderFlow = () => {
    return false;
}
/**
 * Validation for both shannun guest number and guest email in single field
 */
export const EYguestUserNameValidateDecider = (value) => {
    if (isNaN(value)) {
        return 'isValidEmail';
    } else if (value.toString().length < 12) {
        return 'guestNumCharLimitUnderFlow';
    } else {
        return 'validateEYGuestNumber';
    }
}
/*
 validation for Phone Number
*/
export function validatePhone(value, blankMsg, phoneMsg, onlyValidate) {
    const response = { value, type: "", errorMsg: "" };
    const phoneRegEx = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
    if (value === "") {
        response.type = (onlyValidate) ? "" : "error";
        response.errorMsg = (onlyValidate) ? "" : (blankMsg ? blankMsg : "");
    } else if (!phoneRegEx.test(value)) {
        response.type = "error";
        response.errorMsg = phoneMsg;
    }

    return response;
}

/*
 validation for Pnr
*/
export function validatePnr(value) {
    // Regex for checking Special Character
    const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?✦—•\u2600-\u26FF]/;//eslint-disable-line
    if (value && (value.includes(' ') || format.test(value))) {
        return null;
    }
    return value.match(/^.*(?=.{5,6})[a-zA-Z0-9]+$/i);
}

/*
 validation for Last name
*/
export function validateLastName(value) {
    const trimmedVal = value.trim();
    return trimmedVal.match(/^[a-zA-Z][a-z A-Z]*[a-zA-Z]$|^[a-zA-Z]+$/i);
}
/*
 validation for Ticket Number
*/
export function validTicketChar(value) {
    return value.match(/^([0-9]{13})$/g);
}

export function validateString(value) {
    return value.match(/^[^-\s][a-zA-Z0-9_\s-]+$/g);
}

/*
 validation for Alphanumberic Flight Number
*/
export function validFlightNumber(value) {
    return value.match(/^[a-zA-Z0-9\s-]+$/g);
}

/*
validation for custom form fields
*/
export function validateFormEmail(email) {
    return String(email).toLowerCase().match(/^(([^<>()\[\]\\.,;:!\s@"]+(\.[^<>()\[\]\\.,;:!\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]{2,}\.)+[a-zA-Z]{2,}))$/);//eslint-disable-line
}

export function specialEmailValidation(email) {
    const format = /^[a-zA-Z0-9]+[a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return String(email).toLowerCase().match(format);
}

/*
 validation for Last name
*/
export function validateFirstName(value) {
    return value.match(/^[a-z A-Z]+$/i);
}
/*
 validation for Name
*/
export function validateFormName(value) {
    const namechar = value.replace(/ /g, '');
    if (namechar.length < 2 || value.length > 29 || !validateLastName(namechar)) {
        return false;
    }
    return true;
}

/*
 validation for Booking Reference Number
*/
export function validateBookingReferenceForForms(value = '') {
    let returnValue = true;
    const trimmedVal = value.trim();
    const len = trimmedVal.length;
    if (trimmedVal === '') {
        returnValue = false;
    } else if ((len === 5 || len === 6) && !validatePnr(trimmedVal)) {
        returnValue = false;
    } else if (len === 13) {
        if (!validTicketChar(trimmedVal)) {
            returnValue = false;
        }
    } else if (len >= 10 && len <= 12){
        if(!validFFPChar(trimmedVal)){
            returnValue = false;
        }
    }else if (len !== 13 && len !== 5 && len !== 6) {
        returnValue = false;
    }
    return returnValue;
}


/*
    validate booking reference in-general
*/
export function validateBrTkt(value) {
    try {
        let type = 'success';
        const len = value.length;
        if (!value.match(/^\S.*$/g)) {
            type = 'error';
            return false;
        }
        if (value === '') {
            //pnr number empty validation
            type = 'error';
        } else if ((len === 5 || len === 6) && !validatePnr(value)) {
            type = 'error';
        } else if (len === 13) {
            if (!validTicketChar(value)) {
                type = 'error';
            }
        } else if (len !== 13 && len !== 5 && len !== 6) {
            type = 'error';
        }
        return type !== 'error';
    } catch (error) {
    }
}

/*
 validation for seat number regex
*/
export function seatNumberRegexValidation(value) {
    const regexValue = new RegExp('^[0-9]{1,2}[A-Za-z]$');
    return regexValue.test(value);
}
/*
 validation for seat number
*/
export function validateSeatNumber(value) {
    if (seatNumberRegexValidation(value)) {
        return true;
    }
    return false;
}

/**
 * Validation for 1A Last name
 * 1-35 and can allowed space in-between
 */
export function validate1ALastName(value) {
    const patVal = value.match(/^[a-zA-Z][a-z A-Z]*[a-zA-Z]$|^[a-zA-Z]+$/i);
    return (patVal && value.length > 0 && value.length < 36);
}

export function isValidDate(value, dateFormat = "DD/MM/YYYY") {
    return dayjs(value, dateFormat, true).isValid();
}

export function isValidYearRange(value, dateFormat = "DD/MM/YYYY", rangeYear = 1) {
    const resultYear = dayjs().add(rangeYear, 'year').format(dateFormat);
    let givenDate =  dayjs(value, dateFormat);
    const diffDays = givenDate.diff(resultYear, 'days');

    if(rangeYear < 0) {
        return !(diffDays < 0);
    } else {
        return (diffDays < 0);
    }
}

export function isBeforeCurrentDate(givenDate, dateFormat = "DD/MM/YYYY") {
    const givenDateObj = dayjs(givenDate, dateFormat);

    return givenDateObj.isBefore(dayjs(), 'days');
}

export function isAfterCurrentDate(givenDate, dateFormat = "DD/MM/YYYY") {
    const givenDateObj = moment(givenDate, dateFormat);

    return givenDateObj.isAfter(moment(), 'days');
}


export function validEMDTicketChar(value) {
    return (value.length === 13)? value.match(/^(607)([a-zA-Z0-9]{10})$/g): true;
}

export function validFFTicketChar(value) {
    let valid = true;
    if (value.toString().length === 12 && (parseInt(value.toString().substr(0, 11)) % 7) !== value.toString()[11]) {
        valid = false;
    }
    
    return valid;
}

export function validPNRTicketChar(value) {
    if(value.length === 5 || value.length === 6){ 
            return value.match(/^([a-zA-Z0-9]{5,6})$/g)
    } else if(value.length !== 5 && value.length !== 6 && value.length !== 12 && value.length !== 13){
        return false
    } else { 
        return true;
    }
}

