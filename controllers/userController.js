const { User, Thought } = require('../models');

// GET all users
const getUsers = async (req, res) => {
    try {
        const userData = await User.find();
        res.json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// GET a single users with thought and friend data
const getSingleUser = async (req, res) => {
    try {
        const userData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('thoughts')
            .populate('friends');
        !userData 
            ? res.status(404).json({ message: 'No user found with that ID' }) 
            : res.json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// POST a new user
const createUser = async (req, res) => {
    try {
        const userData = await User.create(req.body);
        res.json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// PUT to update a user by its _id
const updateUser = async (req, res) => {

}

// DELETE a user by its _id
const deleteUser = async (req, res) => {

}

// POST to add a new friend to a user's friend list
const addFriend = async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        );
        !userData 
            ? res.status(404).json({ message: 'No user found with that ID' }) 
            : res.json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
}

// DELETE to remove a friend from a user's friend list
const deleteFriend = async (req, res) => {
    try {
        const userData = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        !userData 
            ? res.status(404).json({ message: 'No user found with that ID' }) 
            : res.json(userData);
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports = { getUsers, getSingleUser, createUser, updateUser, deleteUser, addFriend, deleteFriend };