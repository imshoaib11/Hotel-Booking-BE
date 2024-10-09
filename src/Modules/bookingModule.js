import mongoose from './index.js'

const bookingSchema = new mongoose.Schema({
    bookingId:{
        type: String,
        required: [true, "BookingId is required"],
        unique: true
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
    userName:{
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
        required: [true, "Transaction Id is required"],
        unique: true
    },
    status:{
        type: String,
        default:"Confirmed",
        required: [true, "Status is required"]
    },
            
    bookedAt:{
        type: Date,
        default: Date.now()
    }
},
    {
        collection: "bookings",
        versionKey: false
    })

    const bookingModel = mongoose.model("Bookings", bookingSchema)

    export default bookingModel

