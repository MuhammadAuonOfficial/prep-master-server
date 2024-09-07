const questionOptionService = require('../services/questionOptionService');
const Response = require('../utils/response');

const getquestionOption = async (req, res, next) => {
    try {
        const questionOption = await questionOptionService.getquestionOption(req.params.id);
        if (!questionOption) {
            const response = Response.error('questionOption not found', null, 404);
            return res.status(response.statusCode).json(response);
        }
        const response = Response.success('questionOption found', questionOption, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}

const getAllquestionOption = async (req, res, next) => {
    try {
        const questionOptions = await questionOptionService.getAllquestionOption();
        const response = Response.success('questionOptions found', questionOptions, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const getquestionOptionByQuestionId = async (req, res, next) => {
    try {
        const questionOption = await questionOptionService.getquestionOptionByQuestionId(req.params.id);
        if (!questionOption) {
            const response = Response.error('questionOption not found', null, 404);
            return res.status(response.statusCode).json(response);
        }
        const response = Response.success('questionOption found', questionOption, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}

const createquestionOption = async (req, res, next) => {
    try {
        const questionOption = await questionOptionService.createquestionOption(req.body);
        const response = Response.success('questionOption created', questionOption, 201);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const updatequestionOption = async (req, res, next) => {
    try {
        const questionOption = await questionOptionService.updatequestionOption(req.params.id, req.body);
        const response = Response.success('questionOption updated', questionOption, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deletequestionOption = async (req, res, next) => {
    try {
        await questionOptionService.deletequestionOption(req.params.id);
        const response = Response.success('questionOption deleted', null, 204);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getquestionOption,
    getAllquestionOption,
    createquestionOption,
    updatequestionOption,
    deletequestionOption,
    getquestionOptionByQuestionId
};