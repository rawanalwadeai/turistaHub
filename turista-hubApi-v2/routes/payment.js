import express from 'express'
import BookingTour from '../models/BookingTour.js'
import BookingBoat from '../models/BookingBoat.js'
import BookingHouse from '../models/BookingHouse.js'
import BookingCar from '../models/BookingCar.js'
    import { sendEmail } from '../utils/email.js'

const router = express.Router()

// تحديد الموديل حسب نوع الحجز
const getBookingModel = () => {
  switch (type) {
    case 'tour':
      return BookingTour
    case 'boat':
      return BookingBoat
    case 'house':
      return BookingHouse
    case 'car':
      return BookingCar
    default:
      return null
  }
}

router.put('/:type/:id/payment', async (req, res) => {
  const { type, id } = req.params
  const BookingModel = getBookingModel(type)

  if (!BookingModel) {
    return res.status(400).json({ message: 'Invalid booking type' })
  }

  try {
    const updatedBooking = await BookingModel.findByIdAndUpdate(

        
      id,
      { paymentStatus: 'paid' },
      { new: true }


 
    )




    if (!updatedBooking) {
      return res.status(404).json({ message: 'Booking not found' })
    }

await sendEmail(
  updatedBooking.userEmail,
  'Payment Confirmation',
  `Dear ${updatedBooking.fullName},\n\nWe have successfully received your payment for the ${type} booking.\n\nYour booking is now confirmed. Have a great trip!`
)


    res.status(200).json({ message: 'Payment successful', booking: updatedBooking })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
