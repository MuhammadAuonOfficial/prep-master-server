const userModel = require('../models/userModel');

const getUser = async (userId) => {
    if (!userId) {
        const error = new Error('User ID is required');
        error.statusCode = 400;
        throw error;
    }

    const user = await userModel.getUserById(userId);

    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    return user;
}

const getUsers = async () => {
    const users = await userModel.getUsers();

    return users;
}

const getUserByEmail = async (email) => {
    if (!email) {
        const error = new Error('Email is required');
        error.statusCode = 400;
        throw error;
    }

    const user = await userModel.getUserByEmail(email);

    return user;
}

const createUser = async (user) => {
    if (!user) {
        const error = new Error('User object is required');
        error.statusCode = 400;
        throw error
    }

    const newUser = await userModel.createUser(user);

    return newUser;
}

const updateUser = async (userId, user) => {
    if (!userId) {
        const error = new Error('User ID is required');
        error.statusCode = 400;
        throw error;
    }

    if (!user) {
        const error = new Error('User object is required');
        error.statusCode = 400;
        throw error;
    }

    const updatedUser = await userModel.updateUser(userId, user);

    return updatedUser;
}

const deleteUser = async (userId) => {

    if (!userId) {
        const error = new Error('User ID is required');
        error.statusCode = 400;
        throw error
    }

    await userModel.deleteUser(userId);

    return 'User deleted';
}

module.exports = {
    getUser,
    getUsers,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser
}