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

// DELETE a user by its _id

module.exports = { getUsers, createUser };