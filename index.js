import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import router from './src/Routes/index.js';

dotenv.config()

const PORT = process.env.PORT || 8000

const app = express();

app.use(cors())

app.use(express.json());

app.get('/', (req,res)=> {
    res.status(200).send(`<h1>Server is up and running on PORT ${PORT}<h1>`)
})

app.use(router)



app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`))