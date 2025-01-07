/**
 * Get window object hash param values
 */
export const getWindowHash = () => {
    var hash = window.location.hash.substr(1);

    const result = hash.split('&').reduce(function (res, item) {
        const parts = item.split('=');
        res[parts[0]] = decodeURI(parts[1]);

        return res;
    }, {});

    return result;
}