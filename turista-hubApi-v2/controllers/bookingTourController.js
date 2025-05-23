import BookingTour from '../models//BookingTour.js'






//create new booking 
export const createBooking = async (req , res) =>{
const newBooking = new BookingTour(req.body)

    try{
const savedBooking = await newBooking.save()
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
        