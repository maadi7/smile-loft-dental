import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OurServices from '../components/OurServices';
import ServicesReviews from '../components/ServicesReviews';
import QnA from '../components/QnA';
import AppointmentForm from '../components/AppointmentForm';
const ourservices = () => {
  return (
    <div>
      <Navbar/>
      <OurServices/>
      <ServicesReviews/>
      <QnA/>
      <AppointmentForm/>
      <Footer/>
    </div>
  )
}

export default ourservices