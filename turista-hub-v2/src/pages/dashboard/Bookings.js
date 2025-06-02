import React from 'react';

const Bookings = ({ bookings = [] }) => {
  return (
    <>
      {bookings.map((booking, index) => (
        <div className="card mb-3" key={index}>
          <div className="card-body">
            <h5 className="card-title">{booking.listingTitle}</h5>
            <p className="card-text">Booking: {booking.dateRange}</p>
            <p className="card-text text-muted">Client: {booking.clientName}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Bookings;
