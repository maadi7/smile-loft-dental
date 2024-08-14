import React from 'react';
import Image from 'next/image';
import dentist from "../../assets/dentist.png";
import BrandCircle from "../../assets/brandcircle.png";
import patient from "../../assets/portrait-beautiful-patient.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';
import { blurHashToDataURL } from '@/utils/blurhash';

const InfoSection = () => {
  return (
    <div
    className='bg-bgtop flex h-full w-full flex-col py-2 relative overflow-hidden'
    >
        <motion.div className='flex items-center justify-center'
          variants={fadeIn("up", "tween", 0.2, 1)} 
          initial="hidden"
         whileInView="show"
         viewport={{ once: true}}
        >
             <h1 className='font-playfair text-4xl md:text-5xl lg:text-6xl leading-tight text-primary text-center md:text-left'>
          We treat your teeth, <br />
          <span className='block md:ml-36'>
            how we’d treat our own.
          </span>
        </h1>
        </motion.div>
        <div className='flex flex-col items-start py-14 '>
            <motion.div className='flex 2xl:flex-col items-start lg:flex-row flex-col ' 
                      variants={fadeIn("right", "tween", 0.2, 1)} 
                      initial="hidden"
                     whileInView="show"
                     viewport={{ once: true}}
            >
                  <Image 
                    src={dentist} 
                    alt='Dentist' 
                    width={930} 
                    height={650} 
                    placeholder='blur' 
                    blurDataURL={blurHashToDataURL("LFN0_0Dhtl.9-:M{og_ND%M_I9j^")} 
                    objectFit='cover'
                    className='2xl:w-[930px] custom-md:w-[800px] w-[90%]  2xl:h-[650px] h-[400px]'
                  />
                <div className='flex flex-col items-start justify-between 2x:ml-24 mt-5 lg:mt-0 md:ml-10 pl-2 lg:py-12 py-4 max-w-[550px] pr-4'  >
                    <p className='text-xl sm:text-2xl font-nunito text-primary leading-8 2xl:mb-16 sm:mb-10 mb-5' >Welcome to Smile Loft Dental, where we make smiles brighter and dental visits cheerful! Our mission is simple: Accessibility, Quality, and Convenience for everyone.</p>
                    <button className='mb-2 sm:px-8 px-6 py-3 sm:text-xl text-sm font-nunito text-[#F7F6F3] bg-primary rounded-lg shadow-xl' >
                        LEARN MORE
                    </button>
                </div>
            </motion.div>
            <motion.div 
          
              className="absolute h-[250px] w-[250px] object-contain 2xl:top-[380px] top-[480px] 2xl:right-[450px] right-[500px] custom-lg:block hidden z-20"
          variants={fadeIn("up", "tween", 0.2, 1, -90)} 
          initial="hidden"
          whileInView="show"
          
          viewport={{ once: true}}
        >
          <Image src={BrandCircle} alt="smile-loft" layout="fill" objectFit="contain" />
        </motion.div>
            <motion.div 
          className="2xl:absolute relative mt-10  custom-md:-mt-3 2xl:mt-0 self-end lg:h-[590px] lg:w-[850px] sm:w-[600px] sm:h-[400px] w-[96%] h-[400px] object-contain 2xl:right-0 2xl:bottom-24 "
            // className="absolute h-[590px] w-[850px] object-contain right-0 bottom-24"
          variants={fadeIn("left", "tween", 0.2, 1)} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true}}
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
  )
}

export default InfoSection