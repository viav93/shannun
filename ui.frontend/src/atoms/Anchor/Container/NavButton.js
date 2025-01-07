import React from 'react';
import { isFunction } from 'shared/utils/Utility/Utility';
import { AnchorWithLink } from './AnchorWithLink';
import ButtonComp from 'atoms/Buttons/Presentation/ButtonComp';

const NavButton = (props) => {
    const { handleClick, btnLabel, className = "", showBtn = true,
        linkDef, isDisabled, buttonRef, willActAsAnchorTag = false,
        targetWindow = "_self", relkeyword, shownewwindowicon = false, 
        shownewwindowanchoricon = true, shownewwindowiconwhite = false} = props;
    const clickUrl = e => {
        if(isFunction(handleClick)) {
            handleClick(linkDef,e);
        }        
    }
    if (willActAsAnchorTag) {
        return <AnchorWithLink
            href={linkDef}
            shownewwindowanchoricon={shownewwindowanchoricon}
            shownewwindowicon={shownewwindowicon}
            shownewwindowiconwhite={shownewwindowiconwhite}
            targetWindow={targetWindow}
            className={className}
            relkeyword = {relkeyword}
            onClick={clickUrl}
        >{btnLabel}</AnchorWithLink>
    } else if (showBtn) {  
        return <ButtonComp 
            className={className} 
            onClick={clickUrl} 
            disabled={isDisabled || false}
            refCallback = {isFunction(buttonRef) ? buttonRef : ''}
            id="guestLoginFormSubmit">
            {btnLabel}
        </ButtonComp>
    } else {
        return "";
    }
}

export default NavButton;
