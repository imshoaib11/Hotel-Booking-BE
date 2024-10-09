import auth from '../Common/auth.js'
import userModel from '../Modules/userModule.js'

const verifyAdmin = async (req,res,next) =>{
    try{
      let token = req.headers.authorization?.split(" ")[1]
      
      if(token){
        let payload = await auth.decodeToken(token) 
        let user = await userModel.findById(payload.id)
        
        if(user && payload.role =="Admin" && user.role == payload.role)
        next()
        else
        res.status(403).send({message:"Unauthorized Access"})
      }
          
      else
        res.status(403).send({message:"Token Not Found"})
    }
    catch(error){
        res.status(500).send({error:error.message || "Internal Server Error"})
    } 
}

export default verifyAdmin