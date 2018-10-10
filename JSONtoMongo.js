'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config'),
    listingData = [];
	
const options = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE,
	reconnectInterval: 500,
    useMongoClient: true
	
  }

/* Connect to your database using mongoose - remember to keep your key secret*/

mongoose.Promise = global.Promise;
mongoose.connect(config.db.uri, options);
var con = mongoose.connection;

con.on("connected", function () {
    console.log("Mongoose default connection open");
    toRead();
});

con.on("error", function(err) {
	console.log("Mongoose default connection error: " + err);
});

con.on("disconnected", function () {
    console.log("Mongoose default connection disconnected");
});

/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
  Remember that we need to read in a file like we did in Bootcamp Assignment #1.
 */

var toRead = function () {
  fs.readFile('./listings.json', 'utf8', function (err, data) {
      if (err) {
          console.log(err);
          throw err;
      }
      listingData = JSON.parse(data);
      add();
  });
};

var add = function () {
  Listing.remove({}, function (err) { //make sure Listing is empty before we put entries in
      if (err) throw err;

	  
	 for (var obj in listingData["entries"]) {

      var entry = new Listing(listingData["entries"][obj]);

      entry.save(function (err) {
          if (err) {
              console.log(err);
          }
          mongoose.disconnect();
      });
	};

  });
};
