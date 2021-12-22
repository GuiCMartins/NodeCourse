const router = require('express').Router();
const versionRoute = require('../version')

router.use('/v1', versionRoute);

module.exports = router