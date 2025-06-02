import mongoose from 'mongoose';

const carSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    model: {
      type: String,
      // required: true
    },
    year: {
      type: Number,
      // required: true
    },
    price: {
      type: Number,
      required: true
    },
    address: { // ممكن احذفه بعدين لو ضبط السيتي 
      type: String,
      // required: true
    },
     city: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    type: {
      type: String,
    },
    photo: {
      type: String,
      // required: true
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review"
      }
    ],
    fuelType: { // نوع الوقود
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
    },
    doors: { // عدد الأبواب
      type: Number,
      enum: [2, 4, 5],
    },
    seats: { // عدد المقاعد
      type: Number,
      required: true,
    },

    location: { // الموقع
      type: String,
      // required: true,
    },
    insurance: { // نوع التأمين
      type: String,
      enum: ['Full Coverage', 'Collision', 'No Insurance'],
    },
    amenities: [{ // الكماليات
      type: String,
      enum: ['AC', 'Bluetooth', 'GPS', 'Sunroof', 'Leather Seats'],
    }],
    condition: { // حالة السيارة
      type: String,
      enum: ['New', 'Used', 'Like New'],
    },
    driverOption: { // مع سائق أو بدون سائق
      type: String,
      enum: ['With Driver', 'Without Driver'],
    },
    mileage: { // المسافة المقطوعة
      type: Number,
      required: true,
    },
    color: { // اللون
      type: String,
      enum: ['Red', 'Blue', 'Black', 'White', 'Silver', 'Gray'],
    },
    transmission: { // نوع ناقل الحركة
      type: String,
      enum: ['Manual', 'Automatic'],
    },

    pickupDate: {
type:Date,
required:true
    },

    endDate: {
      type:Date,
      required:true

    },

    availableDates: [{ // تواريخ متاحة
      type: Date,
    }],
    deliveryService: { // خدمة توصيل السيارة
      type: Boolean,
      default: false,
    },



  },
  { timestamps: true }
);

export default mongoose.model("Cars", carSchema);
