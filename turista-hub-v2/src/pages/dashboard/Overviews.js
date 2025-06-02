import React from 'react';

const Overviews = ({ listings = [], bookings = [] }) => {
  const totalListings = listings.length;
  const totalBookings = bookings.length;
  const averageRating = listings.length
    ? (
        listings.reduce((sum, listing) => sum + listing.rating, 0) /
        listings.length
      ).toFixed(1)
    : 0;

  return (
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Total Listings</h5>
            <p className="display-5 fw-bold text-primary">{totalListings}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Total Bookings</h5>
            <p className="display-5 fw-bold text-success">{totalBookings}</p>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-center">
          <div className="card-body">
            <h5 className="card-title">Average Rating</h5>
            <p className="display-5 fw-bold text-warning">{averageRating} ⭐</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overviews;
