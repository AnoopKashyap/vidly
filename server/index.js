const express = require('express');
const config = require('config');
const app = express();

const genres = require('./controllers/genres');
const customers = require('./controllers/customers');
const movies = require('./controllers/movies');
const rentals = require('./controllers/rentals');
const users = require('./controllers/users');
const auth = require('./controllers/auth');

const dbConfig = require('./dbConfig');

if(!config.get('jwtPrivateKey')){
  console.error("FATAL ERROR. jwtPrivateKey not defined.");
  process.exit(1);
}

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/login', auth);

dbConfig.connectToMongo();

const PORT = '3000' || process.env.PORT;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
