import { createSelector } from 'reselect';

const appDataSel = state => state.appData;

const getSSGSel = createSelector(
    [appDataSel],
    appData => appData.ssgData || {}
)

export const getTripDataForWifiSel =  createSelector(
    [getSSGSel],
    ssgData => (ssgData && ssgData.onboardWifiTripData) || {}
) 

export const getIsLoadingSel = createSelector(
    [getSSGSel],
    ssgData => ssgData.isLoading
)

export const getErrorCodeSel = createSelector(
    [getSSGSel],
    ssgData => ssgData.errorCode || null
)