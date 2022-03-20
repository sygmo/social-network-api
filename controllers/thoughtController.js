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

// GET as single thought by its id
const getSingleThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v');
        !thoughtData 
            ? res.status(404).json({ message: 'No thought found with that ID' }) 
            : res.json(thoughtData);
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

// PUT to update a thought by its _id
const updateThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true }
        );
        !thoughtData 
            ? res.status(404).json({ message: 'No thought found with that ID' }) 
            : res.json(thoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// DELETE a thought by its _id
const deleteThought = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
        !thoughtData 
            ? res.status(404).json({ message: 'No thought found with that ID' }) 
            : res.json(thoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// POST to add a reaction to a thought
const addReaction = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { new: true }
        );
        !thoughtData 
            ? res.status(404).json({ message: 'No thought found with that ID' }) 
            : res.json(thoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// DELETE to remove a reaction from a thought
const deleteReaction = async (req, res) => {
    try {
        const thoughtData = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        !thoughtData 
            ? res.status(404).json({ message: 'No thought found with that ID' }) 
            : res.json(thoughtData);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, deleteReaction };