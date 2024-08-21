"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LearnMoreImage from "../../assets/learMore.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { blurHashToDataURL } from '@/utils/blurhash';
import useTranslation from '../../hooks/useTranslation';
import Link from 'next/link';

const LearnMore = () => {
  const { translate, language } = useTranslation();
  const [translatedText, setTranslatedText] = useState({
    meetTeam: "Meet The Team",
    ourServices: "Our Services",
    readBlogs: "Our Blogs",
    contactUs: "Contact Us",
    claimOffer: "Claim your Free Exam and X-Ray worth $250!",
    getOffer: "GET OFFER",
  });

  useEffect(() => {
    const translateText = async () => {
      if(language === "en"){
        setTranslatedText({
          meetTeam: "Meet The Team",
          ourServices: "Our Services",
          readBlogs: "Our Blogs",
          contactUs: "Contact Us",
          claimOffer: "Claim your Free Exam and X-Ray worth $250!",
          getOffer: "GET OFFER",
        });
        return;
      }
      const translatedMeetTeam = await translate(translatedText.meetTeam);
      const translatedOurServices = await translate(translatedText.ourServices);
      const translatedReadBlogs = await translate(translatedText.readBlogs);
      const translatedContactUs = await translate(translatedText.contactUs);
      const translatedClaimOffer = await translate(translatedText.claimOffer);
      const translatedGetOffer = await translate(translatedText.getOffer);

      setTranslatedText({
        meetTeam: translatedMeetTeam.text || translatedText.meetTeam,
        ourServices: translatedOurServices.text || translatedText.ourServices,
        readBlogs: translatedReadBlogs.text || translatedText.readBlogs,
        contactUs: translatedContactUs.text || translatedText.contactUs,
        claimOffer: translatedClaimOffer.text || translatedText.claimOffer,
        getOffer: translatedGetOffer.text || translatedText.getOffer,
      });
    };

    translateText();
  }, [translate]);

  return (
    <div className="bg-bgbottom flex h-full w-full items-center justify-center py-16 px-4 2xl:px-24 !overflow-hidden">
      <div className="grid h-full w-full gap-8 p-2 grid-cols-1 sm:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 grid-rows-10 sm:grid-rows-2 custom-md:grid-rows-4">
        
        <motion.div
          className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2 flex flex-col items-start"
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Image 
            src={LearnMoreImage} 
            alt='Our services' 
            className='h-full w-full object-cover' 
            placeholder='blur'
            blurDataURL={blurHashToDataURL("LQHUd:-3?Z9E_NIpt6ROtRj@oLoz")}
          />
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-bgtop p-4 rounded-lg text-center flex flex-col items-center justify-center"
          variants={fadeIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='text-4xl font-playfair mb-4 text-primary'>{translatedText.meetTeam}</h3>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg text-center flex flex-col items-center justify-center"
          variants={fadeIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          >
          <Link href="/our-services">
          <h3 className='text-4xl font-playfair mb-4 text-primary'>{translatedText.ourServices}</h3>
          </Link>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-bgtop p-4 rounded-lg text-center flex flex-col items-center justify-center"
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
                <Link href="/blogs">
          <h3 className='text-4xl font-playfair mb-4 text-primary'>{translatedText.readBlogs}</h3>
                </Link>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg text-center flex flex-col items-center justify-center"
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className='text-4xl font-playfair mb-4 text-primary'>{translatedText.contactUs}</h3>
        </motion.div>

        <motion.div
          className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 bg-toptext p-10 rounded-lg flex items-center justify-center"
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <div className="text-center">
            <h2 className='text-bgtop font-playfair sm:text-5xl text-3xl leading-[40px] sm:leading-[60px] mb-5'>{translatedText.claimOffer}</h2>
            <button className='px-8 py-3  transition-all duration-300 text-xl font-nunito text-toptext bg-bgtop rounded-lg shadow-xl  hover:bg-box2 hover:text-primary'>
              {translatedText.getOffer}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default LearnMore;
