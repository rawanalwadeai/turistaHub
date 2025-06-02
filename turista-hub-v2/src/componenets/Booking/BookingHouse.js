import React, { useState, useContext } from 'react';
import './booing.css';
import { FormGroup, Form, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/configB';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';  // استدعاء useTranslation

const BookingHouse = ({ house, avgRating }) => {
  const { t } = useTranslation();  // تفعيل الترجمة
  const { price, reviews, title } = house;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [credentials, setCredentials] = useState({
    userId: user && user._id,
    houseId: house && house._id,
    userEmail: user && user.email,
    fullName: '',
    placeName: title,
    phone: '',
    guestSize: 1,
    bookAt: '',
    bookEndAt: '',
  });

  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 10;
  const totalAmount = Number(price) + Number(serviceFee);

  const handleClick = async e => {
    e.preventDefault();

    try {
      if (!user) {
        return toast.error(t('pleaseSignIn'));
      }

      const res = await fetch(`${BASE_URL}/bookingHouse/${house._id}`, {
        method: 'post',
        headers: { 'content-type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      });

      const result = await res.json();

      if (!res.ok) {
        return toast.error(result.message);
      }

      // navigate('/thank-you');
   const bookingId = result.data._id
// ✅ استخدمي bookingId للتنقل إلى صفحة الدفع
navigate(`/payment/house/${bookingId}`)

    } catch (err) {

      toast.error(err.message);
    }
  };

  return (
    <div className='booking'>
      {/* Top section */}
      <div className='booking__top d-flex align-items-center justify-content-between'>
        <h3>
          ${price} <span> / {t('perNight')}</span>
        </h3>
        <span className='tour__rating d-flex align-items-center gap-1'>
          <i className='fa-solid fa-star' style={{ color: 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* Booking form */}
      <div className='booking__form'>
        <h5>{t('information')}</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type='text' placeholder={t('fullName')} id='fullName' required onChange={handleChange} />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder={t('phone')} id='phone' required onChange={handleChange} />
          </FormGroup>

          <FormGroup className='d-flex gap-3'>
            <input
              onKeyDown={e => e.preventDefault()}
              type='date'
              id='bookAt'
              required
              min={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
            />

            <input
              onKeyDown={e => e.preventDefault()}
              type='date'
              id='bookEndAt'
              required
              min={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <input type='number' placeholder={t('guests')} id='guestSize' required onChange={handleChange} />
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
            <h5>{t('serviceCharge')}</h5>
            <span>${serviceFee}</span>
          </ListGroupItem>

          <ListGroupItem className='border-0 px-0 total'>
            <h5>{t('total')}</h5>
            <span>${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick}>
          {t('book')}
        </Button>
      </div>
    </div>
  );
};

export default BookingHouse;
