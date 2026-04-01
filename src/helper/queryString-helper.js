export const parseQuery = function (_url) {
    if (!_url) return {};
    const arr = _url.split("?");
    if (arr && arr.length > 1) {
        const dataQuery = arr[1];
        const arrQuery = dataQuery.split("&");
        let queryObj = {};
        arrQuery.forEach(element => {
            const key_value = element.split("=");
            queryObj = { ...queryObj, [key_value[0]]: key_value[1] }
        });
        return queryObj;
    }
    return {};
};