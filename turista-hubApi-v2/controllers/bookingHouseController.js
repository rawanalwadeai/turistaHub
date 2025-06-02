import BookingHouse from '../models/BookingHouse.js';
import { sendEmail } from '../utils/email.js'

// Create new house booking
export const createHouseBooking = async (req, res) => {
    // const houseId = req.params.houseId;
  const newBooking = new BookingHouse(req.body);


  try {
    const savedBooking = await newBooking.save();
 
  
        await sendEmail( 
  savedBooking.userEmail,
  'Booking Received – Awaiting Payment',
  `Dear ${savedBooking.fullName},\n\nWe have received your booking for the house **${savedBooking.placeName}** .\n\nYour booking is currently pending until the payment is completed.\n\nThank you for choosing our service!`
)

    
    
    
    res.status(200).json({
      success: true,
      message: 'Your house has been booked successfully.',
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
      error: err.message
    });
  }
};

// Get single house booking
export const getHouseBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await BookingHouse.findById(id);

    res.status(200).json({
      success: true,
      message: 'Booking found successfully.',
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Booking not found.',
    });
  }
};

// Get all house bookings
export const getAllHouseBookings = async (req, res) => {
  try {
    const bookings = await BookingHouse.find();

    res.status(200).json({
      success: true,
      message: 'All bookings fetched successfully.',
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error.',
    });
  }
};
