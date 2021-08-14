const { reduce, filter, not, includes } = require('ramda')
const { MOVIES_API, API_KEY, FILTER_OPTIONS } = require('../constants/constants')

const urlByApi = (baseUrl) => (queryParams = {}) => reduce(
    (url, [key, value]) => `${url}&${key}=${value}`,
    baseUrl,
    Object.entries(queryParams)
);

const extractIllegalKeySearch = (queryParams) => Object.fromEntries(
    filter(
        ([k]) => not(includes(k, FILTER_OPTIONS)),
        Object.entries(queryParams)
    )
);

const ombdUrlBuilder = urlByApi(`${MOVIES_API}?apikey=${API_KEY}`);

module.exports = Object.freeze({
    ombdUrlBuilder,
    extractIllegalKeySearch
})