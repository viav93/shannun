import React, { Fragment } from 'react';
import { getOpenWindowOption, getNewWindowIconFlag, isFunction, validateURL } from 'shared/utils/Utility/Utility';
import newwindowicon1 from 'shared/staticAssets/images/open-in-new-window-1.svg';
import newwindowicon2 from '../../../shared/staticAssets/images/open-in-new-window-2.svg';
import newwindowicon3 from 'shared/staticAssets/images/open-in-new-window-white.svg';
import ImageComponent from '../../../shared/components/Image';

export const AnchorWithLink = (props) => {
    const { href = '#', children, targetWindow, relkeyword = '', doNotShowHref = false, clickHandler,
        shownewwindowicon = false, shownewwindowanchoricon = false, shownewwindowiconwhite = false, additionalChild = null, className = "", ...rest } = props;
    const istargetNewWindow = ((!doNotShowHref && getNewWindowIconFlag(targetWindow)) || false);

    const relAttr = {};
    // If relkeyword is not empty /follow then add its value in rel attribute
    if (relkeyword && !['follow', 'undefined'].includes(relkeyword)) {
        relAttr['rel'] = relkeyword.toLowerCase();
    }
    let imgComp = null;
    if (istargetNewWindow) {
        let icon = null;
        if (shownewwindowicon) {
            icon = newwindowicon1;
        } else if (shownewwindowanchoricon) {
            icon = newwindowicon2;
        } else if (shownewwindowiconwhite) {
            icon = newwindowicon3;
        } else {
            // do nothing
        }

        /**
         * SPECNP-13201 | Hide Travel Bank link from Logged in Popup, when 0 travel bank balance
         * SPECNP-13245 | Travel bank FAQ label and arrow icon displayed, when travel bank link is not configured from AEM
         * AC: 2 --> When the link is hidden or not configured, no icons should be displayed. Currently the icons show
         */
        if (validateURL(href)) {
            imgComp = (
                <Fragment>
                    {' '}
                    <ImageComponent
                        className="icon"
                        srcFile={icon}
                        alt="">
                    </ImageComponent>
                    <span className="sr-only">opens in new window</span>
                </Fragment>
            );
        }
    }
    const hrefData = {};
    if (!doNotShowHref) {
        hrefData.href = (href || '#')
    }
    const onClickHandler=()=>{
        if(clickHandler && isFunction(clickHandler)){
            clickHandler();
        }

    }
    return (
        <Fragment>
            <a {...hrefData}
                target={targetWindow ? getOpenWindowOption(targetWindow) : ""}
                {...relAttr}
                {...rest}
                onClick={onClickHandler}
                className={className ? className : "link"}
            >
                {children}
                {imgComp}
                {additionalChild}
            </a>
        </Fragment>
    )
}


// Default Export
export default AnchorWithLink;