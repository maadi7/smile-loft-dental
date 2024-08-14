import React from 'react';
import Image from 'next/image';
import servicesImage from "../../assets/services.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import Link from "next/link";
import { blurHashToDataURL } from '@/utils/blurhash';

const Services = () => {
  return (
    <div className="bg-bgtop flex h-full w-full items-center justify-center py-16 px-4 2xl:px-24 !overflow-hidden">

      <div className="grid h-full w-full gap-8 p-2 grid-cols-1 sm:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-4 grid-rows-10 sm:grid-rows-2  custom-md:grid-rows-4">
        
        <motion.div
          className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2  flex flex-col items-start"
          variants={fadeIn("up", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h3 className='text-[24px] sm:text-[28px] lg:text-[28px] text-toptext font-semibold font-playfair'>Our Services</h3>
          <h1 className='text-[40px] sm:text-[56px] lg:text-[56px] font-playfair font-semibold text-primary md:mb-10 mb-1'>WHAT WE DO</h1>
          <p className='text-lg sm:text-xl lg:text-2xl font-nunito max-w-[500px] sm:max-w-[600px] text-primary md:mb-10 mb-5'>
            Creating confident smiles with personalized dental care and advanced treatments for a healthier, brighter you!
          </p>
          <Link href="/our-services">
            <button className='px-6 sm:px-8 py-3 text-sm sm:text-xl font-nunito text-[#F7F6F3] bg-primary rounded-lg shadow-lg'>
              SEE MORE
            </button>
          </Link>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-box1 p-4 rounded-lg text-center flex flex-col items-center justify-center"
          variants={fadeIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={"/our-services/invisalign"}>
            <h3 className='text-3xl lg:text-4xl font-playfair mb-4 text-primary'>Invisalign</h3>
          </Link>
          <p className='text-xl font-nunito text-toptext'>
            Achieve a perfect smile with Invisalign’s clear aligners, a top alternative to braces.
          </p>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg flex flex-col text-center items-center justify-center"
          variants={fadeIn("left", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={"/our-services/teeth-whitening"}>
            <h3 className='text-3xl lg:text-4xl font-playfair mb-4 -mt-10 text-center text-primary'>
              Teeth <br />
              Whitening
            </h3>
          </Link>
          <p className='text-xl font-nunito text-toptext'>
            Transform your smile with our teeth whitening services for a dazzling, white shine.
          </p>
        </motion.div>

        <motion.div
          className="col-span-1 row-span-2 bg-box1 p-4 rounded-lg flex flex-col text-center items-center justify-center"
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Link href={"/our-services/dental-implants"}>
            <h3 className='text-3xl lg:text-4xl font-playfair text-center mb-4 text-primary'>
              Dental <br />
              Implants
            </h3>
          </Link>
          <p className='text-xl font-nunito text-toptext'>
            Restore your smile with natural-looking, durable dental implants for lasting confidence.
          </p>
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
          <Link href={"/our-services/dental-crowns"}>
            <h3 className='text-3xl lg:text-4xl font-playfair mb-4 text-primary'>
              Dental <br />
              Crowns
            </h3>
          </Link>
          <p className='text-xl font-nunito text-toptext'>
            Protect and restore damaged teeth with durable dental crowns, ideal for decay or injury.
          </p>
        </motion.div>

        <motion.div
          className="col-span-1 sm:col-span-2 lg:col-span-2 row-span-2 rounded-lg flex items-center justify-center"
          variants={fadeIn("right", "tween", 0.2, 1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <Image 
            src={servicesImage} 
            alt='Our services' 
            className='h-full w-full object-cover' 
            placeholder='blur'
            blurDataURL={blurHashToDataURL("LmMjgg?F?^IVx^ozWBi_jrjEjtbb")}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default Services;
