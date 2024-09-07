const TestSeriesModel = require('../models/testSeriesModel');

const getTestSeries = async (TestSeriesId) => {
    if (!TestSeriesId) {
        const error = new Error('TestSeries ID is required');
        error.statusCode = 400;
        throw error;
    }

    const TestSeries = await TestSeriesModel.getTestSeriesById(TestSeriesId);

    if (!TestSeries) {
        const error = new Error('TestSeries not found');
        error.statusCode = 404;
        throw error;
    }

    return TestSeries;
}

const getAllTestSeries = async () => {
    const TestSeriess = await TestSeriesModel.getTestSeriess();

    return TestSeriess;
}

const getTestSeriesByUserId = async (userId) => {
    if (!userId) {
        const error = new Error('UserId is required');
        error.statusCode = 400;
        throw error;
    }

    const TestSeries = await TestSeriesModel.getTestSeriesByEmail(email);

    return TestSeries;
}

const createTestSeries = async (TestSeries) => {
    if (!TestSeries) {
        const error = new Error('TestSeries object is required');
        error.statusCode = 400;
        throw error
    }

    const newTestSeries = await TestSeriesModel.createTestSeries(TestSeries);

    return newTestSeries;
}

const updateTestSeries = async (TestSeriesId, TestSeries) => {
    if (!TestSeriesId) {
        const error = new Error('TestSeries ID is required');
        error.statusCode = 400;
        throw error;
    }

    if (!TestSeries) {
        const error = new Error('TestSeries object is required');
        error.statusCode = 400;
        throw error;
    }

    const updatedTestSeries = await TestSeriesModel.updateTestSeries(TestSeriesId, TestSeries);

    return updatedTestSeries;
}

const deleteTestSeries = async (TestSeriesId) => {

    if (!TestSeriesId) {
        const error = new Error('TestSeries ID is required');
        error.statusCode = 400;
        throw error
    }

    await TestSeriesModel.deleteTestSeries(TestSeriesId);

    return 'TestSeries deleted';
}

module.exports = {
    getTestSeries,
    getAllTestSeries,
    getTestSeriesByUserId,
    createTestSeries,
    updateTestSeries,
    deleteTestSeries
}