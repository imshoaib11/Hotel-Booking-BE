import aModel from "../Modules/aSchema.js";

const goGet = async()=>{
    try{
        let data = await aModel.find();
    res.status(200).send({message:"Super",data:data})
    }
    catch(error){
        res.status(500).send({message:error.message || "Internal Server Error"})
    }
}

export default {
    goGet
}