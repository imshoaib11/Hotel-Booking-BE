import { Router } from "express";
import verify from "../Middleware/verify.js";
import verifyAdmin from "../Middleware/verifyRole.js";
import bookingService from "../Service/bookingService.js";

const bookingRoute = Router();

bookingRoute.get('/bookings',verify, bookingService.getAllBookinngs)
bookingRoute.post('/createBookings/:id/:fromDate/:toDate/:roomName/:roomRent',verify, bookingService.createBooking)
bookingRoute.post('/cancelBooking',verify,bookingService.cancelBooking)
bookingRoute.get('/userbookings',verify,bookingService.getBookingByUserId)

export default bookingRoute;