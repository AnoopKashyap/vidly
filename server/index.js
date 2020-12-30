const express = require('express');
const app = express();
const genres = require('./Routes/genres');

const dbConfig = require('./dbConfig');

app.use(express.json());
app.use('/api/genres', genres);

dbConfig.connectToMongo();

const PORT = '3000' || process.env.PORT;

app.listen(PORT, () => console.log(`Listening to port ${PORT}`));
