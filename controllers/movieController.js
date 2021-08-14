const express = require('express');
const fetch = require('node-fetch');
const { isEmpty, not } = require('ramda');
const { ombdUrlBuilder, isLegalQueryParams, extractIllegalKeySearch } = require('../common/utils');
const { unkownFilters } = require('../constants/response');

const router = express.Router();

const searchValidation = async (req, res, next) => {
    const illegalSearchKeys = extractIllegalKeySearch(req.query);

    if (not(isEmpty(illegalSearchKeys))) {
        return res.send(unkownFilters(illegalSearchKeys));
    }
    next();
}

router.get('/search', searchValidation, async (req, res) => {
    return await fetch(ombdUrlBuilder(req.query))
        .then(r => r.json())
        .then(r => res.send(r))
        .catch(e => R.send(e));
});


module.exports = router