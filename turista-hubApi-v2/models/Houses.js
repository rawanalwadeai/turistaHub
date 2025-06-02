import mongoose from 'mongoose';

const houseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    city: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    maxGuests: {
      type: Number,
      required: true
    },

    desc: {
      type: String,
      required: true
    },

    photo: {
      type: String,
      // required: true
    },

    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Review'
      }
    ],

    amenities: {
      parking: {
        type: String, // Could be 'Reserved Parking', 'Private Parking', etc.
        required: false
      },
      elevator: {
        type: Boolean,
        default: false
      },
      wheelchairAccessible: {
        type: Boolean,
        default: false
      },
      petsAllowed: {
        type: Boolean,
        default: false
      },
      wifi: {
        type: Boolean,
        default: false
      },
      airConditioning: {
        type: Boolean,
        default: false
      },
      heating: {
        type: Boolean,
        default: false
      },
      tv: {
        type: Boolean,
        default: false
      },
      kitchen: {
        type: Boolean,
        default: false
      },
      coffeeMaker: {
        type: Boolean,
        default: false
      },
      dishwasher: {
        type: Boolean,
        default: false
      },
      microwave: {
        type: Boolean,
        default: false
      },
      laundry: {
        type: String, // Could be 'In-unit Laundry', 'Nearby Laundromat', etc.
        required: false
      },
      pool: {
        type: Boolean,
        default: false
      },
      hotTub: {
        type: Boolean,
        default: false
      },
      smokingAllowed: {
        type: Boolean,
        default: false
      },
      restaurantAvailable: {
        type: Boolean,
        default: false
      },
      breakfastIncluded: {
        type: Boolean,
        default: false
      },
      businessCenter: {
        type: Boolean,
        default: false
      }
    },

    nearbyAttractions: {
      type: [String],
      required: false
    }

  },
  { timestamps: true }
);

export default mongoose.model('House', houseSchema  );
