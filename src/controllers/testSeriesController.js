const testSeriesService = require('../services/testSeriesService');
const Response = require('../utils/response');

const getTestSeries = async (req, res, next) => {
    try {
        const TestSeries = await testSeriesService.getTestSeries(req.params.id);
        if (!TestSeries) {
            const response = Response.error('TestSeries not found', null, 404);
            return res.status(response.statusCode).json(response);
        }
        const response = Response.success('TestSeries found', TestSeries, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error)
    }
}

const getAllTestSeries = async (req, res, next) => {
    try {
        const TestSeriess = await testSeriesService.getAllTestSeries();
        const response = Response.success('TestSeriess found', TestSeriess, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const createTestSeries = async (req, res, next) => {
    try {
        const TestSeries = await testSeriesService.createTestSeries(req.body);
        const response = Response.success('TestSeries created', TestSeries, 201);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const updateTestSeries = async (req, res, next) => {
    try {
        const TestSeries = await testSeriesService.updateTestSeries(req.params.id, req.body);
        const response = Response.success('TestSeries updated', TestSeries, 200);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}

const deleteTestSeries = async (req, res, next) => {
    try {
        await testSeriesService.deleteTestSeries(req.params.id);
        const response = Response.success('TestSeries deleted', null, 204);
        res.status(response.statusCode).json(response);
    } catch (error) {
        next(error);
    }
}


module.exports = {
    getTestSeries,
    getAllTestSeries,
    createTestSeries,
    updateTestSeries,
    deleteTestSeries
};