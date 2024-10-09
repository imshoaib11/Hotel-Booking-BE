import roomsModel from '../Modules/roomsModule.js'
import {ObjectId} from 'mongodb'

const getAllRooms = async(req,res) =>{
    try{
        let rooms = await roomsModel.find()

    res.status(200).send({message:"Displaying All Rooms",data:rooms})
    }
    catch(error){
        res.status(500).send({message: error.message || "Internal Server Error"})
    }  
}

const createRooms = async(req,res) =>{
    try{
        req.body.roomId = Math.random().toString(36).slice(-8)
        await roomsModel.create(req.body)
        res.status(200).send({message:"Room Created Successfully"})
    }
    catch(error){
        res.status(500).send({error:message.error || "Internal Server Error"})
    }
}

const getRoomById = async(req,res) =>{
    try{  
        let id = req.params.id 
        // ObjectId.createFromHexString(id)  
        const room = await roomsModel.findOne({roomId:id})
        // if(!room)
        //     res.status(404).send({message: "Room not found"})
        // else
        res.status(200).send({message:`Displaying RoomById`,data:room})
    }
    catch(error){
        res.status(500).send({error:error.message || "Internal Server Error"})
    }
}

export default {
    getAllRooms,
    createRooms,
    getRoomById
}