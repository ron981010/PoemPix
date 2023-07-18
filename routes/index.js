const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/users', require('./users'));
router.use('/poems', require('./poems'));
router.use('/ratings', require('./ratings'));
router.use('/favorites', require('./favorites'));


module.exports = router;
