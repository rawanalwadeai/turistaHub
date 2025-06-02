import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      // unique: true,
    },
    city: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },

    tourDate: { 
      type: Date},
      
    photo: {
      type: String,
      // required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      // required: true,
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
    },
    activityType: {
      type: [String], // قائمة الأنشطة
      required: true,
    },
    internet: {
      type: Boolean,
      // required: true,
    },
    familyFriendly: {
      type: Boolean,
      required: true,
    },
    durationType: {
      type: String,
      enum: ["day", "multi-day"], // تحديد نوع المدة
      required: true,
    },
    availableDays: {
      type: [String], // أيام الرحلات المتاحة
      required: true,
    },
    adventureLevel: {
      type: String,
      enum: ["Low", "Medium", "High"], // مستوى المغامرة
      required: true,
    },
    guideIncluded: {
      type: Boolean,
      // required: true,
    },
    // languages: {
    //   type: [String], // اللغات المتاحة
    //   required: true,
    // },
    mealsIncluded: {
      type: Boolean,
      // required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
