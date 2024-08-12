import React, { useState } from 'react';
import { graphQLClient } from "../../lib/graphqlClient";
import { gql } from 'graphql-request';
import serviceImage from "../../assets/services-page-Image.png";
import blackWallpaper from "../../assets/services-wallpaper.png";
import qoutesTop from "../../assets/“.png";
import qoutesBottom from "../../assets/“ (1).png";
import Image from 'next/image';
import plus from "../../assets/plus.png";
import minus from "../../assets/minus.png";

interface Service {
  name: string;
  description: string;
  slug: string;
  subSection: { [key: string]: string[] };
}

interface ServiceResponse {
  ourServices: Service[];
}


interface ServiceProps {
  service: {
    name: string;
    description: string;
    slug: string;
    subSection: { [key: string]: string[] };
  };
  QnA: { [key: string]: string[] };
}

const Service: React.FC<ServiceProps> = ({ service, QnA }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const renderSection = (title: string, data: string[]) => (
    <div className="mb-4">
      <button
        className="w-full flex justify-between items-center p-4 rounded-lg border-none my-5"
        onClick={() => toggleSection(title)}
      >
        <span className='font-playfair text-6xl font-semibold text-primary uppercase'>{title}</span>
        <span className={`transition-transform duration-500 ${openSection === title ? 'rotate-180' : ''}`}>
          {openSection === title ? (
            <Image src={minus} alt='open' className='w-[56px]' />
          ) : (
            <Image src={plus} alt='collapse' className='w-[56px] h-[56px]' />
          )}
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ${openSection === title ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="my-10 p-4 rounded-lg">
          <ul className="list-disc pl-5">
            {data.map((text, idx) => (
              <li className='text-2xl font-nunito text-subtext leading-10 text-start mb-5 max-w-[1239px]' key={idx}>
                <span className="inline">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-toptext mt-4"></div>
    </div>
  );

  const toggleQuestion = (index: number) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <div>
      <div className='pb-20 px-24 bg-bgtop pt-40 flex items-center justify-around relative'>
        <div className='flex flex-col items-start'>
          <h3 className='text-[28px] text-toptext font-semibold font-playfair'>Our Services</h3>
          <h1 className='text-[56px] font-playfair font-semibold mb-5 text-primary uppercase'>{service.name}</h1>
          <p className='text-2xl font-nunito max-w-[590px] text-primary leading-10'>{service.description}</p>
        </div>
        <div>
          <Image src={serviceImage} alt='reviews' className='w-[584px] h-[380px] mt-10 bg-contain relative z-10' />
          <Image src={blackWallpaper} alt='wallpaper' className='absolute top-[140px] right-0 w-[646px] h-[356px] bg-contain' />
        </div>
      </div>
      <div className='py-20 px-24 bg-bgbottom flex items-center justify-center text-center'>
        <div className='relative'>
          <h2 className='font-nunito text-2xl leading-10 max-w-[1000px]'>
            I recently had teeth whitening done at Smile Loft Dental, and I am thrilled with the results! The staff was friendly and professional, and the office was clean and modern. Dr. Rai explained everything clearly and made me feel comfortable. The procedure was quick and painless, and my teeth look amazing. Highly recommend Smile Loft Dental for a brighter smile!
          </h2>
          <Image src={qoutesTop} alt='"' className='absolute -top-8 -left-28 h-[70px] w-[100px]' />
          <Image src={qoutesBottom} alt='"' className='absolute -bottom-8 -right-28 h-[70px] w-[100px]' />
        </div>
      </div>
      <div className='py-20 px-24 bg-bgtop'>
        {Object.entries(QnA).map(([title, data]) => renderSection(title, data))}
      </div>
      <div className='py-20 px-24 bg-bgtop'>
        <form className="w-full max-w-full bg-bgbottom p-10 rounded-lg font-nunito">
          <h2 className='text-center text-4xl uppercase font-playfair mb-10'>Book an Appointment</h2>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <input
                className="block w-full rounded-lg py-3 px-4 leading-tight input !focus:border-none focus:outline-none focus:ring-none"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <input
                className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <input
                className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="email"
                placeholder="Email Id"
              />
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <input
                className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Patient Type"
              />
            </div>
            <div className="w-full md:w-1/3 px-3">
              <input
                className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Treatment"
              />
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <select
                className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Insurance</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <select
                className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              >
                <option>Location</option>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3">
              <textarea
                className="appearance-none block w-full rounded-lg py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                rows={4}
                placeholder="Your message"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-wrap mb-6 -mx-3">
            <div className="w-full px-3 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded-lg text-gray-600 !focus:outline-none !focus:ring-none"
                />
                <span className="ml-2 text-gray-700">I acknowledge and accept the Terms of Use</span>
              </label>
            </div>
            <div className="w-full px-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded-lg text-gray-600 focus:outline-none focus:ring-none"
                />
                <span className="ml-2 text-gray-700">I want to subscribe for a newsletter</span>
              </label>
            </div>
          </div>
          <div className="flex justify-center">
            <button className='px-8 py-3 text-xl font-nunito text-[#F7F6F3] bg-primary rounded-lg shadow-xl w-[500px]'>
              REQUEST CALLBACK
            </button>
          </div>
        </form>
      </div>
    </div>
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
