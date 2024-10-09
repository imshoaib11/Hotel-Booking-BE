import jwt from 'jsonwebtoken'
import auth from '../Common/auth.js'

const verify = async (req,res,next) =>{
    try{
      let token = req.headers.authorization?.split(" ")[1]
      
      if(token){
        let payload = await auth.decodeToken(token)
        if(payload.exp > Math.floor(Date.now()/1000)){
          req.headers.userId = payload.userId;
          req.headers.userName = payload.userName;
          
          next()
        }
        else
        res.status(403).send({message:"Token Expired"})
      }
          
      else
        res.status(403).send({message:"Token Not Found"})
    }
    catch(error){
        res.status(500).send({error:error.message || "Internal Server Error"})
    } 
}

export default verify
