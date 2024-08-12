"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import SmileLoftLogo from "../assets/Smile-Loft-logo1.png";
import HamburgerIcon from "../assets/hamburger.png";
import Link from 'next/link';
import {motion} from "framer-motion";
import { fadeIn } from '@/utils/motion';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const footer = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about-us" },
    { name: "Our Services", href: "/our-services" },
    { name: "Contact Us", href: "/contact-us" },
    { name: "Blogs", href: "/blogs" },
  ];


  return (
    <div className='fixed top-0 left-0 w-full px-4 py-0 bg-[#000000] bg-opacity-40 backdrop-filter backdrop-blur-lg z-50'>
    
      <div className='flex justify-between items-center px-6 sm:px-16 py-6 xl:px-24 lg:px-12'>
        <div className='w-[160px] h-[60px]'>
          <Image src={SmileLoftLogo} alt='smile-loft-dental' />
        </div>
        <div className='flex items-center justify-between' >
        <button className='font-satoshi px-8 py-2 text-[18px] text-white mr-10' >
          EN | ES
        </button>
        <button className='w-8 h-8' onClick={toggleMenu} >
          <Image src={HamburgerIcon} alt='Sidebar' />
        </button>
        </div>
        <div
          className={`bg-[#999999] bg-opacity-100 backdrop-filter backdrop-blur-lg  top-0 right-0 fixed w-[70%] md:w-1/2 h-screen z-30 flex flex-col items-center justify-center transition-transform duration-300 transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button className="self-end mr-4 mt-4" onClick={toggleMenu}>
            <svg
              className="absolute top-2 right-1 sm:top-10 sm:right-10 w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
          <motion.ul
            className="justify-between flex text-xl pt-5 mx-5 gap-y-6 items-center text-[#fff]  flex-col  font-rubik font-medium"
            variants={fadeIn("up", "tween", 0.2, 0.2)}
            initial="hidden"
            whileInView="show"
          >
            {footer.map((item, index) => (
              <Link key={index} href={item.href}>
                <span className="cursor-pointer  hover:text-[#000] transition-all duration-300 uppercase font-raleway font-bold">
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
