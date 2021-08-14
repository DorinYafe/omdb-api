const express = require('express');
const { PORT } = require('./constants/constants');
const router = require('./controllers/movieController');
const cors = require('cors')

const app = express();

const port = process.env.PORT || PORT
app.use(cors())
app.listen(port, () => console.log('Started...'))
app.use('/movies', router);

