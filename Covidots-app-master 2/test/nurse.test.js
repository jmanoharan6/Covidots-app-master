/**
 * Nurse Service Testcase
 * @Author : Anjusha Bhaskaran <abhaskaran1@myseneca.ca>
 * @since : 01-August-2021
 *  */

const nurseService = require('../service/NurseService');
const BookingData = require("../models/BookingModel")

describe("The Nurse service", () => {
    describe("the getUserBookingsForDay function", () => {
        test("should return empty bookings when no booking has been created yet", () => {
            const mock = jest.spyOn(BookingData, 'getAllBookingsForToday');
            var booking = {};
            mock.mockImplementation(() => Promise.resolve(booking));
            expect(nurseService.getUserBookingsForDay()).resolves.toBe(booking);
        })

        test("should return 'bookings' when booking has been created for the day", () => {
            const mock = jest.spyOn(BookingData, 'getAllBookingsForToday');
            var booking = {};
            booking.booking_id = 2;
            booking.booking_date = "2021-08-02T00:00:00.000Z";
            booking.status = "BOOKED";
            mock.mockImplementation(() => Promise.resolve(booking));
            expect(nurseService.getUserBookingsForDay()).resolves.toBe(booking);
        })
    });

    describe("the updateUserBooking function", () => {
        test("should return error for invalid booking id ", () => {
            const mock = jest.spyOn(BookingData, 'updateBookingByID');
            mock.mockImplementation(() => Promise.reject("Booking not found with id 0"));
            var bookingReq = {};
            bookingReq.status = "TEST";
            expect(nurseService.updateUserBooking(0, bookingReq)).rejects.toBe("Booking not found with id 0");
        })

        test("should return error when unable to update object", () => {
            const mock = jest.spyOn(BookingData, 'updateBookingByID');
            mock.mockImplementation(() => Promise.reject("Error updating booking with id 0"));
            var bookingReq = {};
            bookingReq.status = "TEST";
            expect(nurseService.updateUserBooking(0, bookingReq)).rejects.toBe("Error updating booking with id 0");
        })

        test("should return error when null booking id is passed", () => {
            const mock = jest.spyOn(BookingData, 'updateBookingByID');
            mock.mockImplementation(() => Promise.reject("Booking not found with id undefined"));
            var bookingReq = {};
            bookingReq.status = "TEST";
            var bookingId;
            expect(nurseService.updateUserBooking(bookingId, bookingReq)).rejects.toBe("Booking not found with id undefined");
        })

        test("should return 'bookings' when booking has been created for the day", () => {
            const mock = jest.spyOn(BookingData, 'updateBookingByID');
            var bookingReq = {};
            bookingReq.status = "TEST";
            var booking = {};
            booking.booking_id = 123;
            booking.booking_date = "2021-08-02T00:00:00.000Z";
            booking.status = "TEST";
            mock.mockImplementation(() => Promise.resolve(booking));
            expect(nurseService.updateUserBooking(123, bookingReq)).resolves.toBe(booking);
        })
    });
});


