/**
 * setting up the user model
 * Author : Moses Dhiraviam
 * Date : July 25, 2021
 *  */


const { timeStamp } = require("console");
const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");

// user model
const userSchema = new Schema({

    "user_id": {
        type: Number,
        unique: true
    },
    "first_name": String,
    "last_name": String,
    "isAdmin": Boolean,
    "isNurse": Boolean,
    "date_of_birth": Date,
    "mobile_number": {
        type: Number,
        unique: true
    },
    "email_address": {
        type: String,
        unique: true
    },
    "password": String,
    "salt": String,
    "terms_and_condition": Boolean,
    "created_ts": Number,
    "modified_ts": Number,
    "document_id_number": String
});

module.exports = mongoose.model("users", userSchema);

var userModel = mongoose.model("users", userSchema);

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, {
    model: "users", // collection or table name in which you want to apply auto increment
    field: "user_id", // field of model which you want to auto increment
    startAt: 201, // start your auto increment value from 1
    incrementBy: 1, // incremented by 1
});

module.exports.createNewUser = (userReq) => {

    return new Promise(function (resolve, reject) {
        const user = new userModel(userReq);
        // Save User in the database
        user.save()
            .then(data => {
                resolve(data);
            }).catch(err => {
                reject({
                    message: err.message || "Some error occurred while creating the User."
                });
            });
    });
};

module.exports.getAllUsers = () => {
    return new Promise(function (resolve, reject) {
        userModel.find()
            .then(users => {
                resolve(users);
            }).catch(err => {
                reject("no results returned");
            });
    });
}

module.exports.getUserByID = (req, res) => {
    return new Promise(function (resolve, reject) {
        userModel.findOne({ user_id: req.params.user_id })
            .then(user => {
                if (!user) {
                    reject("user not found");
                }
                resolve(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    reject("user not found");
                }
                reject("error retriving the user");
            });
    });
};


module.exports.updateUserByID = (userId, empReq) => {
    return new Promise(function (resolve, reject) {
        userModel.findOneAndUpdate({ user_id: userId },
            empReq,
            { new: true })
            .then(user => {
                if (!user) {
                    reject("user not found");
                }
                resolve(user);
            }).catch(err => {
                if (err.kind === 'ObjectId') {
                    reject("user not found");
                }
                reject("error updating the user");
            });
    });
};


module.exports.deleteUserByID = (req, res) => {
    // Find Booking and delete it 
    userModel.findOneAndRemove({ user_id: req.params.user_id })
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "user not found with id " + req.params.user_id
                });
            }
            res.send({ message: "user deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "user not found with id " + req.params.user_id
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.user_id
            });
        });
};