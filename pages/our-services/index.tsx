import React, { useEffect, useState } from 'react';
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';
import Link from 'next/link';
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';

// Define TypeScript interfaces for the data structure
interface Service {
  name: string;
  description: string;
  slug: string;
  serviceImage: {url: string}
}

interface ServiceResponse {
  ourServices: Service[];
}

const Ourservices: React.FC = () => {
  const { translate, language } = useTranslation();
  const [services, setServices] = useState<Service[]>([]);
  const [translatedServices, setTranslatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await graphQLClient.request<ServiceResponse>(
          gql`
            query MyQuery {
              ourServices {
                name
                description
                slug
                serviceImage {
                  url
                }
              }
            }
          `
        );

        if (response && response.ourServices) {
          setServices(response.ourServices);
        }
      } catch (error) {
        console.error("GraphQL Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    const translateServiceNames = async () => {
      const translatedNames = await Promise.all(
        services.map(async (service) => {
          const translatedName = await translate(service.name);
          return { ...service, name: translatedName.text || service.name };
        })
      );
      setTranslatedServices(translatedNames);
    };

    translateServiceNames();
  }, [services, translate, language]);

  const colors = ["#E7E4DA", "#CFC9B5"];
  const baseUrl = 'https://smileloftdental.com';
  const pageUrl = `${baseUrl}/our-services`;

  return (
    <>
      <Head>
        <title>Our Dental Services | Smile Loft Dental</title>
        <meta
          name="description"
          content="Explore our comprehensive range of dental services at Smile Loft Dental. From general dentistry to specialized treatments, we're committed to your oral health."
        />
        <link rel="canonical" href={pageUrl} />
        
        {/* OG Tags */}
        <meta property="og:title" content="Our Dental Services | Smile Loft Dental" />
        <meta 
          property="og:description" 
          content="Explore our comprehensive range of dental services at Smile Loft Dental. From general dentistry to specialized treatments, we're committed to your oral health."
        />
        <meta property="og:image" content="/assets/dentist.png" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        
        {/* Twitter Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Dental Services | Smile Loft Dental" />
        <meta 
          name="twitter:description" 
          content="Explore our comprehensive range of dental services at Smile Loft Dental. From general dentistry to specialized treatments, we're committed to your oral health."
        />
        <meta name="twitter:image" content="/assets/dentist.png" />
      </Head>

      <div className='bg-bgtop pt-20 pb-10 flex justify-center items-center'>
        {loading ? (
          <div className="min-h-[80vh] flex items-center justify-center space-x-4 z-50">
            <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-0"></div>
            <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-1"></div>
            <div className="w-5 h-5 bg-[#b2b1b1] rounded-full bounce-delay-2"></div>
          </div>
        ) : (
          <div className='flex flex-col' >
            <h2 className='text-center pt-10 md:text-7xl text-5xl font-playfair text-primary'>Our Services</h2>
            <div className="flex h-full w-full items-center justify-center md:py-16 py-8 px-0 lg:px-20 !overflow-hidden">
              <div className="grid h-full w-full gap-8 p-2 grid-cols-1 sm:grid-cols-2 custom-md:grid-cols-3 custom-lg:grid-cols-3 grid-rows-12 sm:grid-rows-8 custom-lg:grid-rows-10 custom-md:grid-rows-6">
                {translatedServices && translatedServices.map((service, index) => (
                <Link
                  key={service.slug}
                  href={`our-services/${service.slug}`}
                  className="col-span-1 row-span-10 p-4 rounded-lg text-center flex flex-col items-center justify-center hover:scale-105 transition-all relative group"
                  style={{ backgroundColor: colors[index % colors.length] }}
                >
                  {/* Text - visible on larger screens, hidden on hover */}
                  <h2 className='text-3xl lg:text-4xl font-playfair mb-4 text-primary z-10 transition-opacity duration-300 sm:group-hover:opacity-0 hidden sm:block'>
                    {service.name}
                  </h2>
                  
                  {/* Image - visible on hover for larger screens */}
                  <div
                    className="absolute inset-0 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-cover bg-center hidden sm:block"
                    style={{ backgroundImage: `url(${service.serviceImage.url})` }}
                  >
                     <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 p-4 rounded-t-lg">
                      <h2 className='text-3xl sm:text-xl font-playfair text-white'>
                        {service.name}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Mobile layout */}
                  <div className="sm:hidden w-full h-full absolute inset-0 rounded-lg bg-cover bg-center"
                       style={{ backgroundImage: `url(${service.serviceImage.url})` }}>
                    <div className="absolute inset-x-0 bottom-0 bg-black bg-opacity-70 p-4 rounded-t-lg">
                      <h2 className='text-3xl sm:text-xl font-playfair text-white'>
                        {service.name}
                      </h2>
                    </div>
                  </div>
                </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Ourservices;