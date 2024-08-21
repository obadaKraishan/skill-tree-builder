const mongoose = require('mongoose');

const SkillNodeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode' }]
});

const SkillNode = mongoose.model('SkillNode', SkillNodeSchema);

const SkillTreeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    rootNode: { type: mongoose.Schema.Types.ObjectId, ref: 'SkillNode' }
});

const SkillTree = mongoose.model('SkillTree', SkillTreeSchema);

module.exports = { SkillTree, SkillNode };
