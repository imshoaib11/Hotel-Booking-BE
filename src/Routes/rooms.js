import { Router } from "express";
import verify from "../Middleware/verify.js";
import roomsService from "../Service/roomsService.js";
import verifyAdmin from "../Middleware/verifyRole.js";

const roomRouter = Router()

roomRouter.get('/rooms',verify, roomsService.getAllRooms)
roomRouter.post('/createRooms',verify,roomsService.createRooms)
roomRouter.get('/:id',verify, roomsService.getRoomById)

export default roomRouter;