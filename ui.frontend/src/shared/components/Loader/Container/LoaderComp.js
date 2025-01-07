import React, { Component } from 'react';
import ImageComponent from 'shared/components/Image';
import LoaderImage from 'shared/staticAssets/images/flight_flown.svg';

/**
 * Loader Component Used to Display the Loading Image
 */
class LoaderComp extends Component {
    /**
     * Method to return loader jsx
     */
    getLoader = (loadingText) => {
        return (
            <div class="loader-container-bg">
                <div class="loader-component">
                    <ImageComponent className="flight-figure" srcFile={LoaderImage} />
                    <div class="lds-ring">
                        <svg viewBox="0 0 100 100">
                            <circle class="shannun-spinner" cx="50" cy="50" r="45" />
                        </svg>
                        {(loadingText && <div className="loader-text">{loadingText}</div>) || null}
                    </div>
                </div>
            </div>);
    }
    render() {
        const { loadingText = '', isLoadingFlag = false } = this.props;
        let renderElement = null;
        if (isLoadingFlag) {
            renderElement = this.getLoader(loadingText);
        }
        return (<div>{renderElement}</div>);
    }
}

// Default Export of the Loader Component
export default LoaderComp;