import * as validations from './Validations';

/**
 * Common validation logic to validate all the form fields
 */
export function validate(field) {
    // This below block checks for regex-pattern validation
    let isRegexvalidation = false;
    let regexPattern = null;
    let regexErrorMsg = null;
    const fieldRegexPatternCheck = field.hasOwnProperty('regexPattern') && field['regexPattern'] !== null && field['regexPattern'] !== "" && field['regexPattern'] !== undefined
    const fieldRegexErrorMsgCheck = field.hasOwnProperty('regexErrorMsg') && field['regexErrorMsg'] !== null && field['regexErrorMsg'] !== "" && field['regexErrorMsg'] !== undefined

    if (fieldRegexPatternCheck && fieldRegexErrorMsgCheck) {

        regexPattern = field['regexPattern'];
        regexErrorMsg = field['regexErrorMsg'];
        if (typeof regexPattern === "string") {
            const regexPatternValidation = regexPattern.includes('/i') || regexPattern.includes('/g') || regexPattern.includes('/m') || regexPattern.includes('/u')
            if (regexPattern.startsWith('/') && regexPattern.endsWith('/')) {
                let tempRegexPattern = regexPattern.slice(1, (regexPattern.length - 1));
                try {
                    tempRegexPattern = new RegExp(tempRegexPattern);
                    regexPattern = tempRegexPattern;
                    isRegexvalidation = true;
                } catch (error) {
                    isRegexvalidation = false;
                }
            } else if (regexPattern.startsWith('/') && (regexPatternValidation || regexPattern.includes('/y'))) {
                const regexArr = regexPattern.split('/');
                const pattern = regexArr[1];
                const flags = regexArr[2];
                try {
                    const tempRegexPattern = new RegExp(pattern, flags);
                    regexPattern = tempRegexPattern;
                    isRegexvalidation = true;
                } catch (error) {
                    isRegexvalidation = false;
                }
            } else {
                try {
                    const tempRegexPattern = new RegExp(regexPattern);
                    regexPattern = tempRegexPattern;
                    isRegexvalidation = true;
                } catch (error) {
                    isRegexvalidation = false;
                }
            }
        } else {
            try {
                const tempRegexPattern = new RegExp(regexPattern);
                regexPattern = tempRegexPattern;
                isRegexvalidation = true;
            } catch (error) {
                isRegexvalidation = false;
            }
        }
    } else {
        isRegexvalidation = false;
    }

    if (isRegexvalidation) { //If regex validation is true
        const fieldValueCheck = field.value !== null && field.value !== undefined && field.value !== ""
        if (field.isRequired && field.value === "") {//field is mandatory
            field.error = true;
            field.errorMsg = field.requiredMsg;
        } else if (fieldValueCheck && !regexPattern.test(field.value)) {
            field.error = true;
            field.errorMsg = regexErrorMsg;
        }

        if (!field.isRequired && field.value === "" && field.value.length === 0) {
            field.error = false;
            field.errorMsg = "";
        }
    } else { //If regex validation is false
        const fieldValueNotEmptyCheck = !field.isRequired && field.value !== ""
        if (field.isRequired && ((field.value && field.value.trim() === "") || !field.value)) {//field is mandatory
            field.error = true;
            field.errorMsg = field.requiredMsg;
        } else if (field.minLengthVal && field.value.length < field.minLengthVal) {//field min length checking
            field.error = true;
            field.errorMsg = field.minLengthMsg ? field.minLengthMsg : (field.lengthMsg ? field.lengthMsg : "");
        } else if (field.maxLengthVal && field.value.length > field.maxLengthVal) {//field maximum length checking
            field.error = true;
            field.errorMsg = field.maxLengthMsg ? field.maxLengthMsg : (field.lengthMsg ? field.lengthMsg : "");                
        }
        else if (field.validations && (fieldValueNotEmptyCheck || field.isRequired) && !field.hasOwnProperty('validationDecider')) {//any specific pattern or conditional validation
            field.validations.forEach((validationObj) => {
                if (typeof validationObj.validation === "string"
                    && typeof validations[validationObj.validation] === "function"
                    && !validations[validationObj.validation](field.value, field.format, field.range)) {
                        //added second and third arguments to support current date based validations
                    field.error = true;
                    field.errorMsg = validationObj.message;
                }
            });
        } else if (field.hasOwnProperty('validationDecider') && field.validationDecider) {
            const deciderMethod = field.validationDecider.deciderMethod;
            if (typeof deciderMethod === "string" && typeof validations[deciderMethod] === "function") {
                const validationMethod = validations[deciderMethod](field.value);
                if (typeof validationMethod === "string"
                    && typeof validations[validationMethod] === "function"
                    && !validations[validationMethod](field.value)) {
                    field.error = true;
                   field.validations.forEach((validationObj) => {
                        if (typeof validationObj.validation === "string" && validationObj.validation === validationMethod) {
                            field.errorMsg = validationObj.message;
                        }
                    });
                }
            }
        }
    }

    return field;
}
