const questionModel = require('../models/questionModel');

const getquestion = async (questionId) => {
    if (!questionId) {
        const error = new Error('question ID is required');
        error.statusCode = 400;
        throw error;
    }

    const question = await questionModel.getquestionById(questionId);

    if (!question) {
        const error = new Error('question not found');
        error.statusCode = 404;
        throw error;
    }

    return question;
}

const getAllquestion = async () => {
    const questions = await questionModel.getquestion();

    return questions;
}

const getquestionByTestId = async (TestId) => {
    if (!TestId) {
        const error = new Error('TestId is required');
        error.statusCode = 400;
        throw error;
    }

    const question = await questionModel.getquestionByTestId(TestId);

    return question;
}

const createquestion = async (question) => {
    if (!question) {
        const error = new Error('question object is required');
        error.statusCode = 400;
        throw error
    }

    const newquestion = await questionModel.createQuestion(question);

    return newquestion;
}

const updatequestion = async (questionId, question) => {
    if (!questionId) {
        const error = new Error('question ID is required');
        error.statusCode = 400;
        throw error;
    }

    if (!question) {
        const error = new Error('question object is required');
        error.statusCode = 400;
        throw error;
    }

    const updatedquestion = await questionModel.updateQuestion(questionId, question);

    return updatedquestion;
}

const deletequestion = async (questionId) => {

    if (!questionId) {
        const error = new Error('question ID is required');
        error.statusCode = 400;
        throw error
    }

    await questionModel.deletequestion(questionId);

    return 'question deleted';
}

module.exports = {
    getquestion,
    getAllquestion,
    getquestionByTestId,
    createquestion,
    updatequestion,
    deletequestion
}