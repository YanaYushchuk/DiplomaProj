const Trip = require("../models/trip");
const asyncHandler = require("express-async-handler");

// Display list of all Trips.
exports.trip_list = asyncHandler(async (req, res, next) => {
    const allTrips = await Trip.find().sort({ title: 1 }).exec();
    res.send(allTrips);
});

// Display detail page for a specific Trip.
exports.trip_detail = asyncHandler(async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: Trip detail: ${req.params.id}`);
});

// Display Trip create form on GET.
exports.trip_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip create GET");
});

// Handle Trip create on POST.
exports.trip_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip create POST");
});

// Display Trip delete form on GET.
exports.trip_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip delete GET");
});

// Handle Trip delete on POST.
exports.trip_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip delete POST");
});

// Display Trip update form on GET.
exports.trip_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip update GET");
});

// Handle Trip update on POST.
exports.trip_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Trip update POST");
});