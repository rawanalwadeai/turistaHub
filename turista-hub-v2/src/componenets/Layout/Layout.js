import React, { useEffect } from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routeer/Routers'

import { ToastContainer , toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useLocation } from 'react-router-dom';

const Layout = () => {
const location = useLocation();



    // تنظيف التوستات عند تغيير الصفحة
  useEffect(() => {
    toast.dismiss();
  }, [location]);



  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//code.tidio.co/zkoogyesvaqzvrtr6pynfhcnko2ukshs.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <>
      <Header />
      <Routers />
      <ToastContainer position='top-center' limit={1} autoClose={1500}/>
      <Footer />
    </>
  )
}

export default Layout
