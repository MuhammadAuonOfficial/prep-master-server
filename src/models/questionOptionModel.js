const sql = require('mssql');
const { poolPromise } = require('../database/db');
const mapFields = require('../utils/fieldMapper');

const schema = {
    tableName: 'tb_QuestionOptions',
    columns: {
        id: 'Id',
        questionId: 'QuestionId',
        options: 'Options'
    }
};


const fieldMapping = {
    [schema.columns.id]: 'id',
    [schema.columns.questionId]: 'questionId',
    [schema.columns.options]: 'options'
}

class questionOptionModel {
    constructor() {
        this.pool = poolPromise;
    }

    async getquestionOptionById(questionOptionId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('questionOptionId', sql.Int, questionOptionId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = @questionOptionId`);
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching Question Option by ID:', error);
            throw new Error('Database Error');
        }
    }

    async getquestionOption() {
        const pool = await this.pool;
        const result = await pool.request().query(`SELECT * FROM ${schema.tableName}`);
        return result.recordset.map(user => mapFields(user, fieldMapping));
    }

    async getquestionOptionByQuestionId(QuestionId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('QuestionId', sql.Int, QuestionId)
                .query(`SELECT id, options, QuestionId as questionId FROM ${schema.tableName} WHERE ${schema.columns.questionId} = @QuestionId`);
            if (!result.recordset[0]) {
                return null;
            }
            else{
               return result.recordset
            }
        } catch (error) {
            console.error('Error fetching Options by QuestionId:', error);
            throw new Error('Database Error');
        }
    }

    async createQuestionOption(questionOptionData) {
        try {
            const pool = await this.pool;
            console.log(questionOptionData);  // Debugging line to inspect the incoming data
            const result = await pool.request()
                .input('questionId', sql.Int, questionOptionData.questionId)
                .input('options', sql.NVarChar, questionOptionData.options)
                .query(`INSERT INTO ${schema.tableName} 
                        (${schema.columns.questionId}, ${schema.columns.options}) 
                        VALUES (@questionId, @options); 
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
            console.error('Error creating question option:', error);
            throw new Error('Database Error');
        }
    }    
        
    async updateQuestionOption(id, questionOptionData) {
        const updateQuery = `
            UPDATE ${schema.tableName} SET 
            ${schema.columns.questionId} = @questionId, 
            ${schema.columns.options} = @options
            WHERE ${schema.columns.id} = @id`;
    
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('questionId', sql.Int, questionOptionData.questionId)
                .input('options', sql.NVarChar, questionOptionData.options)
                .query(updateQuery);
    
            if (result.rowsAffected[0] > 0) {
                return true;  // Indicates that the update was successful
            } else {
                return false;  // Indicates no rows were updated, possibly because the ID didn't match any records
            }
        } catch (error) {
            console.error('Error updating question option:', error);
            throw new Error('Database Error');
        }
    }    
    

    async deletequestionOption(questionOptionId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('questionOptionId', sql.Int, questionOptionId)
                .query(`DELETE FROM ${schema.tableName} WHERE ${schema.columns.id} = @questionOptionId`);
            return null;
        } catch (error) {
            console.error('Error deleting Question Options:', error);
            throw new Error('Database Error');
        }
    }

}

module.exports = new questionOptionModel;