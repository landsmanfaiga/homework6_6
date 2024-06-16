const router = require('express').Router();

const participantRoutes = require('./participants');
const billRoutes = require('./bills');

router.use('/participants', participantRoutes);
router.use('/bills', billRoutes);

module.exports = router;

