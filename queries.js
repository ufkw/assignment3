/* Add all the required libraries*/

/* Connect to your database using mongoose - remember to keep your key secret*/

/* Fill out these functions using Mongoose queries*/


var mongoose = require('mongoose'), 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');
	
const options = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 500,
    useMongoClient: true
	
  }

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, options);
var con = mongoose.connection;

con.on("connected", function () {
    console.log("Mongoose default connection open");
});

con.on("error", function(err) {
	console.log("Mongoose default connection error: " + err);
});

con.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
});




var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
   
   Listing.find({name: "Library West"}, function(err, val) { 
   if(err) throw err; 
   
   console.log(val);
   });

};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */

   
   Listing.find({code: "CABL"}, function(err, val) { 
   if(err) throw err; 
   
   console.log(val);	//shows cabl listing
   });
   
   Listing.findOneAndRemove({code: "CABL"}, function(err, val){
	if(err) throw err;   
	console.log("Cable is removed.");
	console.log(val); //shows empty cabl listing, though sometimes it shows it not empty
   });
   
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
   
   var query = {name: 'Phelps Laboratory'};
   Listing.findOneAndUpdate(query, {address: 'Biomedical Sciences Bldg, 1275 Center Drive Gainesville, FL 32611'}, function(err, val) {
	  if(err) throw err;
	  console.log('Phelps Laboratory Address is updated to: ');
	  console.log(val); 
   });
   
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
   
   Listing.find({}, function(err, val) {
	   
	   if(err) throw err;
	console.log("Listings:");   
	console.log(val);
   });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();