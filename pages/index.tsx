import React from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
const Banner = dynamic(()=> import("../components/Home/Banner"), {});
const Services = dynamic(()=> import("../components/Home/Services"), {});
const InfoSection = dynamic(()=> import("../components/Home/InfoSection"), {});
const Testimonials = dynamic(()=> import("../components/Home/Testimonials"), {});
const ImageSlider = dynamic(()=>import("../components/Home/ImageSlider"));
const LearnMore = dynamic(()=>import("../components/Home/LearnMore"))

const index = () => {
  return (
    <>
      <Head>
        <title>Smile Loft Dental - Your Trusted Dental Care Provider</title>
        <meta
          name="description"
          content="Welcome to Smile Loft Dental, your premier destination for comprehensive dental care. We offer a wide range of services with a focus on patient comfort and cutting-edge technology."
        />
        <link rel="canonical" href="https://smileloftdental.com/" />
        
        {/* OG Tags */}
        <meta property="og:title" content="Smile Loft Dental - Your Trusted Dental Care Provider" />
        <meta property="og:description" content="Welcome to Smile Loft Dental, your premier destination for comprehensive dental care. We offer a wide range of services with a focus on patient comfort and cutting-edge technology." />
        <meta property="og:image" content="/assets/portrait-beautiful-patient.png" />
        <meta property="og:url" content="https://smileloftdental.com/" />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Smile Loft Dental - Your Trusted Dental Care Provider" />
        <meta name="twitter:description" content="Welcome to Smile Loft Dental, your premier destination for comprehensive dental care. We offer a wide range of services with a focus on patient comfort and cutting-edge technology." />
        <meta name="twitter:image" content="/assets/portrait-beautiful-patient.png" />
      </Head>
    <div>
        <Banner/> 
        <Services/>
        <InfoSection/>
        <ImageSlider/>
        <Testimonials/>
        <LearnMore/>
    </div>
    </>
  )
}

export default index