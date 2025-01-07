import SSGConstants from './SSGConstants';
import { postDataRequest } from 'shared/services/ApiDAL';
import { Action } from '../Common/action';
import { getHTMLLanguage } from 'shared/utils/Utility/Language'

const getConfigValue = (configKey) => {
    const { configValues = {} } = window || {};
    if (configKey && configValues[configKey]) {
        return configValues[configKey];
    }

    return undefined;
}
const apiMaxExecution = "apiMaxExecution";

export const getTriprDataForWifi = (tripDataForWifiAPIURL, recordLocator, lastName, firstName) => async dispatch => {
    try {
        const langValue = getHTMLLanguage();
        const payload = {};
        payload.language = langValue.toLowerCase();
        payload.recordLocator = recordLocator;
        payload.lastName = lastName;
        if (firstName) {
            payload.firstName = firstName;
        }
        
        if (tripDataForWifiAPIURL && (payload.recordLocator && payload.lastName)) {
            dispatch(Action(SSGConstants.SET_LOADING_STATUS, true));
            const tripData = await postDataRequest(tripDataForWifiAPIURL, payload, false, getConfigValue(apiMaxExecution));
            const { isSuccess, successResponse } = processAPIResponse(tripData);

            if (isSuccess) {
                dispatch(Action(SSGConstants.SET_LOADING_STATUS, false));
                return dispatch(Action(SSGConstants.SET_TRIP_DATA_fOR_WIFI, successResponse));
            }
        } else {
            //redirect's to ssg home page if parameters not found
            dispatch(Action(SSGConstants.SET_LOADING_STATUS, false));
            dispatch(Action(SSGConstants.SET_ERROR_STATUS, SSGConstants.API_URL_NOT_FOUND));
        }
    } catch (error) {
        dispatch(Action(SSGConstants.SET_LOADING_STATUS, false));
        const { errorDetailsObj: { code: errorCode = "" } } = processAPIResponse(error);
        dispatch(Action(SSGConstants.SET_ERROR_STATUS, errorCode));
    }
}

export const processAPIResponse = (data) => {
    const { data: successResponse, response: errorResponse } = data || {};
    const { data: errorData } = errorResponse || {};
    const responseData = successResponse || errorData || null;
    let isSuccess = true;
    let errorDetailsObj = {};

    //defult browser failures
    if (responseData === null) {
        isSuccess = false;
    }

    if (responseData && responseData.apiErrors
        && responseData.apiErrors instanceof Array
        && responseData.apiErrors.length > 0) {
        isSuccess = false;
        errorDetailsObj = responseData.apiErrors[0];
    }
    return { isSuccess: isSuccess, errorDetailsObj: errorDetailsObj, successResponse: successResponse }
}

export const setLoaderAction = (isLoading) => async dispatch => {
    dispatch(Action(SSGConstants.SET_LOADING_STATUS, isLoading));
}