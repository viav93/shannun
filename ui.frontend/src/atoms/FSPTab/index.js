import React, { useState } from "react";

const TabItem = ({tabLabel = '', tabItemIndex, activeItemIndex, setActiveIndex}) => {
    const isActive = tabItemIndex === activeItemIndex;
    return <li onClick={(e) => setActiveIndex(tabItemIndex)} role="tab" aria-controls={`tabpanel-${tabItemIndex}`} aria-selected={isActive ? "true" : "false"} className={isActive ? "active" : ""} data-tab={`tab${tabItemIndex-1}`}>{tabLabel}</li>
}

export const FSPTab = ({ }) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const tabItemArr = ["Round trip", "one way", "Multicity"]
    return <div className="ey-tabs" id="ey-tabs">
        <ul className="ey-tab-menu" role="tablist" aria-labelledby="tablist-1">
            {tabItemArr.map((tabItem, tabIndex) => <TabItem tabLabel={tabItem} tabItemIndex={tabIndex} activeItemIndex={activeIndex} setActiveIndex={setActiveIndex} />)}
        </ul>
        <div className="ey-tab-content">
            <div id="tabpanel-1" className="ey-tab-content-panel" role="tabpanel" tabIndex="0" aria-labelledby="tab-1" data-tab="tab0">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam ex optio molestiae deleniti
                    accusantium nobis hic, quia, quaerat ipsa numquam, eius expedita odit earum. Dolores dolore iusto
                    est earum praesentium?</p>
            </div>
        </div>
        <div id="tabpanel-2" className="ey-tab-content-panel" role="tabpanel" tabIndex="1" aria-labelledby="tab-2" data-tab="tab1" style={{display: 'none'}}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, sit, velit mollitia pariatur
                laudantium officia, fugit neque eligendi saepe sint ea! Debitis aperiam nulla voluptatem libero fuga
                a, veniam amet.</p>
        </div>
        <div id="tabpanel-3" className="ey-tab-content-panel" role="tabpanel" tabIndex="2" aria-labelledby="tab-3" data-tab="tab2" style={{display: 'none'}}>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi magnam porro iure fugiat
                repellendus iusto aperiam ducimus laudantium alias omnis maiores beatae veniam debitis voluptatibus
                asperiores, voluptates nostrum nihil quae?</p>
        </div>
    </div>
}