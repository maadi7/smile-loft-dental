import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { graphQLClient } from "../../lib/graphqlClient";
import { gql } from 'graphql-request';
import serviceImage from "../../assets/services-page-Image.png";
import blackWallpaper from "../../assets/services-wallpaper.png";
import qoutesTop from "../../assets/“.png";
import qoutesBottom from "../../assets/“ (1).png";
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";
import { blurHashToDataURL } from '@/utils/blurhash';
import AppointmentForm from '@/components/AppointmentForm';
import useTranslation from '../../hooks/useTranslation';
import Head from 'next/head';

interface Service {
  name: string;
  description: string;
  slug: string;
  subSection: { [key: string]: string[] };
  serviceImage: {url: string}
}

interface ServiceResponse {
  ourServices: Service[];
}

interface ServiceProps {
  service: Service;
  QnA: { [key: string]: string[] };
}

const Service: React.FC<ServiceProps> = ({ service, QnA }) => {
  const { translate, language } = useTranslation();
  const [translatedService, setTranslatedService] = useState<Service>(service);
  const [translatedQnA, setTranslatedQnA] = useState<{ [key: string]: string[] }>(QnA);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const renderSection = (title: string, data: string[]) => (
    <div className="mb-4 w-full">
      <button
        className="w-full flex justify-between items-center p-2 sm:p-4 rounded-lg border-none my-3 sm:my-5"
        onClick={() => toggleSection(title)}
      >
        <span className='font-playfair text-3xl text-start sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-primary uppercase'>{title}</span>
        <span className={`transition-transform duration-500 ${openSection === title ? 'rotate-180' : ''}`}>
          {openSection === title ? (
            <Image src={minus} alt='open' className='w-[28px] sm:w-[40px] md:w-[48px] lg:w-[56px]' />
          ) : (
            <Image src={plus} alt='collapse' className='w-[28px] sm:w-[40px] md:w-[48px] lg:w-[56px]' />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${openSection === title ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="my-5 sm:my-10 p-2 sm:p-4 rounded-lg">
          <ul className="list-disc pl-3 sm:pl-5">
            {data.map((text, idx) => (
              <li className='text-base sm:text-lg md:text-xl lg:text-2xl font-nunito text-subtext leading-7 sm:leading-8 md:leading-9 lg:leading-10 text-start mb-3 sm:mb-5 max-w-full' key={idx}>
                <span className="inline">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-toptext mt-2 sm:mt-4"></div>
    </div>
  );

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const translateContent = async () => {
      try {
        const translatedServiceName = await translate(service.name);
        const translatedServiceDescription = await translate(service.description);

        const translatedQnA = await Promise.all(
          Object.entries(QnA).map(async ([title, data]) => {
            const translatedTitle = await translate(title);
            const translatedData = await Promise.all(data.map(item => translate(item)));
            return { title: translatedTitle.text || title, data: translatedData.map(d => d.text || d) };
          })
        );

        setTranslatedService({
          ...service,
          name: translatedServiceName.text || service.name,
          description: translatedServiceDescription.text || service.description,
        });

        const translatedQnAObject = translatedQnA.reduce((acc, { title, data }) => {
          acc[title] = data;
          return acc;
        }, {} as { [key: string]: string[] });

        setTranslatedQnA(translatedQnAObject);
      } catch (error) {
        console.error('Error during translation:', error);
      }
    };

    translateContent();
  }, [language, service, QnA, translate]);
  
  const baseUrl = 'https://smileloftdental.com';
  const pageUrl = `${baseUrl}/our-services/${service.slug}`;

  return (
    <>
     <Head>
        <title>{`${translatedService.name} | Smile Loft Dental Services`}</title>
        <meta
          name="description"
          content={`Learn about our ${translatedService.name} service at Smile Loft Dental. ${translatedService.description.slice(0, 150)}...`}
        />
        <link rel="canonical" href={pageUrl} />
        
        {/* OG Tags */}
        <meta property="og:title" content={`${translatedService.name} | Smile Loft Dental Services`} />
        <meta 
          property="og:description" 
          content={`Learn about our ${translatedService.name} service at Smile Loft Dental. ${translatedService.description.slice(0, 150)}...`}
        />
        <meta property="og:image" content="/assets/dentist.png" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${translatedService.name} | Smile Loft Dental Services`} />
        <meta 
          name="twitter:description" 
          content={`Learn about our ${translatedService.name} service at Smile Loft Dental. ${translatedService.description.slice(0, 150)}...`}
        />
        <meta name="twitter:image" content="/assets/dentist.png" />
      </Head>
   
    <div>
      <div className='pb-10 sm:pb-20 px-4 sm:px-24 bg-bgtop  pt-40 flex lg:flex-row flex-col items-center justify-around relative'>
        <div className='flex flex-col items-start mr-0 lg:mr-10 mb-8 lg:mb-0'>
          <h3 className='text-2xl sm:text-[28px] text-toptext font-semibold font-playfair md:mb-5 mb-2'>Our Services</h3>
          <h1 className='text-4xl sm:text-[56px] sm:leading-[50px] font-playfair font-semibold mb-3 sm:mb-5 text-primary uppercase'>{translatedService.name}</h1>
          <p className='text-xl sm:text-2xl font-nunito max-w-[590px] text-primary !leading-8 sm:!leading-10'>{translatedService.description}</p>
        </div>
        <div>
          <Image 
            src={service.serviceImage.url} 
            width={585}
            height={380}
            alt='reviews' 
            className='w-full sm:w-[584px] h-auto sm:h-[380px] mt-0 sm:mt-10 bg-contain relative z-10 rounded-lg' 
            placeholder='blur'
            blurDataURL={blurHashToDataURL("L4L|6|0000O[000C^Y.m4T_2AK01")}
          />
          <Image 
            src={blackWallpaper} 
            alt='wallpaper' 
            className='hidden lg:block absolute top-[140px] right-0 w-[35%] h-[55%] bg-contain' 
          />
        </div>
      </div>

      <div className='py-10 sm:py-16 md:py-20 px-6 sm:px-12 md:px-24 bg-bgbottom flex items-center justify-center text-center'>
        <div className='relative'>
          <h2 className='font-nunito text-lg sm:text-xl md:text-2xl leading-7 sm:leading-8 md:leading-10 max-w-full sm:max-w-[800px] md:max-w-[1000px]'>
            I recently had teeth whitening done at Smile Loft Dental, and I am thrilled with the results! The staff was friendly and professional, and the office was clean and modern. Dr. Rai explained everything clearly and made me feel comfortable. The procedure was quick and painless, and my teeth look amazing. Highly recommend Smile Loft Dental for a brighter smile!
          </h2>
          <Image 
            src={qoutesTop} 
            alt='"' 
            className='absolute -top-8 sm:-top-12 md:-top-12 -left-5 md:-left-24 h-[40px] sm:h-[55px] md:h-[70px] w-[60px] sm:w-[80px] md:w-[100px]' 
          />
          <Image 
            src={qoutesBottom} 
            alt='"' 
            className='absolute -bottom-6 sm:-bottom-8 md:-bottom-10 -right-5  md:-right-22 h-[40px] sm:h-[55px] md:h-[70px] w-[60px] sm:w-[80px] md:w-[100px]' 
          />
        </div>
      </div>

      <div className='py-10 sm:py-16 md:py-20 px-6 sm:px-12 md:px-24 bg-bgtop'>
        {Object.entries(translatedQnA).map(([title, data]) => renderSection(title, data))}
      </div>

      <AppointmentForm/>
    </div>
    </>
  );
}

export default Service;

export async function getServerSideProps({ params }: { params: any }) {
  const GET_SERVICE_QUERY = gql`
    query GetService($slug: String!) {
      ourServices(where: { slug: $slug }) {
        name
        description
        slug
        subSection
        serviceImage{
          url
        }
      }
    }
  `;

  try {
    const serviceResponse = await graphQLClient.request<ServiceResponse>(GET_SERVICE_QUERY, {
      slug: params.slug,
    });

    if (!serviceResponse.ourServices || !serviceResponse.ourServices[0]) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        service: serviceResponse.ourServices[0],
        QnA: serviceResponse.ourServices[0].subSection,
      },
    };
  } catch (error) {
    console.error("Error fetching service data:", error);
    return {
      notFound: true,
    };
  }
};
