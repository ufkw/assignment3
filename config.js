//This file holds any configuration variables we may need 
//'config.js' is ignored by git to protect sensitive information, 
//such as your database's username and password
//copy this file's contents to another file 'config.js' and store your MongoLab uri there
//You can refer to this uri to connect to your database in other files config.db.uri

module.exports = {
  db: {
    uri: 'mongodb://user1:userpass4@ds249798.mlab.com:49798/kufdatabase', //place the URI of your mongo database here.
  }
};
