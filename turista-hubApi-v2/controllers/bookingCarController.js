import BookingCar from "../models/BookingCar.js";
import { sendEmail } from '../utils/email.js'

export const createBooking = async (req ,res) => {
    const newBooking = new BookingCar(req.body)

try{
 const savedBooking = await newBooking.save()

 
         await sendEmail( 
   savedBooking.userEmail,
   'Booking Received – Awaiting Payment',
   `Dear ${savedBooking.fullName},\n\nWe have received your booking for the car .\n\nYour booking is currently pending until the payment is completed.\n\nThank you for choosing our service!`
 )

 
    res.status(200).json({
        success:true,
        message:'Car is booked',
        data:savedBooking,

    })
}
catch(err){
   res.status(500).json({
    success:false,
    message:"internal sever error"

   })
}

}


//get single booking
export const getBooking = async (req ,res) =>{
    const id = req.params.id

    try{
        const book = await BookingCar.findById(id)

        res.status(200).json({
            success:true,
            message:'succesful',
            data:book
        })



    } catch(err){
        res.status(500).json({
                  success:false,
        message:"internal sever error"
        })
  
    }
}



//get all booking 
export const getAllBooking = async (req,res) => {
    
    try{
        const allBooking = await BookingCar.find()

        res.status(200).json({
            success:true,
            message:'succesful',
            data:allBooking
        })
    }
    catch(err){
        res.status(500).json({
                  success:false,
        message:"internal sever error"
        })
}
}

