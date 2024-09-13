import React, { useEffect, useState } from 'react';
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';
import Link from 'next/link';
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';

// Define TypeScript interfaces for the data structure
interface Location {
  address: string;
  blurHash: string;
  location: {
    latitude: number;
    longitude: number;
  };
  locationImage:{
    url: string
  }
  locationName: string;
}

interface LocationResponse {
    locationDetails: Location[];
}

const Ourservices: React.FC = () => {
  const { translate, language } = useTranslation();
  const [services, setServices] = useState<Location[]>([]);
  const [translatedServices, setTranslatedServices] = useState<Location[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [locationHeading, setLocationHeading] = useState<string>("Our Locations")

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await graphQLClient.request<LocationResponse>(
          gql`
            query MyQuery {
                locationDetails {
                            locationName
                            address
                            location {
                                latitude
                                longitude
                            }
                            locationImage {
                                  url
                            }
                            blurHash
                           
            }
            }
          `
        );

        if (response && response.locationDetails) {
            console.log(response);
          setServices(response.locationDetails);
        }
      } catch (error) {
        console.error("GraphQL Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  useEffect(()=>{
    const translateHeading = async () => {
        if(language === "en"){
            setLocationHeading("Our Locations");
            return;
        }else{
            const translatedText = await translate("Our Locations");
            setLocationHeading(translatedText.text || "Our Locations")
        }
    }

    translateHeading();
  }, [translate, language])



  const colors = ["#E7E4DA", "#CFC9B5"];
  const baseUrl = 'https://smileloftdental.com';
  const pageUrl = `${baseUrl}/contact-us`;

  return (
    <>
     <Head>
  <title>Contact Us | Smile Loft Dental</title>
  <meta
    name="description"
    content="Get in touch with Smile Loft Dental for all your dental care needs. Find our locations, contact information, and hours of operation."
  />
  <link rel="canonical" href={pageUrl} />

  {/* OG Tags */}
  <meta property="og:title" content="Contact Us | Smile Loft Dental" />
  <meta 
    property="og:description" 
    content="Get in touch with Smile Loft Dental for all your dental care needs. Find our locations, contact information, and hours of operation."
  />
  <meta property="og:image" content="/assets/dentist.png" />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:type" content="website" />

  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Contact Us | Smile Loft Dental" />
  <meta 
    name="twitter:description" 
    content="Get in touch with Smile Loft Dental for all your dental care needs. Find our locations, contact information, and hours of operation."
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
            <h2 className='text-center pt-10 md:text-7xl text-5xl font-playfair text-primary'>{locationHeading}</h2>
            <div className="flex h-full w-full items-center justify-center md:py-16 py-8 px-4 lg:px-20 !overflow-hidden">
              <div className="grid h-full w-full gap-8 p-2 grid-cols-1 sm:grid-cols-2 custom-md:grid-cols-2 custom-lg:grid-cols-2 grid-rows-12 sm:grid-rows-8 custom-lg:grid-rows-10 custom-md:grid-rows-6">
                {services && services.map((service, index) => (
                <Link
                key={service.address}
                target="_blank"
                href={`https://www.google.com/maps?q=${service.location.latitude},${service.location.longitude}`}
                className="col-span-1 row-span-10 p-4 rounded-lg text-center flex flex-col items-center justify-center hover:scale-105 transition-all relative group"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                {/* Text - visible on mobile, hidden on hover for larger screens */}
                <h2 className='text-3xl lg:text-4xl font-playfair mb-4 text-primary z-10 transition-opacity duration-300 sm:group-hover:opacity-0'>
                  {service.locationName}
                </h2>
                
                
                <div
                  className="absolute inset-0 opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 rounded-lg bg-cover bg-center hidden sm:block"
                  style={{ backgroundImage: `url(${service.locationImage.url})` }}
                ></div>
                
              
                <div
                  className="absolute inset-0 rounded-lg bg-cover bg-center opacity-50 sm:hidden"
                  style={{ backgroundImage: `url(${service.locationImage.url})` }}
                ></div>
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