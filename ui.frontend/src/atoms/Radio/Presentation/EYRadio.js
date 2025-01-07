import React from 'react';
import ATOM_CONSTANTS from 'atoms/Constants/AtomConstants';

/**
 * ******Atomic Radio Component******
 * All radiogroups/ individual Radio
 * sitewide should reuse this atom.
 * @param {*} props
 */
const EYRadio = props => {

    const { radioChange, groupId = '', id = '', label = '', name = 'radios', selected = false, isDisabled = false } = props;

    return (
        <div className={ATOM_CONSTANTS.FORM_ITEM + ' ' + ATOM_CONSTANTS.FORM_ITEM_RADIO}>
            <input
                id={id}
                type={ATOM_CONSTANTS.RADIO}
                name={groupId || name}
                className={ATOM_CONSTANTS.FORM_ITEM_FIELD}
                checked={selected}
                onChange={e => radioChange(groupId, id, e)}
                disabled={isDisabled}
            />
            <label htmlFor={id} className={ATOM_CONSTANTS.FORM_ITEM_LABEL}> {label} </label>
        </div>
    );
};

/**
 *  default export for Atomic Radio
 * Import Path : 'atoms/Radio/Presentation/EYRadio';
 * For Named export use : 'atoms/Radio'
 */
export default EYRadio;
