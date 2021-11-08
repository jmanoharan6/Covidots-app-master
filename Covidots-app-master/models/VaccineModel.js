/**
 * Vaccine Model Definition
 * Author : Janani Manoharan
 * Date : Aug 2, 2021
 *  */

 const mongoose = require("mongoose");
 const { stringify } = require("querystring");
 let date = new Date();
 const Schema = mongoose.Schema;
 mongoose.Promise = require("bluebird");
 
 //Vaccine Model

 const vaccineSchema = new Schema({
    "vaccineId": {
        type: String,
        unique: true
    },
    "vaccineName": {
        type: String,
        unique: true
    },
},{ timestamps: true });

var vaccineModel = mongoose.model("vaccines", vaccineSchema);

module.exports.getAllVaccines = function () {

    return new Promise(function (resolve, reject) {
        vaccineModel.find()
        .then(vaccines => {
            resolve(vaccines);
        }).catch(err => {
            console.log("Some error occurred while retrieving Vaccines.");
            reject("no results returned");           
        });
    });
}