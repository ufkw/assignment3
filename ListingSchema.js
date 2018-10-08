/* Import mongoose and define any variables needed to create the schema */
var mongoose = require('mongoose'), 
    Schema = mongoose.Schema;
	mongoose.createConnection('mongodb://user1:userpass4@ds249798.mlab.com:49798/kufdatabase');
	
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {});
	

/* Create your schema for the data in the listings.json file that will define how data is saved in your database
     See https://mongoosejs.com/docs/guide.html for examples for creating schemas
     See also https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
  */
var listingSchema = new Schema({
	
	code: String,
	name: String,
	address: String,
	coordinates: {
		latitude: String,
		longitude: String,
	},
	
	created_at: Date,
	updated_at: Date
  
});

/* Create a 'pre' function that adds the updated_at (and created_at if not already there) property 
   See https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications
*/
/*
function callFunction(function){
	
	if(this.name == null)
	{
		throw err;
	}
	
	if(this.code == null)
	{
		throw err;
	}
}
*/

listingSchema.pre('save', function(next) {
	
	var currentDate = new Date();
	
	this.updated_at = currentDate;
	
	if(!this.created_at)
		this.created_at = currentDate;
	
	
	
	if(this.name == null)
	{
		throw err;
	}
	
	if(this.code == null)
	{
		throw err;
	}
//	callFunction(err);
	

	
	next();
  
});

/*
listingSchema.methods.testing = function(function())
{
	
	
	if(this.save == null)
	{
		throw err;
	}
	
	if(this.code == null)
	{
		throw err;
	}
		
}
*/


/* Use your schema to instantiate a Mongoose model */
var Listing = mongoose.model('Listing', listingSchema);

var test = new Listing({});




test.save(function(err) {
	
	
	var n = this.name;
	var c = this.code;
	console.log(typeof n === 'undefined');
	console.log(c);
	console.log(err);
/*	
	if(this.name == null)
	{
		throw err;
		
	}
	
	if(this.code == null)
	{
		throw err;
	}
	*/
//	if(err) //|| typeof s === 'undefined' || typeof c === 'undefined')
	{
//		throw err;
	}
	 if(err) throw err;

	
	console.log('User created!');
});

//test.testing();

/*
test.save(function(err) {
	
	if(test.save == null)
	{
		throw err;
	}
	
	if(test.code == null)
	{
		throw err;
	}
	
	console.log('help me jonny');
}); */


/* Export the model to make it avaiable to other parts of your Node application */
module.exports = Listing;
