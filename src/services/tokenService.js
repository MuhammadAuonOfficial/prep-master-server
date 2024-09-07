const TokenModel = require('../models/tokenModel');

const TokenService = {
    saveToken: async (userId, token, tokenType, expiresAt) => {
        const newToken = await TokenModel.createToken({ userId, token, tokenType ,expiresAt });
        return newToken;
    },

    getTokenByUserId: async (userId) => {
        const token = await TokenModel.getTokenByUserId(userId);
        return token;
    },

    deleteTokenByUserId: async (userId) => {
        await TokenModel.deleteTokenByUserId(userId);
    },
}

module.exports = TokenService;