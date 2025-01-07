import React, { Component } from 'react';
import ImageCompItems from '../Presentation/ImageCompItems';

/**
 * Image Component Container
 */
class ImageComponent extends Component {
    render() {
        return (
            <ImageCompItems
                {...this.props}
            />
        );
    }
}

// default export
export default ImageComponent;