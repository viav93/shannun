import React from 'react'
import { useState } from 'react';
import { FSPProfileTabView } from './FSPProfileTabView';

export const FSPProfileTabs = ({props}) => {
    const data = [
        {
            name: 'About',
            isActive: true,
            content: 'Hi! , Its about you section section'
        },
        {
            name: 'Trips',
            isActive: false,
            content: 'Hi! , Its about your trips section'
        },
        {
            name: 'Miles',
            isActive: false,
            content: 'Hi! , Its about your miles section'
        },
        {
            name: 'Benefits',
            isActive: false,
            content: 'Hi! , Its about your benefits section'
        }
    ]
    const [realData, setRealData] = useState(data)
    const getStatus = (val) => {
        if (val) {
            const newState = realData.map(obj => {
                if (obj.name === val) {
                    obj = { ...obj, isActive: true };
                } else {
                    obj = { ...obj, isActive: false };
                }
                return obj;
            });

            setRealData(newState);
        }
    }
     
    return (
        <>
            <div className="ey-row ey-tabs ey-tabs--vertical" id="ey-tabs">
                <div className="ey-column ey-column-xs-12 ey-column-sm-2 ey-column-md-2 ey-column-lg-2">
                    <ul className="ey-tab-menu" role="tablist" aria-labelledby="tablist-1">
                        {realData?.map((each, index) => {
                            return (
                                <FSPProfileTabView data={each} setStatus={getStatus} realData={realData} key={index}/>
                            )
                        })}
                    </ul>
                </div>
                <div className="ey-column ey-column-xs-12 ey-column-sm-10 ey-column-md-10 ey-column-lg-10">
                    <div className="ey-tab-content">
                        {realData?.map((each, index) => {
                            return (
                                <div key={index} id="tabpanel-1" className="ey-tab-content-panel" role="tabpanel" tabIndex="0" aria-labelledby="tab-1">
                                    <p>{each?.isActive ? each?.content : ''}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

