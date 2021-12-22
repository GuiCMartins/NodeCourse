const router = require('express').Router();
const tourRoute = require('../tour')

router.use('/tours', tourRoute);

module.exports = router