import React from 'react';
//import HtmlToReactWrapper from 'shared/components/Wrappers/components/HtmlToReactWrapper';

const EYCheckBox = (props) => {
    const { groupId, value, label, selected, checkChange, displayType, 
        id, isRequired, field: { error = false, errorMsg = '' } = {}, isDisabled, ariaLabel = '', 
        ariaCheckedValue = false, className = '', labelClass = '', htmlLabel = false } = props;
    const ariaDescribedBy = error ? { 'aria-describedby': groupId + '_err' } : {};
    const ariaInvalid = error ? { 'aria-invalid': 'true' } : { 'aria-invalid': 'false' };
    const ariaRequired = isRequired ? { 'aria-required': "true" } : {};
    if (typeof checkChange != "function") {
        Error("Invalid checkChange Property");
    }

    return (
        <div className={`form-item form-item--checkbox ${className}`} >
            <input 
                id={id} 
                type="checkbox"
                checked={ariaCheckedValue ? ariaCheckedValue : selected} 
                aria-checked={ariaCheckedValue ? ariaCheckedValue : selected}
                aria-label={ariaLabel}
                disabled={isDisabled}
                inline={displayType}
                onChange={e => checkChange(groupId, (value || id), e.target.checked)}
                name={groupId}
                className={`form-item__field ${className}`} 
                aria-invalid="false"
                {...ariaRequired}
                {...ariaDescribedBy}
                {...ariaInvalid}
            >                
            </input>
            <label htmlFor={id} className={`form-item__label wrap-text ${labelClass}`}>
                {/*htmlLabel ? label : <HtmlToReactWrapper
                    htmlString={label}
                    addSrOnlyTextForAnchorTag
                    updateAltForImageTag
                    shownewwindowanchoricon
                />*/
                htmlLabel ? label : <p dangerouslySetInnerHTML={{ __html: label }}></p>}
            </label>
            {error && <span className="form-item__error no-margin">{errorMsg}</span>}
        </div>        
    );    
}

export default EYCheckBox;
