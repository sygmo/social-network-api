const { User, Thought, Reaction } = require('../models');

// GET all thoughts
const getThoughts = async (req, res) => {
    try {
        const thoughtData = await Thought.find();
        res.json(thoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// POST a new thought
const createThought = async (req, res) => {
    try {
        const thoughtData = await Thought.create(req.body);
        const userData = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thoughtData._id } },
            { new: true }
        );
        res.json(thoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { getThoughts, createThought };