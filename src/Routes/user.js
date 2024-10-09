import { Router } from "express";
import userService from "../Service/userService.js";
import verify from "../Middleware/verify.js"
import verifyAdmin from "../Middleware/verifyRole.js"
const userRouter = Router();

userRouter.get('/users',verify, userService.getUsers)
userRouter.post('/signup', userService.createUser)
userRouter.post('/login', userService.loginUser)
userRouter.post('/sendlink', userService.sendLink)
userRouter.post('/reset',userService.resetPassword)



export default userRouter;