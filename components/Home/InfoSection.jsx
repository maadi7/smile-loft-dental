import React from 'react';
import Image from 'next/image';
import dentist from "../../assets/dentist.png";
import BrandCircle from "../../assets/brandcircle.png";
import patient from "../../assets/portrait-beautiful-patient.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../../utils/motion';

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
            <h1 className='font-playfair text-6xl leading-[67px] text-primary' >We treat your teeth, <br/>
            <span className='ml-36' > 
                how we’d treat our own.
                </span>  
            </h1>
        </motion.div>
        <div className='flex flex-col items-start py-14 '>
            <motion.div className='flex flex-col items-start' 
                      variants={fadeIn("right", "tween", 0.2, 1)} 
                      initial="hidden"
                     whileInView="show"
                     viewport={{ once: true}}
            >
            <Image src={dentist} alt='Dentist' width={930} height={650} />
                <div className='flex flex-col items-start justify-between ml-24 py-12 max-w-[550px]'  >
                    <p className='text-2xl font-nunito text-primary leading-8 mb-16' >Welcome to Smile Loft Dental, where we make smiles brighter and dental visits cheerful! Our mission is simple: Accessibility, Quality, and Convenience for everyone.</p>
                    <button className=' px-8 py-3 text-xl font-nunito text-[#F7F6F3] bg-primary rounded-lg shadow-xl' >
                        LEARN MORE
                    </button>
                </div>
            </motion.div>
            <motion.div 
          className="absolute h-[250px] w-[250px] object-contain top-[380px] right-[450px] z-20"
          variants={fadeIn("up", "tween", 0.2, 1, -90)} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true}}
        >
          <Image src={BrandCircle} alt="smile-loft" layout="fill" objectFit="contain" />
        </motion.div>
            <motion.div 
          className="absolute h-[590px] w-[850px] object-contain right-0 bottom-24"
          variants={fadeIn("left", "tween", 0.2, 1)} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true}}
        >
          <Image src={patient} alt="smile-loft" layout="fill" objectFit="contain" />
        </motion.div>

        </div>
        
        
        </div>
  )
}

export default InfoSection