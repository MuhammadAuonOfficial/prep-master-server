const sql = require('mssql');
const { poolPromise } = require('../database/db');
const mapFields = require('../utils/fieldMapper');

const schema = {
    tableName: 'tb_User',
    columns: {
        id: 'Id',
        firstName: 'FirstName',
        middleName: 'MiddleName',
        lastName: 'LastName',
        email: 'Email',
        password: 'Password',
        role: 'RoleId',
        gender: 'Gender',
        phone: 'Phone',
        address: 'Address',

        // isActive: 'IsActive',
        // isDelete: 'IsDelete',
        status: 'Status'

        // createdBy: 'CreatedBy',
        // createdDate: 'CreatedDate',
        // updatedBy: 'UpdatedBy',
        // updatedDate: 'UpdatedDate'
    }
};

const fieldMapping = {
    [schema.columns.id]: 'id',
    [schema.columns.firstName]: 'firstName',
    [schema.columns.middleName]: 'middleName',
    [schema.columns.lastName]: 'lastName',
    [schema.columns.email]: 'email',
    [schema.columns.password]: 'password',

    [schema.columns.role]: 'role',
    [schema.columns.gender]: 'gender',
    [schema.columns.phone]: 'phone',
    [schema.columns.address]: 'address',

    // [schema.columns.isActive]: 'isActive',
    // [schema.columns.isDelete]: 'isDelete',
    [schema.columns.status]: 'status'

    // [schema.columns.createdBy]: 'createdBy',
    // [schema.columns.createdDate]: 'createdDate',
    // [schema.columns.updatedBy]: 'updatedBy',
    // [schema.columns.updatedDate]: 'updatedDate'
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
                .input('firstName', sql.NVarChar, user.firstName)
                .input('middleName', sql.NVarChar, user.middleName)
                .input('lastName', sql.NVarChar, user.lastName)
                .input('email', sql.NVarChar, user.email)
                .input('password', sql.NVarChar, user.password)

                .input('role', sql.Int, user.role)
                .input('gender', sql.NVarChar, user.gender)

                .input('phone', sql.NVarChar, user.phone)
                .input('address', sql.NVarChar, user.address)
                .input('status', sql.NVarChar, 'Pending')

                .query(`INSERT INTO ${schema.tableName} 
                (${schema.columns.firstName}, ${schema.columns.lastName}, ${schema.columns.middleName}, ${schema.columns.email}, ${schema.columns.password}, ${schema.columns.role}, ${schema.columns.gender}, ${schema.columns.phone}, ${schema.columns.address}, ${schema.columns.status}) 
                VALUES (@firstName, @middleName, @lastName, @email, @password, @role, @gender, @phone, @address,@status); 
                SELECT TOP(1) * FROM tb_User
                ORDER BY 1 DESC`);
                if (!result.recordset[0]) {
                    return null;
                }
                return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error creating user:', error);
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
            .input('id', sql.Int, user.id)
            .input('firstName', sql.NVarChar, user.firstName)
            .input('middleName', sql.NVarChar, user.middleName)
            .input('lastName', sql.NVarChar, user.lastName)
            .input('email', sql.NVarChar, user.email)
            .input('password', sql.NVarChar, user.password)

            .input('role', sql.Int, user.role)
            .input('gender', sql.NVarChar, user.gender)

            .input('phone', sql.NVarChar, user.phone)
            .input('address', sql.NVarChar, user.address)

            .query(updateQuery)
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