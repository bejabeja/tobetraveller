const { jsonResponse } = require('../lib/jsonResponse');

const router = require('express').Router();

router.get('/', (res, req) => {
    res.status(200).json(
        jsonResponse(
            200,
            req.user
        )
    )
})

module.exports = router