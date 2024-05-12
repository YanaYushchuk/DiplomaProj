#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Trip = require("./src/models/trip");
  const Destination = require("./src/models/destination");
  const DestinationSequence = require("./src/models/destinationSequence");
  const Ticket = require("./src/models/ticket");

  
  const trips = [];
  const destinations = [];
  const destinationSequences = [];
  const tickets = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createDestinations();
    await createDestinationSequences();
    console.log(destinationSequences);
    await createTrips();
    await createTickets();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }  

  async function destinationCreate(index, title, description) {
    const destinationdetail = { title: title, description: description };  
    const destination = new Destination(destinationdetail);  
    await destination.save();
    destinations[index] = destination;
    console.log(`Added destination: ${title} ${description}`);
  }

  async function destinationSequenceCreate(index, previousDestination, destination, nextDestination, trips) {
    const destinationSequencedetail = { destination: destination };  
    if (previousDestination != false) destinationSequencedetail.previousDestination = previousDestination;
    if (nextDestination != false) destinationSequencedetail.nextDestination = nextDestination;
    if (trips != false) destinationSequencedetail.trips = trips;
    const destinationSequence = new DestinationSequence(destinationSequencedetail);  
    await destinationSequence.save();
    destinationSequences[index] = destinationSequence;
    console.log(`Added destinationSequence: ${previousDestination} ${destination} ${nextDestination} ${trips}`);
  }
  
  async function tripCreate(index, title, description, price, destinationSequences) {
    const tripdetail = { title: title, description: description, price: price, destinationSequences: destinationSequences };  
    const trip = new Trip(tripdetail);  
    await trip.save();
    trips[index] = trip;
    console.log(`Added trip: ${title} ${description} ${price} ${destinationSequences}`);
  }

  async function ticketCreate(index, trip, dateStart, dateFinish) {
    const ticketdetail = { trip: trip, dateStart: dateStart };  
    if (dateFinish != false) ticketdetail.dateFinish = dateFinish;
    const ticket = new Ticket(ticketdetail);  
    await ticket.save();
    tickets[index] = ticket;
    console.log(`Added ticket: ${trip} ${dateStart} ${dateFinish}`);
  }

  async function createDestinations() {
    console.log("Adding destinations");
    await Promise.all([
      destinationCreate(0, "Paris", "ParisCity"),
      destinationCreate(1, "Ternopil", "TernopilCity"),
      destinationCreate(2, "Kyiv", "KyivCity"),
      destinationCreate(3, "Rivne", "RivneCity")
    ]);
  }

  async function createDestinationSequences() {
    console.log("Adding destination sequences");
    await Promise.all([
      destinationSequenceCreate(0, destinations[0], destinations[1], destinations[2]),
      destinationSequenceCreate(1, destinations[1], destinations[3], false),
      destinationSequenceCreate(2, false, destinations[1], false),
      destinationSequenceCreate(3, destinations[2], destinations[3], false),
      destinationSequenceCreate(4, false, destinations[3], destinations[2]),
      destinationSequenceCreate(5, false, destinations[3], destinations[0]),
    ]);
  }

  async function createTrips() {
    console.log("Adding trips");
    await Promise.all([
      tripCreate(0, "TestTrip1", "TestTripDesc1", 899.99, [destinationSequences[2]]),
      tripCreate(1, "TestTrip2", "TestTripDesc2", 1, [destinationSequences[4], destinationSequences[3]]),
      tripCreate(2, "TestTrip3", "TestTripDesc3", 9999.99, [destinationSequences[5], destinationSequences[0], destinationSequences[3]]),
      tripCreate(3, "TestTrip4", "TestTripDesc4", 10.99, [destinationSequences[2]]),
      tripCreate(4, "TestTrip5", "TestTripDesc5", 12, [destinationSequences[2]]),
    ]);
  }    

  async function createTickets() {
    console.log("Adding tickets");
    await Promise.all([
      ticketCreate(0, trips[0], new Date(), false),
      ticketCreate(1, trips[0], new Date(), false),
      ticketCreate(2, trips[0], new Date(), false),
      ticketCreate(3, trips[1], new Date(), false),
      ticketCreate(4, trips[3], new Date(), false),
    ]);
  }
  