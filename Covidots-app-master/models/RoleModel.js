
/**
 * Role Model Definition
 * Author : Anjusha Bhaskaran
 * Date : July 18, 2021
 *  */

const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

mongoose.Promise = require("bluebird");

// role model
const roleSchema = new Schema({
    "name": {
        type: String,
        unique: true
    },
    "role_id": {
        type: String,
        unique: true
    },
});

var RoleModel = mongoose.model("role", roleSchema);

module.exports.getAllRoles = function () {

    return new Promise(function (resolve, reject) {
        RoleModel.find({}).then(roles => {
            if (roles.length > 0) {
                var roleMap = {};
                roles.forEach(function (role) {
                    roleMap[role.role_id] = role;
                });
                resolve(roleMap);
            } else {
                console.log("no roles found");
                reject("no results returned");
            }
        }).catch(function (error) {
            console.log("Something went wrong during the find all roles operation!");
            reject();
        });
    });
}