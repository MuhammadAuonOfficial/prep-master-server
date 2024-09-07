const sql = require('mssql');
const { poolPromise } = require('../database/db');

const schema = {
    tableName: 'Roles',
    columns: {
        id: 'Id',
        name: 'Name',
        descriptions: 'Description',
    }
}

class RoleModel {
    constructor() {
        this.pool = poolPromise;
    }

    async getRoleById(roleId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('roleId', sql.Int, roleId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = @roleId`);
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching role by ID:', error);
            throw new Error('Database Error');
        }
    }

    async getRoles() {
        const pool = await this.pool;
        const result = await pool.request().query(`SELECT * FROM ${schema.tableName}`);
        return result.recordset;
    }

    async createRole(role) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('name', sql.NVarChar, role.name)
                .input('description', sql.NVarChar, role.description)
                .query(`INSERT INTO ${schema.tableName} (${schema.columns.name}, ${schema.columns.description}) VALUES (@name, @description)`);
            return null;
        } catch (error) {
            console.error('Error creating role:', error);
            throw new Error('Database Error');
        }
    }

    async updateRole(roleId, role) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('roleId', sql.Int, roleId)
                .input('name', sql.NVarChar, role.name)
                .input('description', sql.NVarChar, role.description)
                .query(`UPDATE ${schema.tableName} SET ${schema.columns.name} = @name, ${schema.columns.description} = @description WHERE ${schema.columns.id} = @roleId`);
            return null;
        } catch (error) {
            console.error('Error updating role:', error);
            throw new Error('Database Error');
        }
    }

    async deleteRole(roleId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('roleId', sql.Int, roleId)
                .query(`DELETE FROM ${schema.tableName} WHERE ${schema.columns.id} = @roleId`);
            return null;
        } catch (error) {
            console.error('Error deleting role:', error);
            throw new Error('Database Error');
        }
    }
}

module.exports = new RoleModel;