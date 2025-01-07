import React from 'react';

/**
 * Label Component 
 * @param {*} props - Props Object 
 */
const Label = (props) => {
    const { id, className, children, ariaHidden = false } = props;
    if (ariaHidden === true){
        return (
            <label
                htmlFor={id}
                className={className}
                aria-hidden={ariaHidden ? ariaHidden : false}>
                {children}
            </label>
        );
    } else {
        return (
            <label
                htmlFor={id}
                className={className}>
                {children}
            </label>
        );
    }
}

export default Label;