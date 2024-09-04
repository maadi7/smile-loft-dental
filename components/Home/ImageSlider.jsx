"use client";

import React, { useState, useEffect, useRef } from 'react';
import { graphQLClient } from '@/lib/graphqlClient';
import { gql } from 'graphql-request';
import Slider from 'react-slick';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import useTranslation from '../../hooks/useTranslation';
import sampleImage1 from '../../assets/slider1.png';
import sampleImage2 from '../../assets/slider2.png';
import rightArrowIcon from "../../assets/arrow-right.png";
import leftArrowIcon from "../../assets/arrow-left.png";
import Link from 'next/link';

const ImageSlider = () => {
  const { translate, language } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isBeginning, setIsBeginning] = useState(true);
const [isEnd, setIsEnd] = useState(false);
  const [translatedTexts, setTranslatedTexts] = useState([
    {
      id: 1,
      src: sampleImage1,
      alt: 'Sample Image 1',
      text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
    },
    {
      id: 2,
      src: sampleImage2,
      alt: 'Sample Image 2',
      text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
    },
  ]);
  const [locationsData, setLocationsData] = useState([]);
  const [translatedText, setTranslatedText] = useState({
    title: "Where",
    subtitle: "To Find Us",
    subtext: "Our clinics are conveniently located across Maryland to serve you better. Select your desired location"

})
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchLocation = async () => {
        try {
            const response = await graphQLClient.request(
                gql`
                    query MyQuery {
                        locationDetails {
                            locationName
                            address
                            location {
                                latitude
                                longitude
                            }
                        }
                    }
                `
            );

            if (response && response.locationDetails) {
              setLocationsData(response.locationDetails);
           
                console.log(response.locationDetails);
            }
        } catch (error) {
            console.error("GraphQL Error:", error);
        } 
    };

    fetchLocation();
}, []);


  const images = [
    {
      id: 1,
      src: sampleImage1,
      alt: 'Sample Image 1',
      text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
    },
    {
      id: 2,
      src: sampleImage2,
      alt: 'Sample Image 2',
      text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
    },
    {
      id: 2,
      src: sampleImage2,
      alt: 'Sample Image 2',
      text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
    },
    {
      id: 2,
      src: sampleImage2,
      alt: 'Sample Image 2',
      text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
    },
    {
      id: 2,
      src: sampleImage2,
      alt: 'Sample Image 2',
      text: "Smile Loft Affinity",
      subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
    },
    // Add more images as necessary
  ];

  useEffect(() => {
    const translateTexts = async () => {
      const translated = await Promise.all(
        images.map(async (image) => {
          const translatedText = await translate(image.text);
          const translatedSubtext = await translate(image.subtext);
          return {
            ...image,
            text: translatedText.text || image.text,
            subtext: translatedSubtext.text || image.subtext,
          };
        })
      );
      setTranslatedTexts(translated);
    };

    translateTexts();
  }, [language]);

  useEffect(() => {
    const translateText = async () => {
      if(language === "en"){
        setTranslatedText({
          title: "Where",
          subtitle: "To Find Us",
          subtext: "Our clinics are conveniently located across Maryland to serve you better. Select your desired location"
        });
        return;
      }
      const translatedTitle = await translate(translatedText.title);
      const translatedDescription = await translate(translatedText.subtitle);
      const translatedButton = await translate(translatedText.subtext);

      setTranslatedText({
        title: translatedTitle.text || translatedText.title,
        subtitle: translatedDescription.text || translatedText.subtitle,
        subtext: translatedButton.text || translatedText.subtext,
      });
    };

    translateText();
  }, [translate]);


  const goToPrevSlide = () => {
    if (!isBeginning) {
      const prevSlide = currentSlide - 1;
      sliderRef.current.slickGoTo(prevSlide);
    }
  };
  
  const goToNextSlide = () => {
    if (!isEnd) {
      const nextSlide = currentSlide + 1;
      sliderRef.current.slickGoTo(nextSlide);
    }
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
      setIsBeginning(newIndex === 0);
      setIsEnd(newIndex === locationsData.length - settings.slidesToShow);
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const totalSlides = locationsData.length;
  const loaderWidth =
    currentSlide === totalSlides - settings.slidesToShow
      ? 100
      : ((currentSlide + 1) / totalSlides) * 100;
      

  return (
    <div className="py-0 pl-4 pr-2 md:pr-0 md:pl-12 lg:pl-24 relative split-bg-vertical pb-12 md:pb-24">
      <motion.div
        className="flex flex-col items-start mb-5"
        variants={fadeIn("", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h3 className="text-[24px] sm:text-[28px] text-toptext font-semibold font-playfair">
          {translatedText.title}
        </h3>
        <h1 className="text-[40px] sm:text-[56px] lg:text-[56px] font-playfair font-semibold text-primary md:mb-0 mb-2 capitalize">
          {translatedText.subtitle}
        </h1>
        <p className="text-lg md:text-2xl font-nunito max-w-[600px] text-primary mb-4">
     {translatedText.subtext}
        </p>
      </motion.div>

      <Slider ref={sliderRef} {...settings} className="min-w-screen">
        {locationsData.map((image, index) => (
          <motion.div
            key={index}
            className={`p-4 ${currentSlide === 0 ? "md:ml-40 " : "ml-0"}`}
            variants={fadeIn("left", "tween", 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <Link
          key={index}
          href={`https://www.google.com/maps?q=${image.location.latitude},${image?.location.longitude}`}
          passHref
          target='_blank'
          >
            <div className="overflow-hidden rounded-lg">
              <Image src="https://res.cloudinary.com/dgpd9qgst/image/upload/v1718271349/cld-sample-2.jpg" alt={image.alt} className="w-[460px] h-[460px] object-cover mr-10" width={460} height={460} />
            </div>
            </Link>
            <h2 className="text-3xl font-playfair text-primary my-4">{image.locationName}</h2>
            <p className="max-w-[400px] font-nunito text-xl text-toptext font-semibold">{image.address}</p>
          </motion.div>
        ))}
      </Slider>

      <div className="flex flex-col-reverse md:flex-row items-center p-4 md:p-10 mt-8 md:mt-16 justify-between">
        <div className="w-full md:w-[60%] md:left-20 h-2 bg-bgtop">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${loaderWidth}%` }}
          ></div>
        </div>
        <div className="flex justify-end w-full md:w-auto md:mr-8 lg:mr-24 mb-4 md:mb-0">
        <Image
  src={leftArrowIcon}
  className={`h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 p-2 mr-2 rounded-full cursor-pointer ${
    isBeginning ? 'bg-gray-300' : 'hover:bg-white bg-bgtop'
  }`}
  onClick={isBeginning ? null : goToPrevSlide}
/>
<Image
  src={rightArrowIcon}
  className={`h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 p-2 ml-2 rounded-full cursor-pointer ${
    isEnd ? 'bg-gray-300' : 'hover:bg-white bg-bgtop'
  }`}
  onClick={isEnd ? null : goToNextSlide}
/>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
