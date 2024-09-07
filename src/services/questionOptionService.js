const questionOptionModel = require('../models/questionOptionModel');

const getquestionOption = async (questionOptionId) => {
    if (!questionOptionId) {
        const error = new Error('questionOption ID is required');
        error.statusCode = 400;
        throw error;
    }

    const questionOption = await questionOptionModel.getquestionOptionById(questionOptionId);

    if (!questionOption) {
        const error = new Error('questionOption not found');
        error.statusCode = 404;
        throw error;
    }

    return questionOption;
}

const getAllquestionOption = async () => {
    const questionOptions = await questionOptionModel.getquestionOption();

    return questionOptions;
}

const getquestionOptionByQuestionId = async (TestId) => {
    if (!TestId) {
        const error = new Error('TestId is required');
        error.statusCode = 400;
        throw error;
    }

    const questionOption = await questionOptionModel.getquestionOptionByQuestionId(TestId);

    return questionOption;
}

const createquestionOption = async (questionOption) => {
    if (!questionOption) {
        const error = new Error('questionOption object is required');
        error.statusCode = 400;
        throw error
    }

    const newquestionOption = await questionOptionModel.createquestionOption(questionOption);

    return newquestionOption;
}

const updatequestionOption = async (questionOptionId, questionOption) => {
    if (!questionOptionId) {
        const error = new Error('questionOption ID is required');
        error.statusCode = 400;
        throw error;
    }

    if (!questionOption) {
        const error = new Error('questionOption object is required');
        error.statusCode = 400;
        throw error;
    }

    const updatedquestionOption = await questionOptionModel.updatequestionOption(questionOptionId, questionOption);

    return updatedquestionOption;
}

const deletequestionOption = async (questionOptionId) => {

    if (!questionOptionId) {
        const error = new Error('questionOption ID is required');
        error.statusCode = 400;
        throw error
    }

    await questionOptionModel.deletequestionOption(questionOptionId);

    return 'questionOption deleted';
}

module.exports = {
    getquestionOption,
    getAllquestionOption,
    getquestionOptionByQuestionId,
    createquestionOption,
    updatequestionOption,
    deletequestionOption
}