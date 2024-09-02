"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import dentist from "../../assets/dentist.png";
import BrandCircle from "../../assets/SmileLoftDental.png";
import patient from "../../assets/portrait-beautiful-patient.png";
import { fadeIn } from '../../utils/motion';
import { blurHashToDataURL } from '@/utils/blurhash';
import useTranslation from '../../hooks/useTranslation';

const InfoSection = () => {
  const { translate, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({
    title: "We treat your teeth, how we’d treat our own.",
    description: "Welcome to Smile Loft Dental, where we make smiles brighter and dental visits cheerful! Our mission is simple: Accessibility, Quality, and Convenience for everyone.",
    button: "LEARN MORE",
  });

  useEffect(() => {
    const translateText = async () => {
      if (language === "en") {
        setTranslatedText({
          title: "We treat your teeth, how we’d treat our own.",
          description: "Welcome to Smile Loft Dental, where we make smiles brighter and dental visits cheerful! Our mission is simple: Accessibility, Quality, and Convenience for everyone.",
          button: "LEARN MORE",
        });
        return;
      }
      const translatedTitle = await translate(translatedText.title);
      const translatedDescription = await translate(translatedText.description);
      const translatedButton = await translate(translatedText.button);

      setTranslatedText({
        title: translatedTitle.text || translatedText.title,
        description: translatedDescription.text || translatedText.description,
        button: translatedButton.text || translatedText.button,
      });
    };

    translateText();
  }, [translate, language]);

  const { scrollYProgress } = useScroll();
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className='bg-bgtop flex h-full w-full flex-col py-2 relative overflow-hidden'>
      <motion.div
        className='flex items-center justify-center'
        variants={fadeIn("up", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <h1 className='font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight text-primary text-center md:text-left'>
          {translatedText.title.split(',')[0]},
          <br />
          <span className='block md:ml-36'>
            {translatedText.title.split(',')[1]}
          </span>
        </h1>
      </motion.div>
      <div className='flex flex-col items-start py-14'>
        <motion.div
          className='flex 2xl:flex-col items-start lg:flex-row flex-col'
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Image
            src={dentist}
            alt='Dentist'
            width={930}
            height={650}
            placeholder='blur'
            blurDataURL={blurHashToDataURL("LFN0_0Dhtl.9-:M{og_ND%M_I9j^")}
            objectFit='cover'
            className='2xl:w-[927px] custom-md:w-[800px] w-[90%]  2xl:h-[620px] h-[400px]'
          />
          <div className='flex flex-col items-start justify-between 2x:ml-24 mt-5 lg:mt-0 md:ml-10 pl-2 lg:py-12 py-4 max-w-[550px] pr-4'>
            <p className='text-xl sm:text-2xl font-nunito text-primary leading-8 2xl:mb-16 sm:mb-10 mb-5'>
              {translatedText.description}
            </p>
            <button className='mb-2 sm:px-8 px-6 py-3 sm:text-xl text-sm font-nunito  transition-all duration-300 text-[#F7F6F3] bg-primary rounded-lg shadow-xl  hover:bg-box2 hover:text-primary'>
              {translatedText.button}
            </button>
          </div>
        </motion.div>
        <motion.div
          className="absolute h-[250px] w-[250px] object-contain 2xl:top-[380px] top-[480px] 2xl:right-[450px] right-[500px] custom-lg:block hidden z-20"
          style={{ rotate }}
          variants={fadeIn("up", "tween", 0.2, 1, -90)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Image src={BrandCircle} alt="smile-loft" layout="fill" objectFit="contain" />
        </motion.div>
        <motion.div
          className="2xl:absolute relative mt-10 custom-md:-mt-3 2xl:mt-0 self-end lg:h-[524px] lg:w-[820px] sm:w-[600px] sm:h-[400px] w-[96%] h-[400px] object-contain 2xl:right-0 2xl:bottom-40"
          variants={fadeIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Image
            src={patient}
            alt="smile-loft"
            layout="fill"
            className='rounded-l-lg'
            objectFit="cover"
            blurDataURL={blurHashToDataURL("LUNAL{pJOsH=.m%MxYWCE1D%Rjbv")}
            placeholder='blur'
          />
        </motion.div>
      </div>
    </div>
  );
};

export default InfoSection;
