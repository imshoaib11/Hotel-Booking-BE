import { Router } from "express";
import sampleService from "../Service/sampleService.js";

const sample = Router()

sample.get('/get',sampleService.getSchema)
sample.post('/post',sampleService.createSchema)

export default sample;