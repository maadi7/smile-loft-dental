import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SmileLoftLogo from "../assets/Smile-Loft-logo1.png";
import HamburgerIcon from "../assets/hamburger.png";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
  };


  return (
    <div className='fixed top-0 left-0 w-full px-4 py-0 bg-[#000000] bg-opacity-10 backdrop-filter backdrop-blur-lg z-50'>
    
      <div className='flex justify-between items-center px-6 sm:px-16 py-6 xl:px-24 lg:px-12'>
        <div className='w-[160px] h-[60px]'>
          <Image src={SmileLoftLogo} alt='smile-loft-dental' />
        </div>
        <div className='flex items-center justify-between' >
        <button className='font-satoshi px-8 py-2 text-[18px] text-white mr-10' onClick={toggleLanguage}>
          EN | ES
        </button>
        <button className='w-8 h-8' >
          <Image src={HamburgerIcon} alt='Sidebar' />
        </button>
        </div>
      </div>

    </div>
  );
};

export default Navbar;
