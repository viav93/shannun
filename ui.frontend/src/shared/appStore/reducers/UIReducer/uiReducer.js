import { combineReducers } from 'redux';
import ActionConstants from '../../actions/Common/actionConstants';

/**
 * Reducer Function Used to Handle the Loading Info Related Data
 * @param {*} state - State Object
 * @param {*} action - Object
 */
const loaderReducer = (state = { isLoading: false, loaderInstaceName : '' }, action = {}) => {
    switch (action.type) {
        case ActionConstants.SHOW_LOADER:
            return { ...state, isLoading: true, loaderInstaceName : action.value };
        case ActionConstants.HIDE_LOADER:
            return { ...state, isLoading: false };
        default:
            return state;
    }
};

/**
 * Ui Data Reducer Composition
 */
const uiDataReducer = combineReducers({
    loaderInfo: loaderReducer
});

// Default Export
export default uiDataReducer;