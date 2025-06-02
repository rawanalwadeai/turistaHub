import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';


// هالكود كويس لو بسوي للادمن لانهيعرض كل الكروت 
import { BASE_URL } from '../../utils/configB.js'

const Listings = ({ onEdit, onDelete }) => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${BASE_URL}/tours`).then(res => res.json()),
      fetch(`${BASE_URL}/houses`).then(res => res.json()),
      fetch(`${BASE_URL}/cars`).then(res => res.json()),
            fetch(`${BASE_URL}/boats`).then(res => res.json()),
                  fetch(`${BASE_URL}/translator`).then(res => res.json())


    ])
      .then(([toursRes, housesRes, carsRes ,boatsRes , translatorRes ]) => {
        // استخراج المصفوفات من المفتاح data
        const tours = toursRes.data || [];
        const houses = housesRes.data || [];
        const cars = carsRes.data || [];
                const boats = boatsRes.data || [];

        const translator = translatorRes.data || [];


        // دمج الكل في مصفوفة واحدة
        const allListings = [...tours, ...houses, ...cars , ...boats , ...translator];
        setListings(allListings);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;


  if (!listings) {
  return (
    <div className="alert alert-warning">
      No listing selected for editing. Please select a listing first.
    </div>
  );
}
  return (
    <div className="listings-container d-flex flex-wrap gap-3">
      {listings.map((listing, index) => (
        <Card key={index} style={{ width: '18rem' }}>
          <CardBody>
            <h5 className="card-title">{listing.title}</h5>
            <p className="card-text text-muted">
              Category: {listing.category} <br />
              {listing.price} SAR / {listing.unit}
            </p>
            <div className="d-flex justify-content-between">
             <button 
  className="btn btn-sm btn-primary" 
  onClick={() => onEdit(listing)}  // تمرير listing بدلاً من index
>
  Edit
</button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => window.confirm("Are you sure?") && onDelete(index)}
              >
                Delete
              </button>


              
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Listings;
