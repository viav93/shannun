import { combineReducers } from 'redux';

/**
 * UI Reducer Used to hanlde the Information Related to UI Related Data
 */
import uiReducer from './UIReducer/uiReducer';

/**
 * SSG Reducer
 */
import SSGReducer from './SSG/SSGReducer';

/**
 * Component level reducers goes here
 */
const appDataReducer = combineReducers({
    ssgData: SSGReducer
});

/**
 * Reducers combined and passed to store
 */
const RootReducer = combineReducers({
    appData: appDataReducer,
    uiData: uiReducer
});

// Export Default
export default RootReducer;
