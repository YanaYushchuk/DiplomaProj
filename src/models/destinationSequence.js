const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DestinationSequenceSchema = new Schema({
  previousDestination: { type: Schema.Types.ObjectId, ref: "Destination" },
  destination: { type: Schema.Types.ObjectId, ref: "Destination", required: true },
  nextDestination: { type: Schema.Types.ObjectId, ref: "Destination" }
});

// Export model
module.exports = mongoose.model("DestinationSequence", DestinationSequenceSchema);