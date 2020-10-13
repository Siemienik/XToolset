const express = require('express');
const logger = require('morgan');

const { router: invoiceRouter } = require('./routes/invoice');

const app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/v1/invoice', invoiceRouter);

module.exports = app;
