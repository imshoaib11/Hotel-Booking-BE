import bcrypt from 'bcrypt';
import 'dotenv/config.js'
import jwt from 'jsonwebtoken'

const hashedPassword = async (password) =>{
   try{
        const salt = await bcrypt.genSaltSync(Number(process.env.SALT));
        const hash = await bcrypt.hash(password, salt);
        return hash
    } 
    catch(error){
        throw error;
    }
}

const hashCompare = async(password,hashedPassword) =>{
    try{
        const compare = await bcrypt.compare(password,hashedPassword);
        return compare
    }
    catch(error){
        throw error;
    } 
}

const createToken = async(payload) =>{
    try{
        return await jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn : '3h'})
    }
    catch(error){
        throw error
    }
}

const decodeToken = async (token) =>{
    try{
        return await jwt.decode(token)
    }
    catch(error){
        throw error
    }
}

export default {
    hashedPassword,
    hashCompare,
    createToken,
    decodeToken
}