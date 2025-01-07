import React from 'react';
import { FormGroup, Col } from 'react-bootstrap';
import EYCheckBox from '../Presentation/EYCheckBox';
import FieldErrorBlockComp from '../../FieldErrorBlock';

const EYCheckBoxGroup = (props) => {
    const { groupId, title, options, checkChange, selectedOption, displayType, error, requiredMsg, isRequired } = props;
    const srRequiredMsg = "Selection of one checkbox is required";

    return <FormGroup
        validationState={error ? "error" : null}
        controlId={groupId}
        className={groupId + ` checkbox-group`}>
        <Col xs={12}>
            <fieldset className={`${displayType == 'inline' ? 'check-inline' : ''}`}>
                <legend>
                    {title ? (<p className="checkbox-group-heading">{title}</p>) : null}
                    {isRequired ? (<span className="sr-only">{srRequiredMsg}</span>) : null}
                </legend>
                { options && options.map((checkboxOption, index) => {
                    return <EYCheckBox
                        id={groupId + '_' + index}
                        key={groupId + '_' + checkboxOption.value}
                        groupId={groupId}
                        label={checkboxOption.label}
                        value={checkboxOption.value}
                        checkChange={checkChange}
                        selected={selectedOption.indexOf(checkboxOption.value) != -1 ? true : false}
                        displayType={displayType}
                        isRequired={isRequired}
                        field={{ 'error': error ? 'error' : null }}
                        className={checkboxOption.className ? checkboxOption.className : ''}
                    />;
                })}

            </fieldset>
            <div role="alert">
                <FieldErrorBlockComp controlId={groupId} field={{ 'type': error ? "error" : null, 'errorMsg': requiredMsg }} />
            </div>
        </Col>
    </FormGroup>
}

export default EYCheckBoxGroup;
