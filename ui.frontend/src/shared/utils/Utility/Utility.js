import { isEmpty, omit, cloneDeep } from "lodash";

/**
 * @param {*} data 
 * Checks an array of data 
 */
export const isEmptyCheck = (data) => {
    if (data) {
        return isEmpty(data);
    } else {
        return null;
    }
}

/**
 * Used to get the all query parameters
 */
export const findAllQueryParameter = () => {
    const params = {};
    const location = window && window.location;
    const query = location.search.substring(1);
    if (query !== "") {
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            params[pair[0]] = decodeURIComponent(pair[1]);
        }
    }
    return params;
};

/**
 * This Utility Function is used to check the Whether the Parameter is Javascript function or not.
 * @param {*} functionToCheck - Function Object
 */
export const isFunction = (functionToCheck) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

/**
* Static Property For Open Window Option
* Set _blank default as Browser Default Option
* Set popup to open in a new window for popup send framename
*/
export const getOpenWindowOption = (inwindow) => {
    const GETWINDOW = {
        _blank: "_blank",
        _parent: "_parent",
        _self: "_self",
        _top: "_top",
        popup: "popup"
    }
    return (GETWINDOW[inwindow] || GETWINDOW._self);
};

/**
* Static Property For New Window Option
* Set _blank default as Browser Default Option
*/
export const getNewWindowIconFlag = (inwindow) => {
    if (getOpenWindowOption(inwindow) === "_blank") {
        return true;
    }
    return false;
};

/**
 * 
 * @param {*} data
 * @param {*} unUsedData
 * omits a given object 
 */
export const omitObject = (data, ...unUsedData) => {
    if (data && unUsedData) {
        return omit(data, ...unUsedData);
    } else {
        return null;
    }
}

/**
 * 
 * @param {*} data
 * Deepclones a given object 
 */
export const deepClone = (data) => {
    if (data) {
        return cloneDeep(data);
    } else {
        return null;
    }
}

/**
 * This utility returns device detail
 * isNotDesktop : false for Desktop
 * isNotDesktop: true for Mobile, Tablet and Small Desktop
 */
export const desktopCheck = () => {
    let $isNotDesktop = true;
    const w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = documentElement.clientWidth || body.clientWidth || w.innerWidth;
    if (width >= 1200) {
        $isNotDesktop = false;
    }
    return $isNotDesktop;
}

/**
 * This utility returns device detail
 * isMobile : false for Desktop
 * isMobile: true for Mobile
 */

export const MobileCheck = () => {
    let $isMobile = false;
    const w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = documentElement.clientWidth || body.clientWidth || w.innerWidth;
    if (width < 768) {
        $isMobile = true;
    }
    return $isMobile;
}

/**
 * This utility returns device detail
 * isMobile : false for Desktop
 * isMobile: true for Mobile
 */

export const TabletCheck = () => {
    let $isTablet = false;
    const w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    if ((width < 1025) && !MobileCheck) {
        $isTablet = true;
    }
    return $isTablet;
}

/**
 * Method to determine if app is running in mobileView or desktop
 */
const isTabletDevice = () => {
    if ((window && window.screen && window.screen.width < 1025)
        || (window.matchMedia && window.matchMedia('only screen and (max-width: 1024px)').matches)) {
        return true;
    }
    return false;
}

/**
 * Method to determine if app is running in mobileView or desktop
 */
export const isMobileDevice = () => {
    if ((window && window.screen && window.screen.width < 768)
        || (window.matchMedia && window.matchMedia('only screen and (max-width: 767px)').matches)) {
        return true;
    }
    return false;
}

/**
 * This Utility Will Give the Mobile Mode Information Based on the 
 * Information of the Screen Width.
 */
export const getMobileViewMode = () => (MobileCheck() || isMobileDevice())
export const getDeviceView = () => (desktopCheck())
export const getTabletViewMode = () => ((TabletCheck() || isTabletDevice()) && !getMobileViewMode())

/**
 * Used to Check Array
 */
export const isArray = (x) => {
    return x.constructor.toString().indexOf("Array") > -1;
}

export function validateURL(url) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return pattern.test(url);
}