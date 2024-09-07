const userService = require('../services/userService');
const Response = require('../utils/response');

const getUser = async (req, res, next) => {
    try {
        const user = await userService.getUser(req.params.id);
        if (!user) {
            const response = Response.error('User not found', null, 404);
            return res.status(response.statusCode).json(response);
        }
        const response = Response.success('User found', user, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}

const getUsers = async (req, res, next) => {
    try {
        const users = await userService.getUsers();
        const response = Response.success('Users found', users, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const createUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        const response = Response.success('User created', user, 201);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const user = await userService.updateUser(req.params.id, req.body);
        const response = Response.success('User updated', user, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        await userService.deleteUser(req.params.id);
        const response = Response.success('User deleted', null, 204);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser
};