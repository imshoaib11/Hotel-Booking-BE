import sampleModel from '../Modules/sampleSchema.js'

const createSchema = async(req,res) =>{
 
    try{
        let sample = new sampleModel(req.body)
        await sample.save()
        res.status(200).send({message:"OK"})
}
    catch(error){
        res.status(500).send({error:error.message})
    }
}

const getSchema = async(req,res) =>{
    try{
        let schema = await sampleModel.find()
        res.status(200).send({message:"Displaying All Schemas", data:schema})
    }
    catch(error){
        res.status(500).send({error:error.message})
    }
}

export default {
    createSchema,
    getSchema
}