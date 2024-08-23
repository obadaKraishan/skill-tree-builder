const express = require('express');
const skillTreeRoutes = require('../routes/skillTreeRoutes');

const router = express.Router();

router.use('/skill-trees', skillTreeRoutes);

module.exports = router;
