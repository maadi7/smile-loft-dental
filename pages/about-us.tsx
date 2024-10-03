import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import image from "../assets/dentist.png";
import { Timeline } from '@/components/ui/timeline';
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}


const AboutUs = () => {
  const { translate, language } = useTranslation();
  const [translatedHeader, setTranslatedHeader] = useState<string>("About Us");
  const [translatedMission, setTranslatedMission] = useState<string>("Founded in 2013. Smile Loft Dental was built on a foundation of compassion, education, and a commitment to excellence. Our mission is to provide high-quality, patient-centered care that fosters health, happiness, and balance. We believe in honesty, integrity, accountability, and teamwork, striving to create a welcoming environment where every patient feels valued and heard.");
  const [translatedWhyChooseHeader, setTranslatedWhyChooseHeader] = useState<string>("Why Choose Smile Loft Dental?");
  const [translatedWhyChooseParagraph1, setTranslatedWhyChooseParagraph1] = useState<string>("Smile Loft Dental isn't just a dental office; it's a community dedicated to your overall well-being. Our highly skilled team prioritizes patient education and personalized care, ensuring that every visit is tailored to your unique needs. With state-of-the-art technology, gentle techniques, and a focus on preventive care, we work diligently to keep your smile healthy and beautiful.");
  const [translatedWhyChooseParagraph2, setTranslatedWhyChooseParagraph2] = useState<string>("At Smile Loft, you're more than just a patient—you're family. We are committed to transparency and integrity in every interaction, fostering trust and long-term relationships. Our emphasis on leadership, compassion, and humility means we are always learning and improving to serve you better. Choose Smile Loft Dental as your dental home and experience the perfect blend of clinical excellence and compassionate care.");

  

  
  const timelineData: TimelineEntry[] = [
    { title: '2013', content: <p>Laurel</p> },
    { title: '2017', content: <p>Glen Burnie</p> },
    { title: '2020', content: <p>Landover</p> },
    { title: '2021', content: <p>Shady Grove</p> },
    { title: '2021', content: <p>Affinity</p> },
    { title: '2022', content: <p>Towne Centre</p> },
    { title: '2023', content: <p>North Potomac</p> },
    { title: '2023', content: <p>Bowie</p> },
    { title: '2024', content: <p>Middle River</p> },
  ];

  useEffect(() => {
    const translateContent = async () => {
      if (language === 'en') {
        setTranslatedHeader("About Us");
        setTranslatedMission("Founded in 2013. Smile Loft Dental was built on a foundation of compassion, education, and a commitment to excellence. Our mission is to provide high-quality, patient-centered care that fosters health, happiness, and balance. We believe in honesty, integrity, accountability, and teamwork, striving to create a welcoming environment where every patient feels valued and heard.");
        setTranslatedWhyChooseHeader("Why Choose Smile Loft Dental?");
        setTranslatedWhyChooseParagraph1("Smile Loft Dental isn't just a dental office; it's a community dedicated to your overall well-being. Our highly skilled team prioritizes patient education and personalized care, ensuring that every visit is tailored to your unique needs. With state-of-the-art technology, gentle techniques, and a focus on preventive care, we work diligently to keep your smile healthy and beautiful.");
        setTranslatedWhyChooseParagraph2("At Smile Loft, you're more than just a patient—you're family. We are committed to transparency and integrity in every interaction, fostering trust and long-term relationships. Our emphasis on leadership, compassion, and humility means we are always learning and improving to serve you better. Choose Smile Loft Dental as your dental home and experience the perfect blend of clinical excellence and compassionate care.");
      } else {
        const headerTranslation = await translate("About Us");
        setTranslatedHeader(headerTranslation.text || "About Us");

        const missionTranslation = await translate("Founded in 2013. Smile Loft Dental was built on a foundation of compassion, education, and a commitment to excellence. Our mission is to provide high-quality, patient-centered care that fosters health, happiness, and balance. We believe in honesty, integrity, accountability, and teamwork, striving to create a welcoming environment where every patient feels valued and heard.");
        setTranslatedMission(missionTranslation.text || "Founded in 2013. Smile Loft Dental was built on a foundation of compassion, education, and a commitment to excellence. Our mission is to provide high-quality, patient-centered care that fosters health, happiness, and balance. We believe in honesty, integrity, accountability, and teamwork, striving to create a welcoming environment where every patient feels valued and heard.");

        const whyChooseHeaderTranslation = await translate("Why Choose Smile Loft Dental?");
        setTranslatedWhyChooseHeader(whyChooseHeaderTranslation.text || "Why Choose Smile Loft Dental?");

        const whyChooseParagraph1Translation = await translate("Smile Loft Dental isn't just a dental office; it's a community dedicated to your overall well-being. Our highly skilled team prioritizes patient education and personalized care, ensuring that every visit is tailored to your unique needs. With state-of-the-art technology, gentle techniques, and a focus on preventive care, we work diligently to keep your smile healthy and beautiful.");
        setTranslatedWhyChooseParagraph1(whyChooseParagraph1Translation.text || "Smile Loft Dental isn't just a dental office; it's a community dedicated to your overall well-being. Our highly skilled team prioritizes patient education and personalized care, ensuring that every visit is tailored to your unique needs. With state-of-the-art technology, gentle techniques, and a focus on preventive care, we work diligently to keep your smile healthy and beautiful.");

        const whyChooseParagraph2Translation = await translate("At Smile Loft, you're more than just a patient—you're family. We are committed to transparency and integrity in every interaction, fostering trust and long-term relationships. Our emphasis on leadership, compassion, and humility means we are always learning and improving to serve you better. Choose Smile Loft Dental as your dental home and experience the perfect blend of clinical excellence and compassionate care.");
        setTranslatedWhyChooseParagraph2(whyChooseParagraph2Translation.text || "At Smile Loft, you're more than just a patient—you're family. We are committed to transparency and integrity in every interaction, fostering trust and long-term relationships. Our emphasis on leadership, compassion, and humility means we are always learning and improving to serve you better. Choose Smile Loft Dental as your dental home and experience the perfect blend of clinical excellence and compassionate care.");
      }
    };

    translateContent();
  }, [translate, language]);

  const pageUrl = `https://smileloft.com/about-us`;

  return (
    <>
      <Head>
        <title>About Us | Smile Loft Dental</title>
        <meta
          name="description"
          content="Learn about Smile Loft Dental's history, mission, and commitment to excellent dental care. Discover why we're the right choice for your dental health needs."
        />
        <link rel="canonical" href={pageUrl} />
        
        {/* OG Tags */}
        <meta property="og:title" content="About Us | Smile Loft Dental" />
        <meta 
          property="og:description" 
          content="Learn about Smile Loft Dental's history, mission, and commitment to excellent dental care. Discover why we're the right choice for your dental health needs."
        />
        <meta property="og:image" content="/assets/dentist.png" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Smile Loft Dental" />
        <meta 
          name="twitter:description" 
          content="Learn about Smile Loft Dental's history, mission, and commitment to excellent dental care. Discover why we're the right choice for your dental health needs."
        />
        <meta name="twitter:image" content="/assets/dentist.png" />
      </Head>
      <div className='bg-bgtop pb-10 px-4 2xl:px-24 md:pt-40 pt-32'>
        <div className='md:mt-10 mt-5'>
          <Image src={image} alt='our-team' />
        </div>
        <div className='flex flex-col items-start justify-center md:pt-12 pt-6'>
          <h2 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] leading-[40px] font-semibold mb-5 md:mb-10 text-primary uppercase'>
            {translatedHeader}
          </h2>
          <p className='text-lg md:text-2xl leading-8 md:leading-10 font-nunito text-subtext max-w-[1239px]'>
            {translatedMission}
          </p>
        </div>
        <div className='flex flex-col items-start justify-center md:pt-24 pt-12'>
          <h2 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] !leading-[40px] font-semibold mb-5 md:mb-10 text-primary uppercase'>
            {translatedWhyChooseHeader}
          </h2>
          <div className='text-lg md:text-2xl leading-8 md:leading-10 font-nunito text-subtext max-w-[1239px]'>
            <p className='md:mb-10 mb-8'>
              {translatedWhyChooseParagraph1}
            </p>
            <p>
              {translatedWhyChooseParagraph2}
            </p>
          </div>
        </div>
        <Timeline data={timelineData} />
      </div>
    </>
  )
}

export default AboutUs;