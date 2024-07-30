import React from 'react';
import Image from 'next/image';
import servicesImage from "../assets/services.png";
import { motion } from 'framer-motion';
import { fadeIn } from '../utils/motion';
import Link from "next/link"

const Services = () => {
  return (
<div className="bg-bgtop flex h-full w-full items-center justify-center py-16 px-24 !overflow-hidden">
    <div
     className="grid h-full w-full gap-8 p-2 grid-cols-4 grid-rows-4"
    
     >
      
      <motion.div 
        className="col-span-2 row-span-2 flex flex-col items-start"
        variants={fadeIn("up", "tween", 0.2, 1)} 
         initial="hidden"
        whileInView="show"
        viewport={{ once: true}}
        
      >
        <h3 className='text-[28px] text-toptext font-semibold font-playfair' >Our Services</h3>
        <h1 className='text-[56px] font-playfair font-semibold  text-primary mb-10' > WHAT WE DO</h1>
        <p className='text-2xl font-nunito max-w-[600px] text-primary mb-10' >Lorem ipsum dolor sit amet consectetur. Ultrices eu felis ante pulvinar et.</p>
        <Link  href="/our-services" >
        <button className='px-8 py-3 text-xl font-nunito text-[#F7F6F3] bg-primary rounded-lg  '>
            VIEW SERVICES
          </button>
        </Link>
      </motion.div>
    
      <motion.div 
        className="col-span-1 row-span-2 bg-box1 p-4 rounded-lg  flex flex-col items-start"
        variants={fadeIn("left", "tween", 0.2, 1)} 
        initial="hidden"
       whileInView="show"
       viewport={{ once: true}}
      >
        <h1 className='text-[56px] font-playfair text-toptext font-semibold mb-14' > <span className='!font-normal' >/</span>1</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary' >Invisalign</h3>

        <p className='text-xl font-nunito mb-20 text-toptext' >
        Lorem ipsum dolor sit amet consectetur. 
        </p>
      </motion.div>
    
      <motion.div 
        className="col-span-1 row-span-2 bg-box2 p-4 rounded-lg flex flex-col items-start "
        variants={fadeIn("left", "tween", 0.2, 1)} 
        initial="hidden"
        viewport={{ once: true}}
       whileInView="show"
      >
         <h1 className='text-[56px] font-playfair text-toptext font-semibold mb-4' > <span className='!font-normal' >/</span>2</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary' >Teeth <br/>
        Whitening</h3>

        <p className='text-xl font-nunito mb-20 text-toptext' >
        Lorem ipsum dolor sit amet consectetur. 
        </p>
      </motion.div>
    
      <motion.div 
        className="col-span-1 row-span-2 p-4 bg-box1 rounded-lg flex flex-col items-start"
        variants={fadeIn("right", "tween", 0.2, 1)} 
        initial="hidden"
       whileInView="show"
       viewport={{ once: true}}
      >
         <h1 className='text-[56px] font-playfair text-toptext font-semibold mb-4' > <span className='!font-normal' >/</span>3</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary' >Dental
         <br/>
         Implants</h3>

        <p className='text-xl font-nunito mb-20 text-toptext' >
        Lorem ipsum dolor sit amet consectetur. 
        </p>
      </motion.div>
    
      <motion.div 
        className="col-span-1 row-span-2 p-4 bg-box2 rounded-lg flex flex-col items-start"
        variants={fadeIn("right", "tween", 0.2, 1)} 
        initial="hidden"
       whileInView="show"
       viewport={{ once: true}}
      >
     <h1 className='text-[56px] font-playfair text-toptext font-semibold mb-4' > <span className='!font-normal' >/</span>4</h1>
        <h3 className='text-4xl font-playfair mb-4 text-primary' >Dental
         <br/>
         Crowns</h3>

        <p className='text-xl font-nunito mb-20 text-toptext' >
        Lorem ipsum dolor sit amet consectetur. 
        </p>
      </motion.div>
    
      <motion.div 
        className="col-span-2 row-span-2 rounded-lg flex items-center justify-center"
           variants={fadeIn("right", "tween", 0.2, 1)} 
        initial="hidden"
       whileInView="show"
       viewport={{ once: true}}
      >
        <Image src={servicesImage} alt='Our services' />
        
      </motion.div>
    
    </div>
  </div>
  
  )
}

export default Services