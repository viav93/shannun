import React from 'react'

export const FSPProfileTabView = ({ data, setStatus, realData }) => {
    
    return <>
        <li role="tab" aria-controls="tabpanel-1" onClick={() => setStatus(data?.name)} aria-selected="true" className={data?.isActive ? 'active' : ''}>{data?.name}</li>
    </>
}