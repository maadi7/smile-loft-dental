import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import leftArrow from '../../assets/left-arrow.png';
import rightArrow from "../../assets/right-arrow.png";
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';
import { useRouter } from 'next/router';
import useTranslation from '@/hooks/useTranslation';

interface Dentist {
  name: string;
  designation: string;
  description: string;
  dentistImage: { url: string };
  slug: string;
}

interface DentistResponse {
  ourDentists: Dentist[];
}

const DOCTORS_PER_SLIDE = 7;

const OurTeam: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [currentDoctor, setCurrentDoctor] = useState<number>(0);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [dentists, setDentists] = useState<Dentist[]>([]);
  const [translatedDescriptions, setTranslatedDescriptions] = useState<string[]>([]);
  const [translatedReadMore, setTranslatedReadMore] = useState<string>('READ MORE');
  const router = useRouter();
  const { translate, language } = useTranslation();

  const totalSlides = Math.ceil(dentists.length / DOCTORS_PER_SLIDE);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 7000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleReadMoreClick = (slug: string) => {
    router.push(`/our-dentists/${slug}`);
  };

  useEffect(() => {
    const fetchDentists = async () => {
      try {
        const response = await graphQLClient.request<DentistResponse>(
          gql`
            query MyQuery {
              ourDentists {
                name
                designation
                dentistImage {
                  url
                }
                description
                slug
              }
            }
          `
        );

        if (response && response.ourDentists) {
          setDentists(response.ourDentists);
        }
      } catch (error) {
        console.error("GraphQL Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDentists();
  }, []);

  useEffect(() => {
    const translateDescriptions = async () => {
      if (language === 'en') {
        const originalDescriptions = dentists.map((dentist) => dentist.description);
        setTranslatedDescriptions(originalDescriptions);
        setTranslatedReadMore('READ MORE');
      } else {
        const translatedInfo = await Promise.all(
          dentists.map(async (dentist) => {
            const translatedDescription = await translate(dentist.description);
            return translatedDescription.text || dentist.description;
          })
        );
        const translatedReadMoreText = await translate('READ MORE');
        setTranslatedDescriptions(translatedInfo);
        setTranslatedReadMore(translatedReadMoreText.text || 'READ MORE');
      }
    };

    translateDescriptions();
  }, [dentists, translate, language]);

  const handleDoctorClick = (index: number) => {
    setCurrentDoctor(index);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const handlePrev = (index: number) => {
    if (index === 0) return;
    setCurrentDoctor(index - 1);
  };

  const handleNext = (index: number) => {
    if (index === dentists.length - 1) return;
    setCurrentDoctor(index + 1);
  };

  return (
    <div className='bg-bgtop pt-20 pb-10 flex flex-col justify-center items-center'>
      {loading ? (
        <div className="min-h-[80vh] flex items-center justify-center space-x-4 z-50">
          <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce"></div>
          <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      ) : (
        <>
          <div className='flex flex-col md:flex-row w-full px-4 md:px-24 py-12 md:py-24 justify-center items-center'>
            <div className='p-4 rounded-full bg-box1 flex items-center justify-center mr-10 cursor-pointer hover:bg-box2' onClick={() => handlePrev(currentDoctor)} >
              <Image src={leftArrow} alt='previous' className='w-[24px] h-[21px]' />
            </div>

            <div className='w-full md:w-1/2 mb-8 md:mb-0'>
              <h2 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] leading-[40px] font-semibold mb-5 md:mb-10 text-primary uppercase'>{dentists[currentDoctor]?.name}</h2>
              <p className='text-2xl md:text-3xl font-playfair font-bold text-toptext'>{dentists[currentDoctor]?.designation}</p>
              <p className='text-lg md:text-2xl leading-8 md:leading-10 font-nunito my-6 md:my-10 text-subtext'>{translatedDescriptions[currentDoctor]}</p>
              <button onClick={() => handleReadMoreClick(dentists[currentDoctor]?.slug)} className='mb-2 sm:px-8 px-6 py-3 sm:text-xl text-sm font-nunito transition-all duration-300 text-[#F7F6F3] bg-primary rounded-lg shadow-xl hover:bg-box2 hover:text-primary'>
                {translatedReadMore}
              </button>
            </div>
            <div className='w-full md:w-1/2 flex justify-center'>
              {dentists[currentDoctor]?.dentistImage && (
                <Image
                  src={`${dentists[currentDoctor].dentistImage.url}`}
                  alt={dentists[currentDoctor]?.name}
                  width={563}
                  height={740}
                  className='w-full max-w-md h-auto md:w-[563px] md:h-[740px] object-cover '
                />
              )}
            </div>
            <div className='p-4 rounded-full bg-box1 flex items-center justify-center cursor-pointer hover:bg-box2' onClick={() => handleNext(currentDoctor)} >
              <Image src={rightArrow} alt='next' className='w-[24px] h-[21px]' />
            </div>
          </div>
          <div className='!w-full px-4 md:px-10 mt-8 overflow-hidden'>
            <div
              className='flex transition-transform duration-500 ease-in-out'
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className='flex-shrink-0 w-full flex justify-center space-x-14'>
                  {dentists.slice(slideIndex * DOCTORS_PER_SLIDE, (slideIndex + 1) * DOCTORS_PER_SLIDE).map((dentist, index) => (
                    <div key={index} className='flex flex-col w-1/5 max-w-[120px]'>
                      <div
                        className={`w-36 aspect-square bg-[#d1cfd4] p-2 rounded-lg cursor-pointer transition-all duration-300 ${
                          (slideIndex * DOCTORS_PER_SLIDE) + index === currentDoctor
                            ? 'w-40 p-10 pt-5 -mt-5 -ml-3 !overflow-visible rounded-lg'
                            : 'hover:scale-105 '
                        }`}
                        onClick={() => handleDoctorClick((slideIndex * DOCTORS_PER_SLIDE) + index)}
                      >
                        {dentist.dentistImage && (
                          <Image
                            src={`${dentist.dentistImage.url}`}
                            alt={dentist.name}
                            width={120}
                            height={120}
                            className='w-full h-full object-cover rounded-lg'
                          />
                        )}
                      </div>
                      <p className={`mt-2 text-primary text-start text-lg font-playfair 
                      ${
                        (slideIndex * DOCTORS_PER_SLIDE) + index === currentDoctor
                          ? '!text-[22px]'
                          : ''
                      }
                      `}>{dentist.name}</p>
                      <p className={`text-[10px] text-start text-toptext font-nunito
                      ${
                        (slideIndex * DOCTORS_PER_SLIDE) + index === currentDoctor
                          ? 'text-[12px]'
                          : 'hover:scale-105'
                      }`}
                      >{dentist.designation}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className='w-full px-20 mt-6'>
            <div className='flex justify-center items-center space-x-4'>
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-primary' : 'bg-box2'}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OurTeam;
