const express = require('express');
const itunesRouter = require('./itunes');

const router = express.Router();

router.use('/itunes', itunesRouter);

module.exports = router;
