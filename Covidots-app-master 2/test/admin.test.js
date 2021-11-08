const adminService = require('../service/AdminService');
const userData = require("../models/UserModel")
const locationData = require("../models/LocationModel")
let date = new Date();

describe("The Admin service", () => {

    describe("update userByID function", () => {
    test("should return error when null is passes as a parameter for user_id",  ()=>{
        const mock = jest.spyOn(userData, 'updateUserByID');
            mock.mockImplementation(() => Promise.reject("user not found with id undefined"));
            var samp = {};
            samp.emp = "admin";
            var userId;
            expect(adminService.addNewEmployee(userId,samp)).rejects.toBe("user not found with id undefined");
    })

    test("should return error when invalid Id is passed as a parameter for user_id",  ()=>{
        const mock = jest.spyOn(userData, 'updateUserByID');
            mock.mockImplementation(() => Promise.reject("user not found with id 600"));
            var samp = {};
            samp.emp = "admin";
           
             expect(adminService.addNewEmployee(600,samp)).rejects.toBe("user not found with id 600");
    })


    test("should return error when unable to update object",  () => {
        const mock = jest.spyOn(userData, 'updateUserByID');
        mock.mockImplementation(() => Promise.reject("Error updating user with id 0"));
        var samp = {};
            samp.emp = "admin";
         expect(adminService.addNewEmployee(0, samp)).rejects.toBe("Error updating user with id  0");
    })

   
    test("should resolves Admin when admin rights are assigned",  () => {
        const mock = jest.spyOn(userData, 'updateUserByID');  // spy on Message.findOne()
        var emp={};
        emp.user_id = "3";
    emp.first_name = "Thomas";
    emp.last_name= "andre";
    emp.isAdmin = true;

    var samp={};
    samp.emp = "admin";
        mock.mockImplementation(() => Promise.resolve(emp));
        expect(adminService.addNewEmployee(3,samp)).resolves.toBe(emp);
    })
  });

  describe("add new location function", () => {

    test("should resolves new location when its added",  () => {
        const mock = jest.spyOn(locationData, 'createNewLocation');  // spy on Message.findOne()
        var location={};
        location.location_id= "27";
        location.address_line= "011 Kim Park";
        location.city= "Beausejour";
        location.province= "Manitoba";
        location.postalCode= "M1C";
        location.country = "Canada";
        location.location_type = "Loblaws";
        location.instructions= "Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.";
        location.start_date= "2020-11-24T09:59:08.000+00:00";
        location.end_date= "2021-04-17T21:20:55.000+00:00";
        location.start_time= "2021-07-02T16:07:53.000+00:00";
        location.end_time= "2021-09-24T04:07:46.000+00:00";
        location.created_ts= date.getDate();
        location.modified_ts= date.getDate();
        location.nurse_id= "23";      
        location.vaccine= [{
            vaccine_type: "covaxine",
            quantity: "30",
            start_date: "2020-11-24T09:59:08.000+00:00",
            end_date: "2021-04-17T21:20:55.000+00:00"
        }]
        mock.mockImplementation(() => Promise.resolve(location));
        expect(locationData.createNewLocation(location)).resolves.toBe(location);
    })

    test("should return error when trying to add a location with existing ID",  () => {
        const mock = jest.spyOn(locationData, 'createNewLocation');
        mock.mockImplementation(() => Promise.reject("Error adding location with ID 1"));
        var location={};
        location.location_id= "1";
        location.address_line= "011 Kim Park";
        location.city= "Beausejour";
        location.province= "Manitoba";
        location.postalCode= "M1C";
        location.country = "Canada";
        location.location_type = "Loblaws";
        location.instructions= "Vivamus tortor. Duis mattis egestas metus. Aenean fermentum.";
        location.start_date= "2020-11-24T09:59:08.000+00:00";
        location.end_date= "2021-04-17T21:20:55.000+00:00";
        location.start_time= "2021-07-02T16:07:53.000+00:00";
        location.end_time= "2021-09-24T04:07:46.000+00:00";
        location.created_ts= date.getDate();
        location.modified_ts= date.getDate();
        location.nurse_id= "23";      
        location.vaccine= [{
            vaccine_type: "covaxine",
            quantity: "30",
            start_date: "2020-11-24T09:59:08.000+00:00",
            end_date: "2021-04-17T21:20:55.000+00:00"
        }]
         expect(locationData.createNewLocation(location)).rejects.toBe("Error adding location with ID 1");
    })

});
});