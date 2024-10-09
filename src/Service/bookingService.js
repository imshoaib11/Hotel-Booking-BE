import bookingModel from "../Modules/bookingModule.js";
import roomModel from "../Modules/roomsModule.js"
import moment from "moment";
import Stripe from 'stripe';
import {v4 as uuidv4} from 'uuid'

moment.suppressDeprecationWarnings = true
const stripe = new Stripe('sk_test_51Q5t0mLtVKPRe7yOReD2oLhc4Q4HkFzVPEgmZ5LUn6kdC1ciND5X61Px2WYRmKtrrJ02jVq4xMNRoTZQChba6TaC00QCn5psWF ')
// const getBookingQuery = [
//     {
//         $lookup: {
//             from:"rooms",
//             localField:"roomId",
//             foreignField:"roomId",
//             as:"room_details"
//         }
//     },
//     {
//         $project: {
//             bookingId:1,
//             fromDate:1,
//             toDate:1,
//             totalDays:1,
//             totalAmount:1,
//             transanctionId:1,
//             status:1,
//             roomId: '$room_details.roomId',
//             roomName: '$room_details.roomName',
//             rentPerDay: '$room_details.rentPerDay'
//         }
//     },
//     {$unwind:'$roomId'},
//     {$unwind:'$roomName'},
//     {$unwind:'$rentPerDay'}
// ]


const getAllBookinngs = async (req, res) => {
    try {
        let bookings = await bookingModel.find()  // Add this log
        res.status(200).send({ message: "Displaying All Bookings", data: bookings });
    } catch (error) {
        res.status(500).send({ error: error.message || "Internal Server Error" });
    }
};

const createBooking = async(req,res) =>{

    let {userId,userName,token,totalAmount} = req.body
    
    try{
        const customer = await stripe.customers.create({
            email : token.email,
            source: token.id
        })
        const payment = await stripe.charges.create(
            {
                amount: totalAmount*100,
                customer: customer.id,
                currency: "INR",
                receipt_email: token.email
            },
            {
                idempotencyKey : uuidv4()
            }
        )

        if(payment){
    
            try {
                req.body.bookingId= Math.random().toString(36).slice(-11)
                userId = req.body.userId;
                userName = req.body.userName;
                req.body.transId = uuidv4()
                req.body.roomId = req.params.id 
                req.body.roomName = req.params.roomName
                req.body.rentPerDay = req.params.roomRent
                let fromDate = req.params.fromDate
                let toDate = req.params.toDate
                req.body.fromDate = fromDate
                req.body.toDate = toDate
                let checkInDate = moment(fromDate, 'DD-MM-YYYY')
                let checkOutDate = moment(toDate, 'DD-MM-YYYY')
                let totalDays = moment.duration(checkOutDate.diff(checkInDate)).asDays()+1
                req.body.totalDays = totalDays
                req.body.totalAmount = req.body.rentPerDay*totalDays
        
                const booking = await bookingModel.create(req.body);
                const tempRooms = await roomModel.findOne({roomId: booking.roomId});
                
                tempRooms.currentBookings.push({bookingId: booking.bookingId, fromDate: booking.fromDate, toDate: booking.toDate, 
                                                userId: booking.userId, bookingName: booking.userName, booking: booking.status})
        
                await tempRooms.save();
                // console.log(payment)
                
                res.status(200).send({ message: "Booking created successfully" });
            } catch (error) {
                res.status(500).send({ error: error.message || "Internal Server Error" });
            }
        }else{
            res.send("Payment Successful and Room is Booked")
        }
        
    }
    catch(error){
        res.status(404).json({error})
        console.log(error)
    } 
}

const getBookingByUserId = async(req,res) => {
    
    try{   
        const bookings = await bookingModel.find({userId:req.headers.userId})
        res.status(200).send({message:"User Bookings", data:bookings})
    }
    catch(error){
        res.status(500).json({error})
    }
}

const cancelBooking = async(req,res) =>{
    const {bookingId,roomId} = req.body
    try{
        const booking = await bookingModel.findOne({bookingId:bookingId})

        booking.status = 'Cancelled'

        await booking.save()

        const room = await roomModel.findOne({roomId:roomId})

        const bookings = room.currentBookings

        const temp = bookings.filter(booking=>booking.bookingId.toString()!=bookingId)

        room.currentBookings = temp

        await room.save()

        res.status(200).send({message:"Cancellation Done"})

    }
    catch(error){
        res.status(400).json(error)
    }
}


export default {
        getAllBookinngs,
        createBooking,
        getBookingByUserId,
        cancelBooking
}