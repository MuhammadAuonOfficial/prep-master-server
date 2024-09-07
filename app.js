/*
*  Imports
*/

const express = require('express');
require('dotenv').config();


// Middleware
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('./src/middleware/errorHandler');

// Routes
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');
const testSeriesRoutes = require('./src/routes/testSeriesRoutes');



const app = express();

/*
*  Middleware
*/

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/test_series', testSeriesRoutes);

app.use(errorHandler);

/*
*  Server
*/

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});