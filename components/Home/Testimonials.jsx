"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BlackWallpaper from "../../assets/black-wallpaper.png";
import TestimonialDentist from "../../assets/TestimonialDentist.png";
import qoutes from "../../assets/“.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { blurHashToDataURL } from '@/utils/blurhash';
import useTranslation from '../../hooks/useTranslation';

const Testimonials = () => {
  const { translate, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({
    reviewText: "I have been coming to this office for many years, and always find them welcoming and efficient. Their high-tech equipment is amazing, and allows more precise work for crowns, etc. I recommend them.",
    reviewerName: "Nancy Foster",
    reviewsTitle: "WHAT PATIENTS SAY",
    reviewsSubtitle: "Our Reviews",
  });

  useEffect(() => {
    const translateText = async () => {
      if(language === "en"){
        setTranslatedText({
          reviewText: "I have been coming to this office for many years, and always find them welcoming and efficient. Their high-tech equipment is amazing, and allows more precise work for crowns, etc. I recommend them.",
          reviewerName: "Nancy Foster",
          reviewsTitle: "WHAT PATIENTS SAY",
          reviewsSubtitle: "Our Reviews"
        });
        return;
      }
      const translatedReviewText = await translate(translatedText.reviewText);
      const translatedReviewerName = await translate(translatedText.reviewerName);
      const translatedReviewsTitle = await translate(translatedText.reviewsTitle);
      const translatedReviewsSubtitle = await translate(translatedText.reviewsSubtitle);

      setTranslatedText({
        reviewText: translatedReviewText.text || translatedText.reviewText,
        reviewerName: translatedReviewerName.text || translatedText.reviewerName,
        reviewsTitle: translatedReviewsTitle.text || translatedText.reviewsTitle,
        reviewsSubtitle: translatedReviewsSubtitle.text || translatedText.reviewsSubtitle,
      });
    };

    translateText();
  }, [language]);

  return (
    <motion.div 
      className='bg-bgbottom flex flex-col lg:flex-row h-full w-full py-12 md:py-24 items-center justify-between relative px-4 md:px-12 lg:px-24'
    >
      <motion.div 
        variants={fadeIn("up", "tween", 0.2, 1)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className='absolute w-full h-[300px] md:w-[481px] md:h-[720px] top-0 left-0 hidden md:block'
      >
        <Image src={BlackWallpaper} alt='blackwallper' layout='fill' objectFit='cover' />
      </motion.div>
      
      <motion.div className='relative mb-8 lg:mb-0'
        variants={fadeIn("right", "tween", 0.2, 1)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <Image 
          src={TestimonialDentist} 
          alt='reviews' 
          className='w-full h-auto md:w-[563px] md:h-[740px] bg-contain rounded-lg' 
          placeholder='blur'
          blurDataURL={blurHashToDataURL("LDIrNm4T~AROVC0KMx$$krH=RjyD")}
        />
      </motion.div>
      
      <motion.div className='flex flex-col items-start lg:max-w-[50%] lg:ml-10 ml-0'
        variants={fadeIn("up", "tween", 0.2, 1)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h3 className='text-[24px] sm:text-[28px] mb-2 text-toptext font-semibold font-playfair md:mb-5'>
          {translatedText.reviewsSubtitle}
        </h3>
        <h1 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] leading-[40px] font-semibold mb-5 md:mb-10 text-primary'>
          {translatedText.reviewsTitle}
        </h1>
        <Image src={qoutes} alt='decorator' className='h-[40px] md:h-[80px] w-[50px] md:w-[100px] mb-8 md:mb-20' />
        
        <motion.p className='text-lg md:text-2xl font-nunito max-w-[600px] text-primary mb-5 md:mb-10'
          variants={fadeIn("right", "tween", 0.2, 1)} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {translatedText.reviewText}
        </motion.p>
        
        <motion.p 
          variants={fadeIn("right", "tween", 0.2, 1)} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className='text-xl md:text-2xl font-nunito text-toptext'
        >
          {translatedText.reviewerName}
        </motion.p>
      </motion.div>
      
    </motion.div>
  );
}

export default Testimonials;
