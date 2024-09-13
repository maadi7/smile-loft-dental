"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import servicesImage from "../../assets/services.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import Link from "next/link";
import { blurHashToDataURL } from '@/utils/blurhash';
import useTranslation from '../../hooks/useTranslation';
import { useRouter } from 'next/router';


const Services = () => {
  const { translate, language } = useTranslation();
  
  
  const [translatedTexts, setTranslatedTexts] = useState({
    ourServices: 'Our Services',
    whatWeDo: 'WHAT WE DO',
    description: 'Creating confident smiles with personalized dental care and advanced treatments for a healthier, brighter you!',
    seeMore: 'VIEW ALL',
    invisalign: {
      title: 'Invisalign',
      description: 'Achieve a perfect smile with Invisalign\'s clear aligners, a top alternative to braces.',
    },
    teethWhitening: {
      title: 'Teeth Whitening',
      description: 'Transform your smile with our teeth whitening services for a dazzling, white shine.',
    },
    dentalImplants: {
      title: 'Dental Implants',
      description: 'Restore your smile with natural-looking, durable dental implants for lasting confidence.',
    },
    dentalCrowns: {
      title: 'Dental Crowns',
      description: 'Protect and restore damaged teeth with durable dental crowns, ideal for decay or injury.',
    },
  });

  useEffect(() => {
    const translateTexts = async () => {
      if(language === "en"){
        setTranslatedTexts({
          ourServices: 'Our Services',
          whatWeDo: 'WHAT WE DO',
          description: 'Creating confident smiles with personalized dental care and advanced treatments for a healthier, brighter you!',
          seeMore: 'VIEW ALL',
          invisalign: {
            title: 'Invisalign',
            description: 'Achieve a perfect smile with Invisalign\'s clear aligners, a top alternative to braces.',
          },
          teethWhitening: {
            title: 'Teeth Whitening',
            description: 'Transform your smile with our teeth whitening services for a dazzling, white shine.',
          },
          dentalImplants: {
            title: 'Dental Implants',
            description: 'Restore your smile with natural-looking, durable dental implants for lasting confidence.',
          },
          dentalCrowns: {
            title: 'Dental Crowns',
            description: 'Protect and restore damaged teeth with durable dental crowns, ideal for decay or injury.',
          },
        })
        return;
      }
     
   
      try {
        const translated = {
          ourServices: await translate('Our Services'),
          whatWeDo: await translate('WHAT WE DO'),
          description: await translate('Creating confident smiles with personalized dental care and advanced treatments for a healthier, brighter you!'),
          seeMore: await translate('SEE MORE'),
          invisalign: {
            title: await translate('Invisalign'),
            description: await translate('Achieve a perfect smile with Invisalign\'s clear aligners, a top alternative to braces.'),
          },
          teethWhitening: {
            title: await translate('Teeth Whitening'),
            description: await translate('Transform your smile with our teeth whitening services for a dazzling, white shine.'),
          },
          dentalImplants: {
            title: await translate('Dental Implants'),
            description: await translate('Restore your smile with natural-looking, durable dental implants for lasting confidence.'),
          },
          dentalCrowns: {
            title: await translate('Dental Crowns'),
            description: await translate('Protect and restore damaged teeth with durable dental crowns, ideal for decay or injury.'),
          },
        };

        setTranslatedTexts({
          ourServices: translated.ourServices.text || translatedTexts.ourServices,
          whatWeDo: translated.whatWeDo.text || translatedTexts.whatWeDo,
          description: translated.description.text || translatedTexts.description,
          seeMore: translated.seeMore.text || translatedTexts.seeMore,
          invisalign: {
            title: translated.invisalign.title.text || translatedTexts.invisalign.title,
            description: translated.invisalign.description.text || translatedTexts.invisalign.description,
          },
          teethWhitening: {
            title: translated.teethWhitening.title.text || translatedTexts.teethWhitening.title,
            description: translated.teethWhitening.description.text || translatedTexts.teethWhitening.description,
          },
          dentalImplants: {
            title: translated.dentalImplants.title.text || translatedTexts.dentalImplants.title,
            description: translated.dentalImplants.description.text || translatedTexts.dentalImplants.description,
          },
          dentalCrowns: {
            title: translated.dentalCrowns.title.text || translatedTexts.dentalCrowns.title,
            description: translated.dentalCrowns.description.text || translatedTexts.dentalCrowns.description,
          },
        });
        
      } catch (error) {
        console.log(error);
      }
    };

    translateTexts();
  }, [language]);

  const router = useRouter();

  const handleClick = (serviceName) => {
    if (typeof window !== "undefined") {
      router.push(`/our-services/${serviceName}`);
    }
  };

  return (
    <div className="bg-bgtop flex h-full w-full items-center justify-center py-16 px-4 2xl:px-24 !overflow-hidden">
      <div className="grid h-full w-full gap-8 p-2 grid-cols-1 sm:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 grid-rows-12 sm:grid-rows-8  custom-lg:grid-rows-4 custom-md:grid-rows-6">
        
        <motion.div
          className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2  flex flex-col items-start"
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3 className='text-[24px] sm:text-[28px] lg:text-[28px] text-toptext font-semibold font-playfair'>{translatedTexts.ourServices}</h3>
          <h1 className='text-[40px] sm:text-[56px] lg:text-[56px] font-playfair font-semibold text-primary md:mb-10 mb-1'>{translatedTexts.whatWeDo}</h1>
          <p className='text-lg sm:text-xl lg:text-2xl font-nunito max-w-[500px] sm:max-w-[600px] text-primary md:mb-10 mb-5'>
            {translatedTexts.description}
          </p>
          <Link href="/our-services">
            <button className='px-6 sm:px-8 py-3 text-sm sm:text-xl font-nunito transition-all duration-300 hover:bg-box2 hover:text-primary text-[#F7F6F3] bg-primary rounded-lg'>
              {translatedTexts.seeMore}
            </button>
          </Link>
        </motion.div>
        
        <motion.div
          className="col-span-1 row-span-2 bg-box1 p-4 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer"
          variants={fadeIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={()=>handleClick("invisalign")}
          >
        
            <h3 className='text-3xl lg:text-4xl font-playfair mb-4 text-primary'>{translatedTexts.invisalign.title}</h3>
          <p className='text-[18px] font-nunito text-toptext'>
            {translatedTexts.invisalign.description}
          </p>
        
        </motion.div>
    

        <motion.div
          className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg flex flex-col text-center items-center justify-center cursor-pointer"
          variants={fadeIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={()=>handleClick("teeth-whitening")}
        >
          
            <h3 className='text-3xl lg:text-4xl font-playfair mb-4 text-center text-primary'>
              {translatedTexts.teethWhitening.title}
            </h3>
          
          <p className='text-[18px]  font-nunito text-toptext'>
            {translatedTexts.teethWhitening.description}
          </p>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-box1 p-4 rounded-lg flex flex-col text-center items-center justify-center cursor-pointer"
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={()=>handleClick("dental-implants")}
          
        >
        
            <h3 className='text-3xl lg:text-4xl font-playfair text-center mb-4 text-primary'>
              {translatedTexts.dentalImplants.title}
            </h3>
        
          <p className='text-[18px]  font-nunito text-toptext'>
            {translatedTexts.dentalImplants.description}
          </p>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg text-center flex flex-col items-center justify-center cursor-pointer"
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          onClick={()=>handleClick("dental-crowns")}
        >
          
            <h3 className='text-3xl lg:text-4xl font-playfair mb-4 text-primary'>
              {translatedTexts.dentalCrowns.title}
            </h3>
          
          <p className='text-[18px]    font-nunito text-toptext'>
            {translatedTexts.dentalCrowns.description}
          </p>
        </motion.div>

        <motion.div
          className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 relative "
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Image
            src={servicesImage}
            alt="Services Image"
            placeholder="blur"
            blurDataURL={blurHashToDataURL("LNQ.R,t8.May^iofM{WB.8WAt6oM")}
            fill
            className="rounded-lg object-cover w-full"
          />
        </motion.div>

      </div>
    </div>
  )
}

export default Services;
