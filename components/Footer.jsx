"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import FooterLogo from "../assets/Smile-Loft-logo1.png";
import Youtube from "../assets/youtube-svgrepo-com.svg"
import Instagram from "../assets/Instagram.svg";
import Facebook from "../assets/facebook.svg";
import LinkedIn from "../assets/linkedIn.svg";
import Image from 'next/image';
import useTranslation from '../hooks/useTranslation';
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';

const linkMap = {
  "Home": "/",
  "About us": "/about-us",
  "Services": "/our-services",
  "Contact us": "/contact-us",
  "Blogs": "/blogs",
  "Search nearby clinics": "/our-locations"
};

const FooterSection = ({ title, items, pointer, locationDetails }) => {
  const { translate, language } = useTranslation();
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedItems, setTranslatedItems] = useState(items);

  useEffect(() => {
    const translateText = async () => {
      if (language !== 'en') {
        const translatedTitle = await translate(title);
        setTranslatedTitle(translatedTitle.text || title);
        
        if(title === "Quick Links") {
          const translatedItems = await Promise.all(items.map(item => translate(item)));
          setTranslatedItems(translatedItems.map(item => item.text || item));
        }
      } else {
        setTranslatedTitle(title);
        setTranslatedItems(items);
      }
    };

    translateText();
  }, [language, title, items]);

  return (
    <div className='mt-20 lg:mt-0 flex flex-col items-start'>
      <p className='text-xl font-raleway font-semibold'>{translatedTitle}</p>
      <div className='text-[18px] my-2 flex flex-col'>
        {title === "Our Locations" && locationDetails ? 
          locationDetails.map((location, index) => (
            <a href={location.googleProfileLink} 
               target="_blank" 
               rel="noopener noreferrer" 
               key={index} 
               className='mt-4 font-nunito cursor-pointer'>
              {location.locationName.substring(11)}
            </a>
          ))
        : translatedItems.map((item, index) => (
          pointer ? (
            <Link href={linkMap[item] || '/'} key={index}>
              <p className='mt-4 font-nunito cursor-pointer'>
                {item}
              </p>
            </Link>
          ) : (
            <p className='mt-4 font-nunito' key={index}>
              {item}
            </p>
          )
        ))}
        { (translatedTitle === "Quick Links" || translatedTitle === "Enlaces rápidos") && (
          <div className='mt-6'>
            <p className='text-xl font-semibold font-raleway'>Connect With Us</p>
            <div className='flex items-center mt-4 space-x-3'>
              <a href="https://www.facebook.com/SmileLoftGB/" target="_blank" rel="noopener noreferrer" className='inline-block p-[6px] bg-white rounded-full border hover:bg-box2'>
                <Image src={Facebook} alt='Facebook' className='h-5 w-5' objectFit='contain' />
              </a>
              <a href="https://www.instagram.com/smileloftglenburnie/" target="_blank" rel="noopener noreferrer" className='inline-block p-[6px] bg-white rounded-full border hover:bg-box2'>
                <Image src={Instagram} alt='Instagram' className='h-5 w-5' />
              </a>
              <a href="https://www.youtube.com/@smileloftdental" target="_blank" rel="noopener noreferrer" className='inline-block p-[6px] bg-white rounded-full border hover:bg-box2'>
                <Image src={Youtube} alt='youtube' className='h-5 w-5' objectFit='contain' />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Footer = () => {
  const { translate, language } = useTranslation();
  const [locationDetails, setLocationDetails] = useState([]);
  const [translatedLinks, setTranslatedLinks] = useState(["Home", "About us", "Services", "Contact us", "Blogs", "Search nearby clinics"]);

  const doctors = [
    "Dr. Vaibhav Rai, DDS",
    "Dr. Laxmi Reddy, DDS",
    "Dr. Yasmin Akhlagi, DDS",
    "Dr. Kathee Douglas, DMD",
    "Dr. Ariana Frank, DMD",
    "Dr. Trushen Patel, DMD",
    "Dr. Wachiraya Poonnak, DDS",
    "Dr. Jeremy Way, DDS",
    "Dr. Li-Yin Chiang, DDS"
  ];
  
  const links = ["Home", "About us", "Services", "Blogs", "Search nearby clinics"];

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const query = gql`
          query MyQuery {
            locationDetails {
              locationName
              googleProfileLink
            }
          }
        `;
        const response = await graphQLClient.request(query);

        if (response && response.locationDetails) {
          setLocationDetails(response.locationDetails);
        }
      } catch (error) {
        console.error("GraphQL Error:", error);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    const translateText = async () => {
      if (language !== 'en') {
        const translatedLinks = await Promise.all(links.map(item => translate(item)));
        setTranslatedLinks(translatedLinks.map(item => item.text || item));
      } else {
        setTranslatedLinks(links);
      }
    };

    translateText();
  }, [language]);

  return (
    <>
    <div className='md:py-20 xl:px-24 px-4 py-16 bg-primary text-white'>
      <div className='grid grid-cols-1 md:grid-cols-5 md:gap-8 gap-0'>
        <div className='col-span-2'>
          <Image src={FooterLogo} alt='footer-logo' className='w-[280px] h-[96px]' />
        </div>
        <div className='md:col-span-1 col-span-2'>
          <FooterSection 
            title="Our Locations" 
            locationDetails={locationDetails} 
          />
        </div>
        <div className='md:col-span-1 col-span-2 md:ml-12 ml-0'>
          <FooterSection 
            title="Quick Links" 
            items={translatedLinks} 
            pointer 
          />
        </div>
      </div>
    </div>
    <div className='md:py-4 md:px-24 px-12 py-4 bg-primary text-white'>
      &copy; 2024 Smile Loft Dental LLC
    </div>
  </>
  );
};

export default Footer;