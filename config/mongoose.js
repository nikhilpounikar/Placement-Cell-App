//require the library
const mongoose = require('mongoose');

//connect to the database
// mongodb+srv://nikhilpounikar:1IWKLK3KdLBb2X9U@cluster0.sbronh6.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://whiteWolff:praduman@cluster0.an8uy3k.mongodb.net/Placement_Cell_DB?retryWrites=true&w=majority');
//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});

module.exports = db;