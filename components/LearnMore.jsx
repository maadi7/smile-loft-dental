import React from 'react';
import LearnMoreImage from "../assets/learMore.png";
import Image from "next/image";
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';

const LearnMore = () => {
  return (
<div className="bg-bgbottom flex h-full w-full items-center justify-center py-16 px-24 !overflow-hidden">
    <div className="grid h-full w-full gap-8 p-2 grid-cols-4 grid-rows-4">

      <motion.div 
              variants={fadeIn("right", "tween", 0.2, 1)} 
              initial="hidden"
             whileInView="show"
             viewport={{ once: true}}
        className="col-span-2 row-span-2 flex flex-col items-start"
      >
       <Image src={LearnMoreImage} alt='Our services' />
      </motion.div>
    
      <motion.div 
              variants={fadeIn("left", "tween", 0.2, 1)} 
              initial="hidden"
             whileInView="show"
             viewport={{ once: true}}
        className="col-span-1 row-span-2 bg-bgtop p-4 rounded-lg  flex flex-col items-center justify-center relative"
      >
        <h1 className='text-[56px] font-playfair text-toptext font-semibold absolute top-2 left-4' > <span className='!font-normal' >/</span>1</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary text-center' >Meet The <br/>  Team</h3>

      </motion.div>
    
      <motion.div 
              variants={fadeIn("left", "tween", 0.2, 1)} 
              initial="hidden"
             whileInView="show"
             viewport={{ once: true}}
        className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg flex flex-col items-center justify-center relative"
      >
         <h1 className='text-[56px] font-playfair text-toptext font-semibold absolute top-2 left-4' > <span className='!font-normal' >/</span>2</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary text-center' >Our  <br/>
        Services</h3>

      </motion.div>
    
      <motion.div 
        className="col-span-1 row-span-2 p-4 bg-bgtop rounded-lg flex flex-col items-center justify-center relative"
        variants={fadeIn("up", "tween", 0.2, 1)} 
        initial="hidden"
       whileInView="show"
       viewport={{ once: true}}
      >
         <h1 className='text-[56px] font-playfair text-toptext font-semibold absolute top-2 left-4' > <span className='!font-normal' >/</span>3</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary text-center' >Read Our
         <br/>
         Blogs
         </h3>

      </motion.div>
    
      <motion.div 
              variants={fadeIn("up", "tween", 0.2, 1)} 
              initial="hidden"
             whileInView="show"
             viewport={{ once: true}}
        className="col-span-1 row-span-2 p-4 bg-box2 rounded-lg flex flex-col  items-center justify-center relative"
      >
     <h1 className='text-[56px] font-playfair text-toptext font-semibold  absolute top-2 left-4' > <span className='!font-normal' >/</span>4</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary text-center' >Contact 
         <br/>
         Us</h3>

      </motion.div>
    
      <motion.div 
              variants={fadeIn("left", "tween", 0.2, 1)} 
              initial="hidden"
             whileInView="show"
             viewport={{ once: true}}
        className="col-span-2 row-span-2 rounded-lg flex flex-col items-center justify-center bg-toptext p-10"
      >
        <h2 className='text-bgtop font-playfair text-5xl text-center leading-[60px] mb-5'>Claim your Free Exam
        and X-Ray worth $250! </h2>
        <button className=' px-8 py-3 text-xl font-nunito text-toptext bg-bgtop rounded-lg shadow-xl' >
                        GET OFFER
                    </button>
    
        
      </motion.div>
    
    </div>
  </div>
  )
}

export default LearnMore