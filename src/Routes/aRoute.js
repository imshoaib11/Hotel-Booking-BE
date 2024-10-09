import { Router } from "express";
import aService from "../Service/aService.js";

const a = Router()

a.get('/goget', aService.goGet)

export default a;