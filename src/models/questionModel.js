const sql = require('mssql');
const { poolPromise } = require('../database/db');
const mapFields = require('../utils/fieldMapper');

const schema = {
    tableName: 'tb_Question',
    columns: {
        id: 'Id',
        testId: 'TestId',
        question: 'Question',
        answer: 'Answer'
    }
};

const fieldMapping = {
    [schema.columns.id]: 'id',
    [schema.columns.testId]: 'testId',
    [schema.columns.question]: 'question',
    [schema.columns.answer]: 'answer'
}

class questionModel {
    constructor() {
        this.pool = poolPromise;
    }

    async getquestionById(questionId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('questionId', sql.Int, questionId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.id} = @questionId`);
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching test series by ID:', error);
            throw new Error('Database Error');
        }
    }

    async getquestion() {
        const pool = await this.pool;
        const result = await pool.request().query(`SELECT * FROM ${schema.tableName}`);
        return result.recordset.map(user => mapFields(user, fieldMapping));
    }

    async getquestionByTestId(TestId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('TestId', sql.Int, TestId)
                .query(`SELECT * FROM ${schema.tableName} WHERE ${schema.columns.testId} = @TestId`);
            if (!result.recordset[0]) {
                return null;
            }
            return mapFields(result.recordset[0], fieldMapping);
        } catch (error) {
            console.error('Error fetching test series by testId:', error);
            throw new Error('Database Error');
        }
    }

    async createQuestion(questionData) {
        try {
            const pool = await this.pool;
            console.log(questionData);
            const result = await pool.request()
                .input('testId', sql.Int, questionData.testId)
                .input('question', sql.NVarChar, questionData.question)
                .input('answer', sql.NVarChar, questionData.answer)
                .query(`INSERT INTO ${schema.tableName} 
                        (${schema.columns.testId}, ${schema.columns.question}, ${schema.columns.answer}) 
                        VALUES (@testId, @question, @answer); 
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
            console.error('Error creating question:', error);
            throw new Error('Database Error');
        }
    }
    
    async updateQuestion(id, questionData) {
        const updateQuery = `
            UPDATE ${schema.tableName} SET 
            ${schema.columns.testId} = @testId, 
            ${schema.columns.question} = @question, 
            ${schema.columns.answer} = @answer
            WHERE ${schema.columns.id} = @id`;
    
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('testId', sql.Int, questionData.testId)
                .input('question', sql.NVarChar, questionData.question)
                .input('answer', sql.NVarChar, questionData.answer)
                .query(updateQuery);
    
            if (result.rowsAffected[0] > 0) {
                return true;  // Indicates that the update was successful
            } else {
                return false;  // Indicates no rows were updated, possibly because the ID didn't match any records
            }
        } catch (error) {
            console.error('Error updating question:', error);
            throw new Error('Database Error');
        }
    }
    

    async deletequestion(questionId) {
        try {
            const pool = await this.pool;
            const result = await pool.request()
                .input('questionId', sql.Int, questionId)
                .query(`DELETE FROM ${schema.tableName} WHERE ${schema.columns.id} = @questionId`);
            return null;
        } catch (error) {
            console.error('Error deleting Test Series:', error);
            throw new Error('Database Error');
        }
    }

}

module.exports = new questionModel;