/**
 * Is Used to check the data that is been passed from the aem has JS
 * Boolean value or not
 * @param {*} aemValue - Value
 */
export const getAEMBooleanValue = (aemValue) => {
    if(aemValue && typeof aemValue === 'boolean'){
        return aemValue;
    }
    const aemValueUpdated = (aemValue && typeof aemValue === 'string' && aemValue.toLowerCase()) || "";
    if(!aemValueUpdated){
        return false;
    }
    switch(aemValueUpdated){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default: 
            return false;
    }
}