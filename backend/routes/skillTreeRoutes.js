const express = require('express');
const { getSkillTree, createSkillTree } = require('../controllers/skillTreeController');

const router = express.Router();

router.get('/skill-trees/:userId', getSkillTree);
router.post('/skill-trees', createSkillTree);

module.exports = router;
