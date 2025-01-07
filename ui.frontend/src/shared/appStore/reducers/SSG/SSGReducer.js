import SSGConstants from '../../actions/SSG/SSGConstants';

/**
 * Initial Pnr Look Up State Data
 * Used to store the Initial State for aemData
 */
const initialSSGState = {
    tripData: null,
    isLoading: false,
    onboardWifiTripData: null,
    errorCode: null
};

/**
 * SSG Data Reducer Function Used to Handle
 * the SSG Related Information
 * @param {*} state - State Object
 * @param {*} action - Action Object
 */
const SSGReducer = (state = initialSSGState, action = {}) => {
    switch (action.type) {
        case SSGConstants.SET_LOADING_STATUS: {
            return { ...state, isLoading: action.value, errorCode: null }
        }
        case SSGConstants.SET_TRIP_DATA_fOR_WIFI: {
            return {...state, onboardWifiTripData: action.value, errorCode: null}
        }
        case SSGConstants.SET_ERROR_STATUS: {
            return {...state, errorCode: action.value}
        }
        default:
            return state;
    }
}

export default SSGReducer;