import React from 'react';
import Navbar from "../components/Navbar"
import Banner from '../components/Banner';
import Services from '../components/Services';
import InfoSection from '../components/InfoSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';
import ImageSlider from '../components/ImageSlider';
import LearnMore from '../components/LearnMore';

const index = () => {
  return (
    <div>
        <Navbar/>
        <Banner/> 
        <Services/>
        <InfoSection/>
        <ImageSlider/>
        <Testimonials/>
        <LearnMore/>
        <Footer/>

      {/* <h1 className="font-playfair text-6xl">This is Playfair Display</h1>
      <p className="font-nunito">This is Nunito</p> */}

    </div>
  )
}

export default index