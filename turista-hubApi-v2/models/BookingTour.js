import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: "Tour",
    },
    userEmail: {
      type: String,
    },
    tourName: {
        type:String,
        required:true
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
        type:Number,
        required:true
    },
    phone: {
        type:Number,
        required:true
    },
    bookAt: {
        type:Date,
        required:false
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);