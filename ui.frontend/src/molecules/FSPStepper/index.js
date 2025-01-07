import React from 'react'
import { useState } from 'react';
import { FSPSteps } from './FSPSteps';

export const COMPLETED = 'completed';

export const FSPStepper = ({ props }) => {
    const data = [
        {
            title: 'Flying from?',
            name: 'Departures',
            status: '',
            content: 'Hi! , you need to fill the departure details'
        },
        {
            title: 'Flying to?',
            name: 'Destinations',
            status: '',
            content: 'Hi! , you need to fill the destination details'
        },
        {
            title: 'Travelling when?',
            name: 'Add dates',
            status: '',
            content: 'Hi! , you need to fill the dates'
        },
        {
            title: "Who's travelling?",
            name: 'Add passengers',
            status: '',
            content: 'Hi! , you need to fill the passenger details'
        }
    ]
    const [realData, setRealData] = useState(data)
    const [toggle, setToggle] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0);

    const setManualStatus = (stepIndex) => {
        //set active status to clicked step, if the step is already completed or previous step is already completed
        if (realData[stepIndex]?.status === COMPLETED || realData[stepIndex-1]?.status === COMPLETED) {
            setActiveIndex(stepIndex);
        }
    }

    const setStatus = (stepIndex) => {
        realData[stepIndex] = { ...realData[stepIndex], status: COMPLETED };
        if (stepIndex < realData.length - 1) {
            realData[stepIndex + 1] = { ...realData[stepIndex + 1] }
        }

        setRealData(realData);
        setActiveIndex(stepIndex + 1);
    }

    const getLength = () => {
        const fI = realData?.findIndex(e => e.isActive === true);
        const len = realData?.length;
        return `Steps ${fI + 1}/${len}`;
    }

    const makeToggle = () => {
        setToggle(!toggle)
    }

    const isLastStep = () => {
        return activeIndex === realData.length - 1;
    }

    const moveStep = () => {
        if (!isLastStep()) {
            setStatus(activeIndex);
        }
    }

    return (
        <>
            <div className={`ey-stepper ${toggle ? 'active' : ''}`}>
                <div className="ey-row ey-no-gutter stepper--desktop hide-xs show-md" >
                    {realData?.map((each, index) => {
                        return (
                            <FSPSteps data={each} setStatus={setManualStatus} realData={realData} key={index} stepIndex={index} activeIndex={activeIndex} />
                        )
                    })}
                </div>
                <div className="ey-row ey-no-gutter stepper--mobile hide-md" onClick={() => makeToggle()}>
                    <div className="ey-column ey-column-xs-3 ey-text-start">
                        <div className="ey-font__text--small">{getLength()}</div>
                    </div>
                    <div className="ey-column ey-column-xs-8 ey-text-end">
                        <div className="stepper-container ey-row">
                            {realData?.map((each, index) => {
                                return (
                                    <div key={index} className={`ey-column stepper--horizontal ${each?.isActive ? 'active' : each?.status}`} tabIndex="0" role="button"></div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p key={activeIndex}>
                    {realData[activeIndex]?.content}
                </p>
                <button className="ey-button" type="button" onClick={() => { moveStep() }}>Move to next step</button>
            </div>
        </>
    );
}

