import React from 'react';
import { Image } from 'react-bootstrap';
import CONSTANTS from '../../Constants/AtomConstants'

/**
 * Image Component Items JUST a View
 * @param {*} props - Object
 */
const imageCompItems = props => {

    let { srcFile, altText = '', isResponsive, className='', ...rest } = props;
    const { configValues: { disableLazyLoad = 'false', imWidth: configuredImWidth = "", enableIMWidth: enableFlag = false} = {} } = window || {};
    const lazyClass = disableLazyLoad === 'true' ?  className : className+ " lazy-background";
    
    let imWidth = configuredImWidth.split(',') || [320, 480, 768, 1024, 1360];

    /**
     * Method to process relative next immediate defined width in AKAMAI image manager
     * defined width is taken from window variable imWidth => which is derived from configValues.imWidth or default width array [320, 480, 768, 1024, 1360]
     * @param {integer} givenWidth 
     * @return {interger} finalWidth
     */
    function findRelativeWidth(givenWidth) {
        var finalWidth = givenWidth;
        for (var i = 0; i < imWidth.length; i++) {
            if (parseInt(imWidth[i]) - givenWidth >= 0) {
            finalWidth = parseInt(imWidth[i]);
            break;
            }
        }
        return finalWidth;
    }

    if (enableFlag) {
        var eWidth = window.innerWidth;
        eWidth = findRelativeWidth(eWidth);
        let testSvg = srcFile.search(CONSTANTS.SVG);

        if(srcFile){
            if(testSvg<0){
                srcFile = srcFile + CONSTANTS.IMWIDTH + eWidth;
            }
        }
    }
    
    // When SRC File is empty then No Need to render the IMage tag Itself
    if (srcFile) {
        return (
            <Image
                src={srcFile}
                responsive={isResponsive || false}
                className={lazyClass || ''}
                alt={altText || ''}
                {...rest}
            />
        );
    }
    return null;
};

// default export
export default imageCompItems;