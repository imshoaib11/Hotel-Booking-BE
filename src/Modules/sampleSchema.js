import mongoose from './index.js'

const sampleSchema = new mongoose.Schema({
    bookingId: {
        type: String,
        unique: true,
        required: [true, "Booking Id is required"]
    },
    roomId: {
            type: String,
            required: [true, "Room Id is required"]
    },
    roomName: {
        type: String,
        required: [true, "Room Name is required"]
    },
    userId: {
        type: Number,
        required: [true, "User Id is required"]
    },
    user:{
        type: String,
        required: [true, "User Name is required"]
    },
    fromDate:{
        type: String,
        required: [true, "From Date is required"]
    },
    toDate:{
        type: String,
        required: [true, "To Date is required"]
    },
    rentPerDay:{
        type: Number,
        required: [true, "Rent Per Day is required"]
    },
    totalDays:{
        type: Number,
        required: [true, "Total Days is required"]
    },
    totalAmount:{
        type: Number,
        required: [true, "Total Amount is required"]
    },
    transId:{
        type: String,
        required: [true, "Transaction Id is required"]
    },
    status:{
        type: String,
        enum:["Completed","Confirmed","Cancelled"],
        default:"Confirmed",
        required: [true, "Status is required"]
    },
    bookedAt:{
        type: Date,
        default: Date.now()
    }
},
    {
        collection: "sample",
        versionKey: false
    })

    const sampleModel = mongoose.model("sample", sampleSchema)

    export default sampleModel

