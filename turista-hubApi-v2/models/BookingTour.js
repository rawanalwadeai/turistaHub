import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  { 
    
   
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tour",
    },
     userId: {
     type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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
        type:String,
        required:true
    },
    bookAt: {
        type:Date,
        required:false,
         default: Date.now,
    },

      tourDate: { 
      type: Date},

    paymentStatus:{
      type:String,
      enum:["pending", "paid", "cancelled"],
      default:"pending"
    }

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);