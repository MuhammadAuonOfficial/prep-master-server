const sql = require('mssql');
const { poolPromise } = require('../database/db');
const mapFields = require('../utils/fieldMapper');

const schema = {
    tableName: 'tb_TestSeries',
    columns: {
        id: 'Id',
        name: 'Name',
        user: 'UserId',
        price: 'Price',
        status: 'Status',
    }
};


const fieldMapping = {
    [schema.columns.id]: 'id',
    [schema.columns.name]: 'name',
    [schema.columns.user]: 'user',
    [schema.columns.price]: 'price',

    [schema.columns.status]: 'status'
}


class UserModel {
    constructor() {
        this.pool = poolPromise;
    }

    async getTestSeriesById(TestSeriesId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('TestSeriesId', sql.Int, TestSeriesId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = @TestSeriesId`);
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching test series by ID:', error);
            throw new Error('Database Error');
        }
    }

    async getTestSeries() {
        const pool = await this.pool;
        const result = await pool.request().query(`SELECT * FROM ${schema.tableName}`);
        return result.recordset.map(user => mapFields(user, fieldMapping));
    }

    async getTestSeriesByUserId(userId) {
        try {
            console.log('userId:', userId);
            const pool = await this.pool;
            const result = await pool.request()
                .input('userId', sql.INT, userId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.user} = @userId`);
            if (!result.recordset[0]) {
                return null;
            }
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching test series by userId:', error);
            throw new Error('Database Error');
        }
    }

    async createTestSeries(series) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('name', sql.NVarChar, series.name)
                .input('user', sql.Int, series.userId)
                .input('price', sql.Decimal(10, 2), series.price)
                .input('status', sql.NVarChar, 'Pending')
                .query(`INSERT INTO ${schema.tableName} 
                        (${schema.columns.name}, ${schema.columns.user}, ${schema.columns.price}, ${schema.columns.status}) 
                        VALUES (@name, @userId, @price, @status); 
                        SELECT SCOPE_IDENTITY() AS 'Id';`);
    
            // Fetching the newly created record using the returned ID
            const insertedId = result.recordset[0].Id;
            const insertedRecord = await pool.request()
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = ${insertedId}`);
            if (!insertedRecord.recordset[0]) {
                return null;
            }
            return mapFields(insertedRecord.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error creating test series:', error);
            throw new Error('Database Error');
        }
    }
    
    async updateTestSeries(seriesId, series) {
        const updateQuery = `
            UPDATE ${schema.tableName} SET 
            ${schema.columns.name} = @name, 
            ${schema.columns.userId} = @userId, 
            ${schema.columns.price} = @price, 
            ${schema.columns.status} = @status, 
            WHERE ${schema.columns.id} = @seriesId`;
    
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('seriesId', sql.Int, seriesId)
                .input('name', sql.NVarChar, series.name)
                .input('userId', sql.Int, series.userId)
                .input('price', sql.Decimal(10, 2), series.price)
                .input('status', sql.NVarChar, series.status)
                .input('isActive', sql.Bit, series.isActive)
                .input('isDelete', sql.Bit, series.isDelete)
                .input('createdBy', sql.Int, series.createdBy)
                .input('createdDate', sql.DateTime, series.createdDate)  // Note: Normally not updated but included if needed
                .input('updatedBy', sql.Int, series.updatedBy)
                .input('updatedDate', sql.DateTime, new Date())  // Automatically set the update date to now
                .query(updateQuery);
    
            if (result.rowsAffected[0] > 0) {
                return true;  // Or return a more detailed success message/object
            } else {
                return false;  // Or throw an error or return a specific message indicating no update was made
            }
        } catch (error) {
            console.error('Error updating test series:', error);
            throw new Error('Database Error');
        }
    }
    
    async updateUser(userId, user) {
        const updateQuery = `
            UPDATE ${schema.tableName} SET 
            ${schema.columns.firstName} = @firstName, 
            ${schema.columns.middleName} = @middleName, 
            ${schema.columns.lastName} = @lastName, 
            ${schema.columns.email} = @email, 
            ${schema.columns.password} = @password, 
            ${schema.columns.role} = @role, 
            ${schema.columns.gender} = @gender, 
            ${schema.columns.phone} = @phone, 
            ${schema.columns.address} = @address 
            WHERE ${schema.columns.id} = @userId`;
    
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('userId', sql.Int, userId)  // Ensure the user ID is correctly passed as an input
                .input('firstName', sql.NVarChar, user.firstName)
                .input('middleName', sql.NVarChar, user.middleName)
                .input('lastName', sql.NVarChar, user.lastName)
                .input('email', sql.NVarChar, user.email)
                .input('password', sql.NVarChar, user.password)
                .input('role', sql.Int, user.role)
                .input('gender', sql.NVarChar, user.gender)
                .input('phone', sql.NVarChar, user.phone)
                .input('address', sql.NVarChar, user.address)
                .query(updateQuery);
    
            if (result.rowsAffected[0] > 0) {  // Check if the update was successful
                return true;  // Or return a more detailed success message/object
            } else {
                return false;  // Or throw an error or return a specific message indicating no update was made
            }
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Database Error');
        }
    }
    

    async deleteUser(TestSeriesId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('TestSeriesId', sql.Int, TestSeriesId)
                .query(`DELETE FROM ${schema.tableName} WHERE ${schema.columns.id} = @TestSeriesId`);
            return null;
        } catch (error) {
            console.error('Error deleting Test Series:', error);
            throw new Error('Database Error');
        }
    }

}

module.exports = new TestSeriesModel;