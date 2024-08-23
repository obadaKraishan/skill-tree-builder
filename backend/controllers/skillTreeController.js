let skillTrees = []; // This will hold all skill trees in memory

const getSkillTree = async (req, res) => {
    const { userId } = req.params;
    const skillTree = skillTrees.find(tree => tree.userId === userId);
    if (!skillTree) {
        return res.status(404).json({ message: 'Skill tree not found' });
    }
    res.json(skillTree);
};

const createSkillTree = async (req, res) => {
    const { userId, title } = req.body;
    const newSkillTree = {
        userId,
        rootNode: {
            _id: generateId(),
            title,
            children: []
        }
    };
    skillTrees.push(newSkillTree);
    res.status(201).json(newSkillTree);
};

function generateId() {
    return Math.random().toString(36).substr(2, 9); // Simple ID generator
}

module.exports = { getSkillTree, createSkillTree };
