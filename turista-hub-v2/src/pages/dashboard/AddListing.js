import React, { useState } from 'react';



import useFetchA from '../../hooks/useFetchA.js'
import { BASE_URL } from '../../utils/configB.js'

const AddListing = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'houses',
    desc: '',
    price: '',
    rating: 0,
  });




const { data: items, loading, error } = useFetchA(`${BASE_URL}/${formData.category}`);

  const [extraFields, setExtraFields] = useState({});

  // عند تغيير الحقول الأساسية
  const handleChange = (e) => {
    const { name, value } = e.target;

    // لو غيرنا الفئة (category) نرجع extraFields فاضي
    if (name === 'category') {
      setExtraFields({});
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // عند تغيير الحقول الإضافية حسب الفئة
  const handleExtraChange = (e) => {
    const { name, value } = e.target;
    setExtraFields({ ...extraFields, [name]: value });
  };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // دمج البيانات الأساسية مع الإضافية عند الإرسال
//     const listingData = { ...formData, ...extraFields };
//     onAdd(listingData);

//     // إعادة تعيين الفورم
//     setFormData({
//       title: '',
//       category: 'Apartment',
//       desc: '',
//       price: '',
//       city: '',
//       rating: 0,
//     });
//     setExtraFields({});
//   };




const handleSubmit = async (e) => {
  e.preventDefault();

  const listingData = { ...formData, ...extraFields };

  try {
    const response = await fetch(`${BASE_URL}/${formData.category}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(listingData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Something went wrong!');
    }

    alert('Listing added successfully!');
    
    // إعادة تعيين النموذج
    setFormData({
      title: '',
      category: 'houses',
      desc: '',
      price: '',
      rating: 0,
    });
    setExtraFields({});
  } catch (error) {
    alert('Error: ' + error.message);
  }
};


  // نحدد الحقول الإضافية حسب الكتالوجي
  const renderExtraFields = () => {
    switch (formData.category) {
      case 'cars':
        return (
         <>
  {/* نوع السيارة */}
  <div className="mb-3">
    <label className="form-label">Car Type</label>
    <select
      className="form-select"
      name="type"
      value={extraFields.type || ''}
      onChange={handleExtraChange}
      required
    >
      <option value="">Select car type</option>
      <option value="Sedan">Sedan</option>
      <option value="SUV">SUV</option>
      <option value="Truck">Truck</option>
      <option value="Convertible">Convertible</option>
    </select>
  </div>

  {/* نوع الوقود */}
  <div className="mb-3">
    <label className="form-label">Fuel Type</label>
    <select
      className="form-select"
      name="fuelType"
      value={extraFields.fuelType || ''}
      onChange={handleExtraChange}
      required
    >
      <option value="">Select fuel type</option>
      <option value="Petrol">Petrol</option>
      <option value="Diesel">Diesel</option>
      <option value="Electric">Electric</option>
      <option value="Hybrid">Hybrid</option>
    </select>
  </div>

  {/* عدد الأبواب */}
  <div className="mb-3">
    <label className="form-label">Number of Doors</label>
    <select
      className="form-select"
      name="doors"
      value={extraFields.doors || ''}
      onChange={handleExtraChange}
    >
      <option value="">Select doors</option>
      <option value={2}>2</option>
      <option value={4}>4</option>
      <option value={5}>5</option>
    </select>
  </div>

  {/* عدد المقاعد */}
  <div className="mb-3">
    <label className="form-label">Number of Seats</label>
    <input
      type="number"
      className="form-control"
      name="seats"
      value={extraFields.seats || ''}
      onChange={handleExtraChange}
      required
    />
  </div>


  {/* نوع التأمين */}
  <div className="mb-3">
    <label className="form-label">Insurance Type</label>
    <select
      className="form-select"
      name="insurance"
      value={extraFields.insurance || ''}
      onChange={handleExtraChange}
    >
      <option value="">Select insurance</option>
      <option value="Full Coverage">Full Coverage</option>
      <option value="Collision">Collision</option>
      <option value="No Insurance">No Insurance</option>
    </select>
  </div>

  {/* الكماليات */}
  <div className="mb-3">
    <label className="form-label">Amenities</label>
    <div className="form-check">
      {['AC', 'Bluetooth', 'GPS', 'Sunroof', 'Leather Seats'].map((item) => (
        <div key={item}>
          <input
            className="form-check-input"
            type="checkbox"
            name="amenities"
            value={item}
            checked={extraFields.amenities?.includes(item) || false}
            onChange={handleExtraChange}
          />
          <label className="form-check-label">{item}</label>
        </div>
      ))}
    </div>
  </div>

  {/* حالة السيارة */}
  <div className="mb-3">
    <label className="form-label">Condition</label>
    <select
      className="form-select"
      name="condition"
      value={extraFields.condition || ''}
      onChange={handleExtraChange}
    >
      <option value="">Select condition</option>
      <option value="New">New</option>
      <option value="Used">Used</option>
      <option value="Like New">Like New</option>
    </select>
  </div>

  {/* خيار السائق */}
  <div className="mb-3">
    <label className="form-label">Driver Option</label>
    <select
      className="form-select"
      name="driverOption"
      value={extraFields.driverOption || ''}
      onChange={handleExtraChange}
    >
      <option value="">Select driver option</option>
      <option value="With Driver">With Driver</option>
      <option value="Without Driver">Without Driver</option>
    </select>
  </div>

  {/* المسافة المقطوعة */}
  <div className="mb-3">
    <label className="form-label">Mileage (in km)</label>
    <input
      type="number"
      className="form-control"
      name="mileage"
      value={extraFields.mileage || ''}
      onChange={handleExtraChange}
      required
    />
  </div>

  {/* اللون */}
  <div className="mb-3">
    <label className="form-label">Color</label>
    <select
      className="form-select"
      name="color"
      value={extraFields.color || ''}
      onChange={handleExtraChange}
    >
      <option value="">Select color</option>
      <option value="Red">Red</option>
      <option value="Blue">Blue</option>
      <option value="Black">Black</option>
      <option value="White">White</option>
      <option value="Silver">Silver</option>
      <option value="Gray">Gray</option>
    </select>
  </div>

  {/* ناقل الحركة */}
  <div className="mb-3">
    <label className="form-label">Transmission</label>
    <select
      className="form-select"
      name="transmission"
      value={extraFields.transmission || ''}
      onChange={handleExtraChange}
    >
      <option value="">Select transmission</option>
      <option value="Manual">Manual</option>
      <option value="Automatic">Automatic</option>
    </select>
  </div>

  {/* تاريخ الاستلام */}
  <div className="mb-3">
    <label className="form-label">Pickup Date</label>
    <input
      type="date"
      className="form-control"
      name="pickupDate"
      value={extraFields.pickupDate || ''}
      onChange={handleExtraChange}
      required
    />
  </div>

  {/* تاريخ الإرجاع */}
  <div className="mb-3">
    <label className="form-label">End Date</label>
    <input
      type="date"
      className="form-control"
      name="endDate"
      value={extraFields.endDate || ''}
      onChange={handleExtraChange}
      required
    />
  </div>

  {/* خدمة التوصيل */}
  <div className="mb-3 form-check">
    <input
      className="form-check-input"
      type="Boolean"
      name="deliveryService"
      checked={extraFields.deliveryService || false}
      onChange={handleExtraChange}
    />
    <label className="form-check-label">Delivery Service Available</label>
  </div>
</>
 );

     case 'houses':
  return (
    <>
      

      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          name="address"
          value={extraFields.address || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Max Guests</label>
        <input
          type="number"
          className="form-control"
          name="maxGuests"
          value={extraFields.maxGuests || ''}
          onChange={handleExtraChange}
          min="1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Nearby Attractions</label>
        <input
          type="text"
          className="form-control"
          name="nearbyAttractions"
          value={extraFields.nearbyAttractions || ''}
          onChange={handleExtraChange}
          placeholder="e.g. Beach, Mall, Park"
        />
        <small className="text-muted">Separate by commas</small>
      </div>

      <div className="mb-3">
        <label className="form-label">Laundry</label>
        <select
          className="form-select"
          name="laundry"
          value={extraFields.laundry || ''}
          onChange={handleExtraChange}
        >
          <option value="">Select laundry type</option>
          <option value="In-unit Laundry">In-unit Laundry</option>
          <option value="Nearby Laundromat">Nearby Laundromat</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Parking</label>
        <select
          className="form-select"
          name="parking"
          value={extraFields.parking || ''}
          onChange={handleExtraChange}
        >
          <option value="">Select parking type</option>
          <option value="Reserved Parking">Reserved Parking</option>
          <option value="Private Parking">Private Parking</option>
        </select>
      </div>

      {/* Boolean Amenities */}
      {[
        'elevator',
        'wheelchairAccessible',
        'petsAllowed',
        'wifi',
        'airConditioning',
        'heating',
        'tv',
        'kitchen',
        'coffeeMaker',
        'dishwasher',
        'microwave',
        'pool',
        'hotTub',
        'smokingAllowed',
        'restaurantAvailable',
        'breakfastIncluded',
        'businessCenter'
      ].map((amenity) => (
        <div className="form-check form-switch mb-2" key={amenity}>
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id={amenity}
            name={amenity}
            checked={extraFields[amenity] || false}
            onChange={(e) =>
              handleExtraChange({
                target: {
                  name: amenity,
                  value: e.target.checked
                }
              })
            }
          />
          <label className="form-check-label" htmlFor={amenity}>
            {amenity.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
          </label>
        </div>
      ))}
    </>
  );

      case 'tours':
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Region</label>
        <input
          type="text"
          className="form-control"
          name="region"
          value={extraFields.region || ''}
          onChange={handleExtraChange}
          placeholder="e.g. Asir, Tabuk"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Activity Type</label>
        <select
          multiple
          className="form-select"
          name="activityType"
          value={extraFields.activityType || []}
          onChange={(e) =>
            handleExtraChange({
              target: {
                name: 'activityType',
                value: Array.from(e.target.selectedOptions, (option) => option.value),
              },
            })
          }
          required
        >
          <option value="Hiking">Hiking</option>
          <option value="Sightseeing">Sightseeing</option>
          <option value="Camping">Camping</option>
          <option value="Cultural">Cultural</option>
        </select>
        <small className="text-muted">Hold Ctrl or Cmd to select multiple</small>
      </div>

      <div className="mb-3">
        <label className="form-label">Available Days</label>
        <select
          multiple
          className="form-select"
          name="availableDays"
          value={extraFields.availableDays || []}
          onChange={(e) =>
            handleExtraChange({
              target: {
                name: 'availableDays',
                value: Array.from(e.target.selectedOptions, (option) => option.value),
              },
            })
          }
          required
        >
          <option value="Sunday">Sunday</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Adventure Level</label>
        <select
          className="form-select"
          name="adventureLevel"
          value={extraFields.adventureLevel || ''}
          onChange={handleExtraChange}
          required
        >
          <option value="">Select level</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Duration Type</label>
        <select
          className="form-select"
          name="durationType"
          value={extraFields.durationType || ''}
          onChange={handleExtraChange}
          required
        >
          <option value="">Select duration</option>
          <option value="day">Day</option>
          <option value="multi-day">Multi-day</option>
        </select>
      </div>

      {/* Boolean Options */}
      {[
        'internet',
        'familyFriendly',
        'guideIncluded',
        'mealsIncluded',
        'featured'
      ].map((boolField) => (
        <div className="form-check form-switch mb-2" key={boolField}>
          <input
            className="form-check-input"
            type="checkbox"
            id={boolField}
            name={boolField}
            checked={extraFields[boolField] || false}
            onChange={(e) =>
              handleExtraChange({
                target: {
                  name: boolField,
                  value: e.target.checked
                }
              })
            }
          />
          <label className="form-check-label" htmlFor={boolField}>
            {boolField.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
          </label>
        </div>
      ))}
    </>
  );




  case 'boats':
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Boat Name</label>
        <input
          type="text"
          className="form-control"
          name="boat_name"
          value={extraFields.boat_name || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          name="location"
          value={extraFields.location || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Max Passengers</label>
        <input
          type="number"
          className="form-control"
          name="max_passengers"
          value={extraFields.max_passengers || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Price Per Hour</label>
        <input
          type="number"
          className="form-control"
          name="price_per_hour"
          value={extraFields.price_per_hour || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Image URL</label>
        <input
          type="text"
          className="form-control"
          name="image_url"
          value={extraFields.image_url || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Company Name</label>
        <input
          type="text"
          className="form-control"
          name="company_name"
          value={extraFields.company_name || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="featured"
          name="featured"
          checked={extraFields.featured || false}
          onChange={(e) =>
            handleExtraChange({
              target: {
                name: 'featured',
                value: e.target.checked,
              },
            })
          }
        />
        <label className="form-check-label" htmlFor="featured">Featured</label>
      </div>

      <div className="mb-3">
        <label className="form-label">Features</label>
        {[
          'meals_provided',
          'music_system',
          'wifi',
          'air_conditioned',
          'tour_guide',
          'outdoor_seating',
          'swimming_allowed',
        ].map((feature) => (
          <div className="form-check" key={feature}>
            <input
              className="form-check-input"
              type="checkbox"
              id={feature}
              name={feature}
              checked={extraFields.features?.[feature] || false}
              onChange={(e) =>
                handleExtraChange({
                  target: {
                    name: `features.${feature}`,
                    value: e.target.checked,
                  },
                })
              }
            />
            <label className="form-check-label" htmlFor={feature}>
              {feature.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>
          </div>
        ))}
      </div>
    </>
  );


  case 'translator':
  return (
    <>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          value={extraFields.name || ''}
          onChange={handleExtraChange}
          required
        />
      </div>

      {/* <div className="mb-3">
        <label className="form-label">City</label>
        <input
          type="text"
          className="form-control"
          name="city"
          value={extraFields.city || ''}
          onChange={handleExtraChange}
          required
        />
      </div> */}

      <div className="mb-3">
        <label className="form-label">Languages</label>
        <select
          className="form-select"
          name="languages"
          multiple
          value={extraFields.languages || []}
          onChange={(e) =>
            handleExtraChange({
              target: {
                name: 'languages',
                value: Array.from(e.target.selectedOptions, (option) => option.value),
              },
            })
          }
          required
        >
          <option value="English">English</option>
          <option value="Arabic">Arabic</option>
          <option value="French">French</option>
          <option value="Turkish">Turkish</option>
          <option value="Spanish">Spanish</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Expertise Level</label>
        <select
          className="form-select"
          name="expertiseLevel"
          value={extraFields.expertiseLevel || ''}
          onChange={handleExtraChange}
          required
        >
          <option value="">Select level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* <div className="mb-3">
        <label className="form-label">Photo URL</label>
        <input
          type="text"
          className="form-control"
          name="photo"
          value={extraFields.photo || ''}
          onChange={handleExtraChange}
        />
      </div> */}

      {/* <div className="mb-3">
        <label className="form-label">Price per Hour</label>
        <input
          type="number"
          className="form-control"
          name="pricePerHour"
          value={extraFields.pricePerHour || ''}
          onChange={handleExtraChange}
          required
        />
      </div> */}

      <div className="mb-3">
        <label className="form-label">Availability</label>
        <select
          className="form-select"
          name="availability"
          multiple
          value={extraFields.availability || []}
          onChange={(e) =>
            handleExtraChange({
              target: {
                name: 'availability',
                value: Array.from(e.target.selectedOptions, (option) => option.value),
              },
            })
          }
          required
        >
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Specializations</label>
        <select
          className="form-select"
          name="specializations"
          multiple
          value={extraFields.specializations || []}
          onChange={(e) =>
            handleExtraChange({
              target: {
                name: 'specializations',
                value: Array.from(e.target.selectedOptions, (option) => option.value),
              },
            })
          }
          required
        >
          <option value="Legal">Legal</option>
          <option value="Medical">Medical</option>
          <option value="Technical">Technical</option>
          <option value="Business">Business</option>
          <option value="Academic">Academic</option>
        </select>
      </div>

      <div className="form-check form-switch mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="isCertified"
          name="isCertified"
          checked={extraFields.isCertified || false}
          onChange={(e) =>
            handleExtraChange({
              target: {
                name: 'isCertified',
                value: e.target.checked,
              },
            })
          }
        />
        <label className="form-check-label" htmlFor="isCertified">Certified</label>
      </div>
    </>
  );


        
      // ممكن تضيف حالات أخرى للفئات Boat، Translator ...
      default:
        return null;
    }
  };

  return (
    <form className="bg-light p-4 rounded" onSubmit={handleSubmit}>
      {/* الحقول الأساسية */}
      <div className="mb-3">
        <label className="form-label">Listing Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder=""
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Category</label>
        <select
          className="form-select"
          name="category"
          value={formData.category}
 onChange={(e) => setFormData({ ...formData, category: e.target.value })}
// onChange={handleChange}
           required
        >
          <option value="houses">houses</option>
          <option value="cars">Car</option>
          <option value="tours">Tour</option>
          <option value="boats">Boat</option>
          <option value="translator">Translator</option>
        </select>
      </div>

   

        <div className="mb-3">
        <label className="form-label">City</label>
        <input
        type='string'
          className="form-select"
          name="city"
          value={formData.city}
          onChange={handleChange}
        >
         
        </input>
      </div>

      {/* حقول إضافية حسب الفئة */}
      {renderExtraFields()}

      

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          className="form-control"
          name="desc"
          rows="3"
          value={formData.desc}
          onChange={handleChange}
          placeholder="Provide full service details..."
        ></textarea>
      </div>

      <div className="mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          className="form-control"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder=""
          required
        />
      </div>

    

      {/* <div className="mb-3">
        <label className="form-label">Rating</label>
        <input
          type="number"
          className="form-control"
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          min="0"
          max="5"
          step="0.1"
        />
      </div> */}

      <button type="submit" className="btn btn-primary">
        Submit Listing
      </button>
    </form>
  );
};

export default AddListing;
