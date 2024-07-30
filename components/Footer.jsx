import React from 'react';
import FooterLogo from "../assets/Smile-Loft-logo1.png";
import Instagram from "../assets/Instagram.svg";
import Facebook from "../assets/facebook.svg";
import Facebook1 from "../assets/facebook1.png";
import LinkedIn from "../assets/linkedIn.svg";
import Image from 'next/image';

const FooterSection = ({ title, items }) => (
  <div className='mt-20 lg:mt-0 flex flex-col items-start'>
    <p className='text-xl font-raleway font-semibold'>{title}</p>
    <div className='text-[18px] my-2 flex flex-col'>
      {items.map((item, index) => (
        <p className="mt-4 font-nunito" key={index}>{item}</p>
      ))}
      {title === "Quick Links" &&
      <div className='mt-6' >
        <p className='text-xl font-semibold font-raleway' >Connect With Us</p>
        <div className='flex items-center mt-4 space-x-4'>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className='inline-block'>
              <Image src={Instagram} alt='Instagram' className='h-8 w-8 p-2 bg-white border border-white rounded-full' />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className='inline-block'>
              <Image src={Facebook} alt='Facebook' className='h-8 w-8 p-2 bg-white border border-white rounded-full' />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className='inline-block'>
              <Image src={LinkedIn} alt='LinkedIn' className='h-8 w-8 p-2 bg-white border border-white rounded-full' />
            </a>
          </div> 
      </div>
      
      }
    </div>
  </div>
);

const Footer = () => {
  const locations = ["Affinity Dental", "Glen Burnie", "Landover", "Laurel", "North Potomac", "Shady Grove", "Towne Centre"];
  const doctors = ["Dr. Vaibhav Rai, DDS", "Dr. Laxmi Reddy, DDS", "Dr. Yasmin Akhlagi, DDS", "Dr. Kathee Douglas, DMD", "Dr. Ariana Frank, DMD", "Dr. Trushen Patel, DMD", "Dr. Wachiraya Poonnak, DDS", "Dr. Jeremy Way, DDS", "Dr. Li-Yin Chiang, DDS"];
  const links = ["Home", "About us", "Services", "Contact us", "Blogs"];

  return (
    <>
    <div className='md:py-20 md:px-24 px-12 py-16 bg-primary flex flex-col lg:flex-row justify-between text-white'>
      <div>
        <Image src={FooterLogo} alt='footer-logo' className='w-[280px] h-[96px]' />
      </div>
      <div className='flex flex-1 flex-col lg:flex-row justify-around md:ml-10 xl:mr-20'>
        <FooterSection title="Our Locations" items={locations} />
        <FooterSection title="Meet All Doctors" items={doctors} />
        <FooterSection title="Quick Links" items={links} />
      </div>

    </div>
    <div className='md:py-4 md:px-24 px-12 py-4 bg-primary text-white' >&copy; 2024 Smile Loft Dental LLC</div>
    </>
  );
}

export default Footer;
