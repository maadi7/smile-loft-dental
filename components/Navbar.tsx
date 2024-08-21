"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CloseIcon from '@mui/icons-material/Close';
import SmileLoftLogo from '../assets/Smile-Loft-logo1.png';
import HamburgerIcon from '../assets/hamburger.png';
import { fadeIn } from '@/utils/motion';
import useTranslation from '../hooks/useTranslation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { translate, toggleLanguage, language } = useTranslation();
  const [menuItems, setMenuItems] = useState([
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Services", href: "/our-services" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Blogs", href: "/blogs" },
  ]);

  useEffect(() => {
    const translateMenuItems = async () => {
      const translatedItems = await Promise.all(
        menuItems.map(async (item) => {
          const translation = await translate(item.name);
          return {
            ...item,
            name: translation.text || item.name, // Use the 'text' property, fallback to original name
          };
        })
      ); 
      setMenuItems(translatedItems);
    };
  
    translateMenuItems();
  }, [language]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='fixed top-0 left-0 w-full px-4 py-0 bg-[#000000] bg-opacity-40 backdrop-filter backdrop-blur-lg z-40'>
      <div className='flex justify-between items-center px-0 sm:px-16 py-6 xl:px-24 lg:px-12'>
        <div className='w-[160px] h-[60px]'>
          <Link href={"/"} >
          <Image src={SmileLoftLogo} alt='smile-loft-dental' />
          </Link>
        </div>
        <div className='flex items-center justify-between' >
        <button 
  className='font-satoshi md:px-8 py-2 md:text-[18px] text-white md:mr-10 text-[16px] mr-8 px-2'
  onClick={toggleLanguage}
>
  <span className={language === 'en' ? 'font-bold  mr-1' : 'mr-1 text-primary'}>
    EN
  </span> 
  |
  <span className={language === 'es' ? 'font-bold ml-1' : 'ml-1 text-primary'}>
    ES
  </span>
</button>

          <button className='w-8 h-8' onClick={toggleMenu} >
            <Image src={HamburgerIcon} alt='Sidebar' />
          </button>
        </div>
        <div
          className={`bg-[#848484] bg-opacity-100 backdrop-filter backdrop-blur-lg  top-0 right-0 fixed w-[70%] md:w-1/3 h-screen z-30 flex flex-col items-start justify-start pt-20 transition-transform duration-300 transform rounded-l-lg ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <CloseIcon  style={{ fontSize: 40, color: '#fff' }} className="self-end mr-4 mt-4 absolute top-4 right-3 cursor-pointer" onClick={toggleMenu}  />
  
          <motion.ul
            className="justify-center flex pt-5 mx-10 gap-y-8 items-start text-[#fff]  flex-col  font-rubik font-medium"
            variants={fadeIn("up", "tween", 0.2, 0.2)}
            initial="hidden"
            whileInView="show"
          >
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href} >
                <span onClick={toggleMenu} className="cursor-pointer text-[20px] md:text-[28px] hover:text-subtext hover:scale-125 transform transition-all duration-300 uppercase font-playfair font-bold">
                  {item.name}
                </span>
              </Link>
            ))} 
          </motion.ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;