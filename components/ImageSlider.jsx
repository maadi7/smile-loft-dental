import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import sampleImage1 from '../assets/slider1.png';
import sampleImage2 from '../assets/slider2.png';
import rightArrowIcon from "../assets/arrow-right.png";
import leftArrowIcon from "../assets/arrow-left.png";

const ImageSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  console.log(sliderRef.current);

  const images = [
    { id: 1, src: sampleImage1, alt: 'Sample Image 1', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 2, src: sampleImage2, alt: 'Sample Image 2', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 3, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 4, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 5, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 6, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 7, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 8, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 9, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
    { id: 10, src: sampleImage2, alt: 'Sample Image 3', text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228" },
  ];
  const goToPrevSlide = () => {
    const prevSlide = currentSlide - 1;
    if (prevSlide >= 0) {
      sliderRef.current.slickGoTo(prevSlide);
    }
  };
  
  const goToNextSlide = () => {
    const nextSlide = currentSlide + 1;
    if (nextSlide < images.length) {
      sliderRef.current.slickGoTo(nextSlide);
    }
  };

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow:3,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const totalSlides = images.length;
  const loaderWidth = currentSlide === totalSlides - settings.slidesToShow ? 100 : ((currentSlide + 1) / totalSlides) * 100;


  return (
    
    <div className="py-0 pl-24 pr-0 relative  split-bg-vertical pb-24">
      <motion.div className="col-span-2 row-span-2 flex flex-col items-start"
        variants={fadeIn("", "tween", 0.2, 1)} 
        initial="hidden"
       whileInView="show"
       viewport={{ once: true}}
      
      >
        <h3 className='text-[28px] text-toptext font-semibold font-playfair'>Where</h3>
        <h1 className='text-[56px] font-playfair font-semibold mb-5 text-primary'>OUR CLINIC</h1>
        <p className='text-2xl font-nunito max-w-[600px] text-primary mb-4'>Lorem ipsum dolor sit amet consectetur. Ultrices eu felis ante pulvinar et.</p>
      </motion.div>
    
      <Slider ref={sliderRef} {...settings} className="min-w-screen">
        {images.map((image) => (
          <motion.div key={image.id} 
          className={`p-4 ${currentSlide === 0 ? "ml-40" : "ml-0"}`}
          variants={fadeIn("left", "tween", 0.2, 1)} 
          initial="hidden"
         whileInView="show"
         viewport={{ once: true}}
          >
            <div className="overflow-hidden  ">
              <Image src={image.src} alt={image.alt} className="w-[460px] h-[460px] object-cover mr-10" />
            </div>
            <h2 className='text-3xl font-playfair text-primary my-4'>{image.text}</h2>
            <p className='max-w-[400px] font-nunito text-xl text-toptext font-semibold'>{image.subtext}</p>
          </motion.div>
        ))}
      </Slider>
      
      <div className='flex items-center p-10 mt-16 justify-between'>
        <div className="left-20 w-[60%] h-2 bg-bgtop">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${loaderWidth}%` }}
          ></div>
        </div>
        <div className='flex mr-24'>
        <Image
  src={leftArrowIcon}
  className='h-14 w-14 bg-bgtop p-2 mr-2 rounded-full cursor-pointer'
  onClick={goToPrevSlide}
/>
<Image
  src={rightArrowIcon}
  className='h-14 w-14 bg-bgtop p-2 ml-2 rounded-full cursor-pointer'
  onClick={goToNextSlide}
/>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
