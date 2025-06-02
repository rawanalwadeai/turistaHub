import BookingBoat from '../models/BookingBoat.js';
import { sendEmail } from '../utils/email.js'

// Create new booking
export const createBoatBooking = async (req, res) => {
  const newBooking = new BookingBoat(req.body);

  try {
    const savedBooking = await newBooking.save();

    
            await sendEmail( 
      savedBooking.userEmail,
      'Booking Received – Awaiting Payment',
      `Dear ${savedBooking.fullName},\n\nWe have received your booking for the boat **${savedBooking.boatName}** .\n\nYour booking is currently pending until the payment is completed.\n\nThank you for choosing our service!`
    )
    

    res.status(200).json({
      success: true,
      message: 'Your boat is booked successfully',
      data: savedBooking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error:err.message
    });
  }
};

// Get single booking by ID
export const getBoatBooking = async (req, res) => {
  const id = req.params.id;

  try {
    const booking = await BookingBoat.findById(id);

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: booking,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Not found',
    });
  }
};

// Get all boat bookings
export const getAllBoatBookings = async (req, res) => {
  try {
    const bookings = await BookingBoat.find();

    res.status(200).json({
      success: true,
      message: 'Successful',
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
