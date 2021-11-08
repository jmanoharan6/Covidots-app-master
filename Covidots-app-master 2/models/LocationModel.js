/**
 * Location Model 
 * Author : Janani Manoharan
 * Date : July 22, 2021
 *  */
const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;
let date = new Date();

mongoose.Promise = require("bluebird");

// location model
const locationSchema = new Schema({

    "location_id": {
        type: Number,
        unique: true
    },
    "address_line": String,
    "city": String,
    "province": String,
    "postalCode": String,
    "country": String,
    "location_type": String,
    "instructions": String,
    "start_date": Date,
    "end_date": Date,
    "start_time": Date,
    "end_time": Date,
    "nurse_id": Array,
    "vaccine": [{
        "vaccine_type": String,
        "quantity": Number,
        "start_date": Date,
        "end_date": Date
    }]
},{ timestamps: true });

var locationModel = mongoose.model("locations", locationSchema);

// Create and save a new Location



module.exports.createNewLocation = (locationReq) => {
    return new Promise(function (resolve, reject) {
        const location = new locationModel(locationReq);
        // Save Booking in the database
        location.save()
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject({
                    message: err.message || "Some error occurred while adding new location."
                });
            });

    });
};





// Get All Locations

module.exports.getAllLocations = (req, res) => {
    locationModel.find()
        .then(locations => {
            res.send(locations);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving locations."
            });
        });
};

// Get Location by Location ID

/*module.exports.getLocationByID = (req, res) => {
    locationModel.findOne({ location_id: req.params.location_id })
        .then(location => {
            if (!location) {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.location_id
                });
            }
            res.send(location);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.location_id
                });
            }
            return res.status(500).send({
                message: "Error retrieving location with id " + req.params.location_id
            });
        });
};*/

module.exports.getLocationByID = (locationId) => {
    return new Promise(function (resolve, reject) {
        locationModel.findOne({ location_id: locationId })
            .then(location => {
                if (!location) {
                    reject({ message: "location not found with id " + locationId });
                }
                resolve(location);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    reject({ message: "Location not found with id " + locationId });
                }
                reject({ message: "Error retrieving location with id " + locationId });
            });
    });
}

// Update Location By Location ID


module.exports.updateLocationByID = (location_id, locationReq) => {
    // Find Location and update it with the request body
    return new Promise(function (resolve, reject) {
    locationModel.findOneAndUpdate({location_id : location_id}, 
        locationReq,
         {new: true})
        .then(location => {
            if (!location) {
                reject("location not found")
            }
            resolve(location)
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                reject("location not found")
            }
            reject("error updating location")
        });
    });
};





// Delete Location by Location ID

/*module.exports.deleteLocationByID = (req, res) => {
    // Find Location and delete it 
    locationModel.findOneAndRemove({ location_id: req.params.location_id })
        .then(location => {
            if (!location) {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.location_id
                });
            }
            res.send({ message: "Location deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Location not found with id " + req.params.location_id
                });
            }
            return res.status(500).send({
                message: "Could not delete Location with id " + req.params.location_id
            });
        });
};*/

