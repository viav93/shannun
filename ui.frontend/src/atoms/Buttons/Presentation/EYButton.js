import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from '../../../shared/utils/Utility/Utility';

export const BUTTON_STYLE = {
    PRIMARY: 'ey-button',
    SECONDARY: 'ey-button__secondary',
    TERTIARY: 'ey-button__tertiary',
    DESTRUCTIVE: 'ey-button__destructive',
    LARGE: 'ey-button--large',
    LARGE_SECONDARY: 'ey-button__secondary--large',
    LARGE_TERTIARY: 'ey-button__tertiary--large',
    LARGE_DESTRUCTIVE: 'ey-button__destructive--large'
}

const EYButton = ({ className = '', buttonStyle = BUTTON_STYLE.PRIMARY, children, onClick, ...rest }) => {
    return <button className={`${buttonStyle} ${className}`} onClick={(e) => { if (isFunction(onClick)) { onClick(e) } }} {...rest}>{children}</button>
}

EYButton.propTypes = {
    buttonStyle: PropTypes.oneOf(Object.values(BUTTON_STYLE)),
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func,
};

export default EYButton;