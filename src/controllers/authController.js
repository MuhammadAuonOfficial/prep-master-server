const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/jwt');
const userService = require('../services/userService');
const tokenService = require('../services/tokenService');
const Response = require('../utils/response');

const register = async (req, res, next) => {
    try {
        const user = req.body;

        if (!user.email) {
            const response = Response.error('Email is required', 400);
            return res.status(response.statusCode).json(response);
        }

        if (!user.password) {
            const response = Response.error('Password is required', 400);
            return res.status(response.statusCode).json(response);
        }

        const hashedPassword = bcrypt.hashSync(user.password, 8);
        user.password = hashedPassword;

        const newUser = await userService.createUser(user);
        const token = generateToken(newUser);
        const response = Response.success('User created', { user: newUser, token }, 201);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const user = req.body;
        const existingUser = await userService.getUserByEmail(user.email);

        if (!existingUser) {
            const response = Response.error('Invalid Email or Password', 401);
            return res.status(response.statusCode).json(response);
        }

        const passwordIsValid = bcrypt.compareSync(user.password, existingUser.password);

        if (!passwordIsValid) {
            const response = Response.error('Invalid Email or Password', 401);
            return res.status(response.statusCode).json(response);
        };

        const existingToken = await tokenService.getTokenByUserId(existingUser.id);

        if (existingToken) {
            await tokenService.deleteTokenByUserId(existingUser.id);
        }

        const token = generateToken(existingUser);

        await tokenService.saveToken(existingUser.id, token, 'Bearer', new Date(Date.now() + 86400 * 1000));

        const response = Response.success('Login successful', { accessToken: token }, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const getUser = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const user = await userService.getUser(userId);
        const userWithoutPassword = { ...user, password: undefined};   
        const response = Response.success('User found', { user: userWithoutPassword }, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res, next) => {
    try {
        const userId = req.user.id;
        await tokenService.deleteTokenByUserId(userId);
        const response = Response.success('Logout successful', null, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    register,
    login,
    getUser,
    logout
};