const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://yana_yushchuk:Mbk5UTKDiqJkzyOJ@diplomcluster.rqojovt.mongodb.net/DiplomDB?retryWrites=true&w=majority&appName=DiplomCluster";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
  console.log("Succesfully conected to MongoDB")
}

//Import the express dependency
const app = express();       
       //Instantiate an express app, the main work horse of this server
const port = 8080;                  //Save the port number where your server will be listening

app.use(express.static(__dirname));

//Idiomatic expression in express to route and respond to a client request
// Serve index.html at the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve trip.html at the /trip route
app.get('/trip', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/trip.html'));
});

app.get('/api/trips', (req, res) => {
    res.sendFile(path.join(__dirname, 'src/trip.html'));
});


app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});