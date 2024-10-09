import mongoose from './index.js'

const roomSchema = new mongoose.Schema({
    roomId:{
        type: String,
        unique: true,
        required: [true, "roomId is required"]
    },
    roomName:{
        type: String,
        required: [true, "Room Name is required"]
    },
    roomLocation:{
        type: String,
        required: [true, "Room Location is required"]
    },
    amenities:{
        type: String,
        required: [true, "Amenities Required"]
    },
    roomType:{
        type: String,
        enum:["Delux","Non-Delux"],
        required:[true,"Room Type is required"]
    },
    roomCapacity:{
        type: Number,
        required: [true,"Room Capacity is required"]
    },
    roomRent:{
        type: Number,
        required: [true,"Room Rent is required"]
    },
    phone:{
        type: String,
        required: [true,"Phone is required"]
    },
    images: [],
    currentBookings:[],
    description:{
        type: String,
        required: [true,"Description is required"]
    },
    address:{
        type: String,
        required: [true,"Address is required"]
    }
},
    {
        collection:"Rooms",
        versionKey: false,
        timestamps: true
    })

    const roomModel = mongoose.model("Rooms",roomSchema)

    export default roomModel