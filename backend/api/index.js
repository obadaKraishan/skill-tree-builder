const express = require('express');
const skillTreeRoutes = require('../routes/skillTreeRoutes'); // Adjust the path if needed

const router = express.Router();

router.use('/skill-trees', skillTreeRoutes);

module.exports = router;
