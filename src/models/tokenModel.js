const sql = require('mssql');
const { poolPromise } = require('../database/db');
const mapFields = require('../utils/fieldMapper');

const schema = {
    tableName: 'UserTokens',
    columns: {
        id: 'Id',
        userId: 'UserId',
        token: 'Token',
        tokenType: 'TokenType',
        ExpiresAt: 'ExpiresAt',
        created: 'CreatedAt',
        RevokeAt: 'RevokeAt'
    }
};

const fieldMapping = {
    [schema.columns.id]: 'id',
    [schema.columns.userId]: 'userId',
    [schema.columns.token]: 'token',
    [schema.columns.tokenType]: 'tokenType',
    [schema.columns.ExpiresAt]: 'expiresAt',
    [schema.columns.created]: 'createdAt',
    [schema.columns.RevokeAt]: 'revokeAt'
};

class TokenModel {
    constructor() {
        this.pool = poolPromise;
    }

    async createToken(token) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('userId', sql.Int, token.userId)
                .input('token', sql.NVarChar, token.token)
                .input('tokenType', sql.NVarChar, token.tokenType)
                .input('expiresAt', sql.DateTime, token.expiresAt)
                .query(`INSERT INTO ${schema.tableName} (${schema.columns.userId}, ${schema.columns.token}, ${schema.columns.tokenType}, ${schema.columns.ExpiresAt}) OUTPUT INSERTED.* VALUES (@userId, @token, @tokenType, @expiresAt)`);
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error creating token:', error);
            throw new Error('Database Error');
        }
    }

    async getTokenByUserId(userId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('userId', sql.Int, userId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.userId} = @userId`);
            if (result.recordset.length === 0) {
                return null;
            }
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching token by user ID:', error);
            throw new Error('Database Error');
        }
    }

    async deleteTokenByUserId(userId) {
        try {
            const pool = await this.pool;
            await pool.request()
                .input('userId', sql.Int, userId)
                .query(`DELETE FROM ${schema.tableName} WHERE ${schema.columns.userId} = @userId`);
        } catch (error) {
            console.error('Error deleting token by user ID:', error);
            throw new Error('Database Error');
        }
    }
}

module.exports = new TokenModel;