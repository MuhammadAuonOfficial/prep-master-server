const sql = require('mssql');
const { poolPromise } = require('../database/db');
const mapFields = require('../utils/fieldMapper');

const schema = {
    tableName: 'Users',
    columns: {
        id: 'Id',
        name: 'Name',
        username: 'Username',
        email: 'Email',
        password: 'Password',
        role: 'RoleId',
        position: 'PositionId',
        created: 'CreatedAt',
        updated: 'UpdatedAt'
    }
};

const fieldMapping = {
    [schema.columns.id]: 'id',
    [schema.columns.name]: 'name',
    [schema.columns.username]: 'username',
    [schema.columns.email]: 'email',
    [schema.columns.password]: 'password',
    [schema.columns.role]: 'role',
    [schema.columns.position]: 'position',
    [schema.columns.created]: 'created',
    [schema.columns.updated]: 'updated'
}

class UserModel {
    constructor() {
        this.pool = poolPromise;
    }

    async getUserById(userId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('userId', sql.Int, userId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = @userId`);
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw new Error('Database Error');
        }
    }

    async getUsers() {
        const pool = await this.pool;
        const result = await pool.request().query(`SELECT * FROM ${schema.tableName}`);
        return result.recordset.map(user => mapFields(user, fieldMapping));
    }

    async getUserByEmail(email) {
        try {
            console.log('email:', email);
            const pool = await this.pool;
            const result = await pool.request()
                .input('email', sql.NVarChar, email)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.email} = @email`);
            if (!result.recordset[0]) {
                return null;
            }
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching user by email:', error);
            throw new Error('Database Error');
        }
    }

    async createUser(user) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('name', sql.NVarChar, user.name)
                .input('username', sql.NVarChar, user.username)
                .input('email', sql.NVarChar, user.email)
                .input('password', sql.NVarChar, user.password)
                .input('role', sql.Int, user.role)
                .input('position', sql.Int, user.position)
                .query(`INSERT INTO ${schema.tableName} (${schema.columns.name}, ${schema.columns.username}, ${schema.columns.email}, ${schema.columns.password}, ${schema.columns.role}, ${schema.columns.position}) VALUES (@name, @username, @email, @password, @role, @position)`);
            return null;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Database Error');
        }
    }

    async updateUser(userId, user) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('userId', sql.Int, userId)
                .input('name', sql.NVarChar, user.name)
                .input('username', sql.NVarChar, user.username)
                .input('email', sql.NVarChar, user.email)
                .input('password', sql.NVarChar, user.password)
                .input('role', sql.Int, user.role)
                .input('position', sql.Int, user.position)
                .query(`UPDATE ${schema.tableName} SET ${schema.columns.name} = @name, ${schema.columns.username} = @username, ${schema.columns.email} = @email, ${schema.columns.password} = @password, ${schema.columns.role} = @role, ${schema.columns.position} = @position WHERE ${schema.columns.id} = @userId`);
            return null;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Database Error');
        }
    }

    async deleteUser(userId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('userId', sql.Int, userId)
                .query(`DELETE FROM ${schema.tableName} WHERE ${schema.columns.id} = @userId`);
            return null;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Database Error');
        }
    }

}

module.exports = new UserModel;