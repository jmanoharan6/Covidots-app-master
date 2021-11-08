/**
 * Authentication Service Testcase
 * @Author : Tanya Mittal <tmittal2@myseneca.ca>
 * @since : 02-August-2021
 *  */

 const authenticationService = require('../service/AuthenticationService'); 
 
 describe("The Authentication service", () => {
    describe("the Register function", () => {
        test("Should return appropriate message when password and confirm password does not match", () => {
            var userReq = {};
            userReq.password="Password";
            userReq.cpsw="WrongPassword";
            let result = authenticationService.RegisterTheUser(userReq);
            expect(result).rejects.toBe("password does not match");
        })
        test("Should return appropriate message when email already exist in the database", () => {
           var userReq = {};
           userReq.email_address="wtomicki47@nasa.gov";
           let result = authenticationService.RegisterTheUser(userReq);
           expect(result).rejects.toBe("Email already exists");
       })
       test("Should return appropriate message when mobile number already exist in the database", () => {
           var userReq = {};
           userReq.mobile_number="768 671 2495";
           let result = authenticationService.RegisterTheUser(userReq);
           expect(result).rejects.toBe("Mobile number already exists");
       })
    });
    describe("the login function", () => {
       test("Should return error when email address or password is blank", () => {
           var userReq = {};
           userReq.email_address = "";
           let result = authenticationService.AuthenticateTheUser(userReq);
           expect(result).rejects.toBe("Field cannot be blank");
       })

       test("should return error when email entered does not match with database", () => {
           var userReq = {};
           userReq.email_address = "emailnotfound@covidots.ca";
           userReq.password = "testpassword";
           let result = authenticationService.AuthenticateTheUser(userReq);
           expect(result).rejects.toBe("Email does not exists");
       })

       test("should return error when password entered does not match with email in database", () => {
           var userReq = {};
           userReq.email_address = "admin@covidots.ca";
           userReq.password = "testpassword";
           let result = authenticationService.AuthenticateTheUser(userReq);
           expect(result).rejects.toBe("Invalid credentials");
       })

       test("Should return admin if isAdmin property in database is true", () => {
           var userReq = {};
           userReq.email_address = "admin@covidots.ca";
           userReq.password = "admin";
           let result = authenticationService.AuthenticateTheUser(userReq);
           expect(result).resolves.toBe("User is an admin");
       })

       test("Should return nurse if isNurse property in database is true", () => {
           var userReq = {};
           userReq.email_address = "nurse@covidots.ca";
           userReq.password = "nurse";
           let result = authenticationService.AuthenticateTheUser(userReq);
           expect(result).resolves.toBe("User is a nurse");
       })

       test("Should return nurse if both isAdmin and isNurse property in database are false", () => {
           var userReq = {};
           userReq.email_address = "user@covidots.ca";
           userReq.password = "user";
           let result = authenticationService.AuthenticateTheUser(userReq);
           expect(result).resolves.toBe("User is a egular user");
       })
   });
 });
 
 
 