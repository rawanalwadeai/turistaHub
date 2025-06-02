import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './../pages/Home';
import Tour from './../pages/Tour';
import TourDetails from './../pages/TourDetails';
import HouseDetails from './../pages/HouseDetails';
import CarDetails from './../pages/CarDetails';
import TranslatorDetails from '../pages/translatorDetails';


import Login from './../pages/Login';
import Register from './../pages/Register';
import SearchResultList from './../pages/SearchResultList';
import ThankYou from '../componenets/ThankYou';
import Houses from './../pages/Houses';
import Cars from '../pages/Cars';
import Translator from '../pages/Translator';
import Boat from '../pages/Boat'
import BoatDetails from '../pages/BoatDetails';
import RegisterProvider from '../pages/RegisterProvider';
import LoginProvider from '../pages/LoginProvider';
import ProviderDashboard from '../pages/dashboard/ProviderDashboard';
import Payment from '../pages/Payment';


const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate to='/home' />} />
      <Route path='/home' element={<Home />} />
      <Route path='/tour' element={<Tour />} />

      <Route path='/houses' element={<Houses />} />
      <Route path='/cars' element={<Cars />} />
      <Route path='/translator' element={<Translator />} />
      <Route path='/boat' element={<Boat />} />

      <Route path='/tour/:id' element={<TourDetails />} />
      <Route path='/house/:id' element={<HouseDetails />} />
      <Route path='/car/:id' element={<CarDetails />} />
      <Route path='/translator/:id' element={<TranslatorDetails />} />
      <Route path='/boats/:id' element={<BoatDetails />} />


      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/providerRegister' element={<RegisterProvider />} />
      <Route path='/loginProvider' element={<LoginProvider />} />


      <Route path='/thank-you' element={<ThankYou />}></Route>
      <Route path='/tour/search' element={<SearchResultList />} />
      <Route path='/payment/:type/:id' element={<Payment/>}/>

      <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Page Not Found</h2>} />

      <Route path='/provider-dashboard' element={<ProviderDashboard />} />





    </Routes>
  )
}

export default Routers