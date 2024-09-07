const questionService = require('../services/questionService');
const Response = require('../utils/response');

const getquestion = async (req, res, next) => {
    try {
        const question = await questionService.getquestion(req.params.id);
        if (!question) {
            const response = Response.error('question not found', null, 404);
            return res.status(response.statusCode).json(response);
        }
        const response = Response.success('question found', question, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}

const getAllquestion = async (req, res, next) => {
    try {
        const questions = await questionService.getAllquestion();
        const response = Response.success('questions found', questions, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const getquestionByTestId = async (req, res, next) => {
    try {
        const question = await questionService.getquestionByTestId(req.params.id);
        if (!question) {
            const response = Response.error('question not found', null, 404);
            return res.status(response.statusCode).json(response);
        }
        const response = Response.success('question found', question, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}

const createquestion = async (req, res, next) => {
    try {
        const question = await questionService.createquestion(req.body);
        const response = Response.success('question created', question, 201);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const updatequestion = async (req, res, next) => {
    try {
        const question = await questionService.updatequestion(req.params.id, req.body);
        const response = Response.success('question updated', question, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deletequestion = async (req, res, next) => {
    try {
        await questionService.deletequestion(req.params.id);
        const response = Response.success('question deleted', null, 204);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getquestion,
    getAllquestion,
    createquestion,
    updatequestion,
    deletequestion,
    getquestionByTestId
};