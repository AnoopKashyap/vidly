const mongoose = require('mongoose');

/* Connection to Mongo */
connectToMongo = async() => {
	try{
		await mongoose.connect('mongodb://localhost/vidly');
		console.log("Connected to mongoDB");
	}
	catch(err){
	  console.log("Error connecting to mongoDB");
	}
}

module.exports = { connectToMongo };
