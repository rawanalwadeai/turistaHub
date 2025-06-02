import React, { useState, useContext } from 'react';
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/configB';
import { toast } from 'react-toastify';

const BookingCar = ({ car, avgRating }) => {
  const { price, reviews } = car;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { t } = useTranslation();

  const [booking, setBooking] = useState({
    userId: user && user._id,
    // carId: car && car._id,
    userEmail: user && user.email,
    carId: car._id,
    fullName: '',
    phone: '',
    rentalDays: 1,
    pickupDate: '',
    endDate: '',
    
  });

  const handleChange = e => {
    const { id, value } = e.target;

    setBooking(prev => {
      const updatedBooking = { ...prev, [id]: value };

      if (id === 'pickupDate' || id === 'endDate') {
        const pickup = id === 'pickupDate' ? value : prev.pickupDate;
        const end = id === 'endDate' ? value : prev.endDate;

        if (pickup && end) {
          const startDate = new Date(pickup);
          const endDate = new Date(end);

          const timeDiff = endDate.getTime() - startDate.getTime();
          const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

          updatedBooking.rentalDays = dayDiff > 0 ? dayDiff : 1;
        }
      }

      return updatedBooking;
    });
  };

  const serviceFee = 15;
  const totalAmount = Number(price) * Number(booking.rentalDays) + Number(serviceFee);

  const handleClick = async e => {
    e.preventDefault();

    try {
      if (!user) {
        return toast.error(t('pleaseSignIn'));
      }

      const res = await fetch(`${BASE_URL}/bookingCar/${car._id}`, {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(booking),
      });

      const result = await res.json();
      if (!res.ok) {
        return toast.error(result.message);
      }

   const bookingId = result.data._id
// ✅ استخدمي bookingId للتنقل إلى صفحة الدفع
navigate(`/payment/car/${bookingId}`)



} catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className='booking'>
      {/* Top section */}
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>
          ${price} <span>{t('perDay')}</span>
        </h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className='fa-solid fa-star' style={{ color: 'var(--secondary-color)' }}></i>{' '}
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking form */}
      <div className='booking__form'>
        <h5>{t('rentalInformation')}</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input
              type='text'
              placeholder={t('fullNamePlaceholder')}
              id='fullName'
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input
              type='number'
              placeholder={t('phonePlaceholder')}
              id='phone'
              required
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup className='d-flex gap-3'>
            <input
              onKeyDown={e => e.preventDefault()}
              type='date'
              id='pickupDate'
              required
              min={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
            />
            <input
              onKeyDown={e => e.preventDefault()}
              type='date'
              id='endDate'
              required
              min={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <p>
              <strong>{t('rentalDays')}:</strong> {booking.rentalDays} {t('day')}
            </p>
          </FormGroup>




         

        </Form>
      </div>

      {/* Booking bottom */}
      <div className='booking__bottom'>
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5>{t('price')}</h5>
            <span>${price}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0'>
            <h5>{t('serviceFee')}</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>{t('total')}</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
          {t('bookCar')}
        </Button>
      </div>
    </div>
  );
};

export default BookingCar;
