const sql = require('mssql');
const { poolPromise } = require('../database/db');

const schema = {
    tableName: 'Rights',
    columns: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
    }
}

class RightsModel {
    constructor() {
        this.pool = poolPromise;
    }

    async getRightById(rightId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('rightId', sql.Int, rightId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = @rightId`);
            return result.recordset[0];
        } catch (error) {
            console.error('Error fetching right by ID:', error);
            throw new Error('Database Error');
        }
    }

    async getRights() {
        const pool = await this.pool;
        const result = await pool.request().query(`SELECT * FROM ${schema.tableName}`);
        return result.recordset;
    }

    async createRight(right) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('name', sql.NVarChar, right.name)
                .input('description', sql.NVarChar, right.description)
                .query(`INSERT INTO ${schema.tableName} (${schema.columns.name}, ${schema.columns.description}) VALUES (@name, @description)`);
            return null;
        } catch (error) {
            console.error('Error creating right:', error);
            throw new Error('Database Error');
        }
    }

    async updateRight(rightId, right) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('rightId', sql.Int, rightId)
                .input('name', sql.NVarChar, right.name)
                .input('description', sql.NVarChar, right.description)
                .query(`UPDATE ${schema.tableName} SET ${schema.columns.name} = @name, ${schema.columns.description} = @description WHERE ${schema.columns.id} = @rightId`);
            return null;
        } catch (error) {
            console.error('Error updating right:', error);
            throw new Error('Database Error');
        }
    }

    async deleteRight(rightId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('rightId', sql.Int, rightId)
                .query(`DELETE FROM ${schema.tableName} WHERE ${schema.columns.id} = @rightId`);
            return null;
        } catch (error) {
            console.error('Error deleting right:', error);
            throw new Error('Database Error');
        }
    }
}

module.exports = new RightsModel;