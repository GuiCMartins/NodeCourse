const router = require('express').Router();
const tourRoute = require('../tour')

router.use('/tour', tourRoute);

module.exports = router