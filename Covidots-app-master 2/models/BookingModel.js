/**
 * Booking Model Definition
 * Author : Tanya Mittal
 * Date : July 25, 2021
 *  */

const mongoose = require("mongoose");
const { stringify } = require("querystring");
let date = new Date();
mongoose.Promise = require("bluebird");

// Booking model

const bookingSchema = mongoose.Schema({
    "booking_id": {
        type: Number,
        unique: true
    },
    "user_id": Number,
    "location_id": Number,
    "booking_date": Date,
    "booking_time": String,
    "vaccine_type": String,
    "status": String
}, { timestamps: true });

var bookingModel = mongoose.model("bookings", bookingSchema);

// Create and save a new Booking

module.exports.createNewBooking = (bookingReq) => {
    return new Promise(function (resolve, reject) {
        const booking = new bookingModel(bookingReq);
        // Save Booking in the database
        booking.save()
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject({
                    message: err.message || "Some error occurred while creating the booking."
                });
            });
    });
};

// Get All Bookings

module.exports.getAllBookings = () => {
    return new Promise(function (resolve, reject) {
        bookingModel.find()
            .then(bookings => {
                resolve(bookings);
            }).catch(err => {
                console.log("Some error occurred while retrieving bookings.");
                reject("no results returned");
            });
    });
}

/**
 * Get all booking for a particular day
 * @returns 
 */
module.exports.getAllBookingsForToday = () => {
    return new Promise(function (resolve, reject) {
        var nowDate = new Date().toLocaleString().slice(0, 10);
        bookingModel.find({ booking_date: new Date(nowDate) })
            .then(bookings => {
                resolve(bookings);
            }).catch(err => {
                console.log("Some error occurred while retrieving bookings.");
                reject("no results returned");
            });
    });
}

// Get Booking by Booking ID

module.exports.getBookingByID = (bookingId) => {
    return new Promise(function (resolve, reject) {
        bookingModel.findOne({ booking_id: bookingId })
            .then(booking => {
                if (!booking) {
                    reject({ message: "booking not found with id " + bookingId });
                }
                resolve(booking);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    reject({ message: "Booking not found with id " + bookingId });
                }
                reject({ message: "Error retrieving booking with id " + bookingId });
            });
    });
}

// Update Booking By Booking ID

module.exports.updateBookingByID = (bookingId, bookingReq) => {
    // Find Booking and update it with the request body
    return new Promise(function (resolve, reject) {
        bookingModel.findOneAndUpdate({ booking_id: bookingId },
            bookingReq,
            { new: true })
            .then(booking => {
                if (!booking) {
                    console.log("Booking not found with id " + bookingId);
                    reject("Booking not found with id " + bookingId);
                }
                resolve(booking);
            }).catch(err => {

                if (err.kind === 'ObjectId') {
                    console.log("Booking not found with id " + bookingId);
                    reject("Booking not found with id " + bookingId);
                }
                console.log("Error updating booking with id " + bookingId);
                console.log(err);
                reject("Error updating booking with id " + bookingId);
            });
    });
}

// Delete booking by Booking ID

module.exports.deleteBookingByID = (bookingId) => {
    return new Promise(function (resolve, reject) {
        // Find Booking and delete it 
        bookingModel.findOneAndRemove({ booking_id: bookingId })
            .then(booking => {
                if (!booking) {
                    reject({ message: "Booking not found with id " + bookingId });
                }
                resolve({ message: "Booking deleted successfully!" });
            }).catch(err => {
                if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                    reject({ message: "Booking not found with id " + bookingId });
                }
                reject({ message: "Could not delete Booking with id " + bookingId });
            });
    });
};
