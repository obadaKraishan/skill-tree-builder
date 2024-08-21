const { SkillTree, SkillNode } = require('../models/SkillTree');

const getSkillTree = async (req, res) => {
    const { userId } = req.params;

    try {
        const skillTree = await SkillTree.findOne({ userId }).populate('rootNode');
        if (!skillTree) {
            return res.status(404).json({ message: 'Skill tree not found' });
        }

        res.json(skillTree);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createSkillTree = async (req, res) => {
    const { userId, title } = req.body;

    try {
        const rootNode = new SkillNode({ title });
        await rootNode.save();

        const skillTree = new SkillTree({ userId, rootNode });
        await skillTree.save();

        res.status(201).json(skillTree);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getSkillTree, createSkillTree };
