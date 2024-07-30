import React from 'react';
import Image from 'next/image';
import BlackWallpaper from "../assets/black-wallpaper.png";
import TestimonialDentist from "../assets/TestimonialDentist.png";
import qoutes from "../assets/“.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const Testimonials = () => {
  return (
    <motion.div 
      className='bg-bgbottom flex h-full w-full py-24 items-center justify-between relative px-24'
    >
      <motion.div 
        variants={fadeIn("up", "tween", 0.2, 1)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true}}
        className='absolute w-[481px] h-[720px] top-0 left-0'
      >
        <Image src={BlackWallpaper} alt='blackwallper' layout='fill' objectFit='cover' />
      </motion.div>
      
      <motion.div className='relative'
        variants={fadeIn("right", "tween", 0.2, 1)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true}}
      >
        <Image src={TestimonialDentist} alt='reviews' className='w-[563px] h-[740px] bg-contain' />
      </motion.div>
      
      <motion.div className='flex flex-col items-start'
        variants={fadeIn("up", "tween", 0.2, 1)} 
        initial="hidden"
        whileInView="show"
        viewport={{ once: true}}
      >
        <h3 className='text-[28px] text-toptext font-semibold font-playfair'>Our Reviews</h3>
        <h1 className='text-[56px] font-playfair font-semibold mb-10 text-primary'>WHAT PATIENTS SAY</h1>
        <Image src={qoutes} alt='decorator' className='h-[80px] w-[100px] mb-20' />
        
        <motion.p className='text-2xl font-nunito max-w-[600px] text-primary mb-10'
          variants={fadeIn("right", "tween", 0.2, 1)} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true}}
        >
          “I have been coming to this office for many years, and always find them welcoming and efficient. Their high-tech equipment is amazing, and allows more precise work for crowns, etc. I recommend them.”
        </motion.p>
        
        <motion.p 
          variants={fadeIn("right", "tween", 0.2, 1)} 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true}}
          className='text-2xl font-nunito text-toptext'
        >
          Nancy Foster
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default Testimonials;
