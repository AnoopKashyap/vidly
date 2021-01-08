const express = require('express');
const app = express();
const genres = require('./controllers/genres');
const customers = require('./controllers/customers');
const movies = require('./controllers/movies');
const dbConfig = require('./dbConfig');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);

dbConfig.connectToMongo();

const PORT = '3000' || process.env.PORT;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
