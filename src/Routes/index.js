import { Router } from "express";
import userRouter from "./user.js";
import roomRouter from "./rooms.js";
import bookingRoute from "./booking.js";
import sample from "./sample.js";
import a from "./aRoute.js";

const router = Router();

router.use('/user', userRouter)
router.use('/room',roomRouter)
router.use('/booking', bookingRoute)
router.use('/', sample)
router.use('/', a)
export default router