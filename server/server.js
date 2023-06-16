require('dotenv').config();
const express = require('express');
const apiRoutes = require('./routes/api');

const app = express();

app.use('/api', apiRoutes);

app.listen(process.env.PORT);