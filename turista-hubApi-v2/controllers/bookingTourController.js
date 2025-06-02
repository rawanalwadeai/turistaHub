import BookingTour from '../models//BookingTour.js'

import { sendEmail } from '../utils/email.js'





//create new booking 
export const createBooking = async (req , res) =>{
const newBooking = new BookingTour(req.body)

    try{
const savedBooking = await newBooking.save()






 await sendEmail( 
      savedBooking.userEmail,
      'Booking Received – Awaiting Payment',
      `Dear ${savedBooking.fullName},\n\nWe have received your booking for the ${savedBooking.tourDate} tour scheduled on ${savedBooking.tourDate}.\n\nYour booking is pending until payment is completed.\n\nThank you for choosing our service!`
    )

    

res.status(200).json({
    success: true,
    message: 'Your tour is booked',
    data: savedBooking
})
    }catch(err){
        res.status(500).json({
            success: false,
            message: 'All fields are required',
            error:err.message
           
        })

    }
}




//get single booking 
export const getBooking = async(req , res) => {
    const  id = req.params.id

    try{
        const book = await BookingTour.findById(id)


        res.status(200).json({
            success: true,
            message: 'successful',
            data: book
        })
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: 'not found ',
                   
                })
        
            }
        }
        


        //get all booking 
export const getAllBooking = async(req , res) => {

    try{
        const books = await BookingTour.find()


        res.status(200).json({
            success: true,
            message: 'successful',
            data: books
        })
            }catch(err){
                res.status(500).json({
                    success: false,
                    message: ' server error ',
                   
                })
        
            }
        }
        