const fs = require('fs');
const path = require('path');

const skillTreesPath = path.join(__dirname, '../data/skillTrees.json');

const getSkillTree = (req, res) => {
    const { userId } = req.params;

    fs.readFile(skillTreesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading skill trees data' });
        }
        const skillTrees = JSON.parse(data);
        const skillTree = skillTrees.find(tree => tree.userId === userId);

        if (!skillTree) {
            return res.status(404).json({ message: 'Skill tree not found' });
        }

        res.json(skillTree);
    });
};



const createSkillTree = (req, res) => {
    const { userId, title } = req.body;
    const newSkillTree = {
        userId,
        rootNode: {
            _id: generateId(),
            title,
            children: []
        }
    };

    // Read and update skill trees data in JSON file
    fs.readFile(skillTreesPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Error reading skill trees data' });
        }
        const skillTrees = JSON.parse(data);
        skillTrees.push(newSkillTree);

        fs.writeFile(skillTreesPath, JSON.stringify(skillTrees, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error writing skill trees data' });
            }
            res.status(201).json(newSkillTree);
        });
    });
};

function generateId() {
    return Math.random().toString(36).substr(2, 9); // Simple ID generator
}

module.exports = { getSkillTree, createSkillTree };
