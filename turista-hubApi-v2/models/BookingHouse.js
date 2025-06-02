import mongoose from "mongoose";

const bookingHouseSchema = new mongoose.Schema(

{

  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
houseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Houses",
    },
    userEmail: {
      type: String,
    },
    placeName: {
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
        required:true
    },

    bookEndAt: {
        type:Date,
    },
    paymentStatus:{
      type:String,
      enum:["pending", "paid", "cancelled"],
      default:"pending"
    }



  },
  { timestamps: true }


)


export default mongoose.model("BookingHouse", bookingHouseSchema);