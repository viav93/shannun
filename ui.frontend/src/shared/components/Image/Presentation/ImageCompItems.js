import React from 'react';
import { Image } from "react-bootstrap";

/**
 * Image Component Items JUST a View
 * @param {*} props - Object
 */
const ImageCompItems = (props) => {
    const { srcFile, altText = '', isResponsive, ...rest } = props;
    // When SRC File is empty then No Need to render the IMage tag Itself
    if (srcFile) {
        return (
            <Image
                src={srcFile}
                responsive={isResponsive || false}
                alt={altText || ''}
                {...rest}
            />
        );
    }
    return null;
};

// default export
export default ImageCompItems;