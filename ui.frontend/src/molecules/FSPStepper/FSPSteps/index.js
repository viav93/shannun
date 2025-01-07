import React from 'react'
const COMPLETED = 'completed';

export const FSPSteps = ({ data, setStatus, realData, stepIndex, activeIndex }) => {
    const isPointer = (stepIndex) => {
        const checkData = realData[stepIndex];
        if (checkData?.status === COMPLETED || realData[stepIndex-1]?.status === COMPLETED) {
            return '';
        } else {
            return 'none';
        }

    }
    return <>
        <div className={`ey-column ey-column-xs-12 ey-column-sm-12 ey-column-md-${12/realData.length} ey-column-lg-${12/realData.length}`}>
            <div className={`stepper--horizontal ${data?.status} ${activeIndex === stepIndex ? 'active' : ''}`} tabIndex="0" style={{ pointerEvents: isPointer(stepIndex) }} role="button" onClick={() => setStatus(stepIndex)}>
                <div className="ey-row">
                    <div className="ey-column ey-text-start align-center">
                        <div className="ey-display--flex">
                            <div className="circle">
                                <img src="/assets/images/passenger.svg" alt="" title="" />
                            </div>
                            <div className="details ey-margin__left--8">
                                <h3 className="ey-font__book--xsmall">
                                    {data?.title}
                                </h3>
                                <p className="ey-font__body--medium">
                                    {data?.name}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="ey-column ey-text-end align-center">
                        <div className="path"></div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
