const express = require('express');
const { search } = require('../controllers/itunes');

const router = express.Router();


router.get('/', search);

module.exports = router;
