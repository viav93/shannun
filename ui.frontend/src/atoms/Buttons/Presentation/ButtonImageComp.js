import React, { Component } from 'react';

class ButtonImageComp extends Component {
    render() {
        const { className = '', handleClick, imageSrc = '', imageAltText = '', buttonlabel = '' } = this.props;
        return (
            <button
                class={className}
                onClick={() => handleClick}>
                <img className="icons" src={imageSrc} alt={imageAltText} />
                {buttonlabel}
            </button>
        )
    }
}

export default ButtonImageComp;