require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

app.use('/api', apiRoutes);

app.listen(process.env.PORT);