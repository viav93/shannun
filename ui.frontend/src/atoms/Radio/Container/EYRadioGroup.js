import React from 'react';
import EYRadio from '../Presentation/EYRadio';
import ATOM_CONSTANTS from 'atoms/Constants/AtomConstants';

/**
 ***** ATOMIC RADIO GROUP ****
 * All radiogroups sitewide
 * should reuse this atom.
 * @param {*} props
 */
const EYRadioGroup = props => {
    const { groupId, title, options, radioChange, selectedOption, displyType, showHeadingEle = true } = props;
    return (
        <div className={groupId + `-radios`}>
            {showHeadingEle && <h3 className={'form-item__label'}>{title}</h3>}
            <fieldset className={'nds ' + (displyType === 'inline' ? ATOM_CONSTANTS.RADIO_INLINE : '')}>
                <legend className="sr-only">{title}</legend>
                {options.map(radioOption =>
                    <EYRadio
                        key={groupId + '_' + radioOption.id}
                        groupId={groupId}
                        label={radioOption.label}
                        id={radioOption.id}
                        radioChange={radioChange}
                        selected={selectedOption === radioOption.id ? true : false}
                        displyType={displyType} />
                )}
            </fieldset>
        </div>);
};

/**
 *  default export for Atomic RadioGroup
 * Import Path : 'atoms/Radio/Container/EYRadioGroup';
 * For Named export use : 'atoms/Radio'
 */
export default EYRadioGroup;
