import ActionConstants from './actionConstants';

/**
 * Common Action Used to dispatch the action
 * @param {*} mtype - Action Type
 * @param {*} value - Object
 */
export const Action = (mtype, value) => {
    return { type: mtype, value };
};

/**
 * Action Creator Used to Show the Loading of Data
 */
export const initLoadingData = (loaderInstaceName) => dispatch => {
    dispatch(Action(ActionConstants.SHOW_LOADER, loaderInstaceName));
};

/**
 * Action Creator Used to hide the Loading of Data
 */
export const hideLoadingData = () => dispatch => {
    dispatch(Action(ActionConstants.HIDE_LOADER));
};