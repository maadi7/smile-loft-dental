import React from 'react';
import Navbar from "../components/Navbar"
import Banner from '../components/Home/Banner';
import Services from '../components/Home/Services';
import InfoSection from '../components/Home/InfoSection';
import Testimonials from '../components/Home/Testimonials';
import Footer from '../components/Footer';
import ImageSlider from '../components/Home/ImageSlider';
import LearnMore from '../components/Home/LearnMore';

const index = () => {
  return (
    <div>
        <Banner/> 
        <Services/>
        <InfoSection/>
        <ImageSlider/>
        <Testimonials/>
        <LearnMore/>
    </div>
  )
}

export default index