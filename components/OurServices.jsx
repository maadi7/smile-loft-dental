import React from 'react';
import Image from "next/image";
import serviceImage from "../assets/services-page-Image.png";
import blackWallpaper from "../assets/services-wallpaper.png";

const OurServices = () => {
  return (
    <div className='bg-bgtop pt-40 pb-20 px-24 flex items-center justify-around relative '>
        <div className='flex flex-col items-start ' >
            <h3 className='text-[28px] text-toptext font-semibold font-playfair' >Our Services</h3>
            <h1 className='text-[56px] font-playfair font-semibold mb-5 text-primary uppercase' >Teeth Whitening</h1>
            <p className='text-2xl font-nunito max-w-[590px] text-primary leading-10' >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.    
            </p>
        </div>
        <div className='' >
        <Image src={serviceImage} alt='reviews' className='w-[584px] h-[380px] mt-10 bg-contain relative z-10' />
        <Image src={blackWallpaper} alt='wallpaper'  className=' absolute top-[140px] right-0 w-[646px] h-[356px] bg-contain ' />
        </div>
        
    </div>
  )
}

export default OurServices