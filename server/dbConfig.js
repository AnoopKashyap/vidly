const mongoose = require('mongoose');

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
