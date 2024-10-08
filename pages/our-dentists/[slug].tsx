import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { blurHashToDataURL } from '@/utils/blurhash';
import { graphQLClient } from "../../lib/graphqlClient";
import BlackWallpaper from "../../assets/black-wallpaper.png";
import { gql } from 'graphql-request';
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';
import CustomLink from '@/utils/customLink';

interface Dentist {
  name: string;
  designation: string;
  video: { url: string };
  videoDescription: string;
  imageDescription: string;
  dentistImage: { url: string };
  slug: string;
  videoText: { raw: any };
  videoJson: { [key: string]: string };
  imageText: { [key: string]: string };
  blurHash: string;
}

interface DentistProps {
  dentist: Dentist;
}

const Dentists: React.FC<DentistProps> = ({ dentist }) => {
  const [translatedVideoDescription, setTranslatedVideoDescription] = useState(dentist.videoDescription);
  const [translatedImageDescription, setTranslatedImageDescription] = useState(dentist.imageDescription);
  const [translatedVideoJson, setTranslatedVideoJson] = useState(dentist.videoJson);
  const [translatedImageText, setTranslatedImageText] = useState(dentist.imageText);
  const [translatedHeading, setTranslatedHeading] = useState('Beyond the White Coat');
  const { translate, language } = useTranslation();

  useEffect(() => {
    const translateContent = async () => {
      if (language !== 'en') {
        const videoDescTranslation = await translate(dentist.videoDescription);
        const imageDescTranslation = await translate(dentist.imageDescription);
        const headingTranslation = await translate('Beyond the White Coat');

        const videoJsonTranslation = await Promise.all(
          Object.values(dentist.videoJson).map(async (text: string) => {
            const translatedText = await translate(text);
            return translatedText.text || text;
          })
        );

        const imageTextTranslation = await Promise.all(
          Object.values(dentist.imageText).map(async (text: string) => {
            const translatedText = await translate(text);
            return translatedText.text || text;
          })
        );

        const translatedVideoJson: { [key: string]: string } = {};
        Object.keys(dentist.videoJson).forEach((key, index) => {
          translatedVideoJson[key] = videoJsonTranslation[index];
        });

        const translatedImageText: { [key: string]: string } = {};
        Object.keys(dentist.imageText).forEach((key, index) => {
          translatedImageText[key] = imageTextTranslation[index];
        });

        setTranslatedVideoDescription(videoDescTranslation.text || dentist.videoDescription);
        setTranslatedImageDescription(imageDescTranslation.text || dentist.imageDescription);
        setTranslatedHeading(headingTranslation.text || 'Beyond the White Coat');
        setTranslatedVideoJson(translatedVideoJson);
        setTranslatedImageText(translatedImageText);
      } else {
        setTranslatedVideoDescription(dentist.videoDescription);
        setTranslatedImageDescription(dentist.imageDescription);
        setTranslatedHeading('Beyond the White Coat');
        setTranslatedVideoJson(dentist.videoJson);
        setTranslatedImageText(dentist.imageText);
      }
    };

    translateContent();
  }, [dentist, translate, language]);

  const baseUrl = 'https://smileloftdental.com';
  const pageUrl = `${baseUrl}/our-dentists/${dentist.slug}`;

  return (
    <>
    <Head>
  <title>{`Meet ${dentist.name} | Smile Loft Dental`}</title>
  <meta
    name="description"
    content={`Meet ${dentist.name}, ${dentist.designation}, at Smile Loft Dental. Discover their journey and commitment to providing exceptional dental care.`}
  />
  <link rel="canonical" href={pageUrl} />
  
  {/* OG Tags */}
  <meta property="og:title" content={`Meet ${dentist.name} | Smile Loft Dental`} />
  <meta 
    property="og:description" 
    content={`Meet ${dentist.name}, ${dentist.designation}, at Smile Loft Dental. Discover their journey and commitment to providing exceptional dental care.`}
  />
  <meta property="og:image" content={dentist.dentistImage.url || "/assets/TestimonialDentist.png"} />
  <meta property="og:url" content={pageUrl} />
  <meta property="og:type" content="website" />
  
  {/* Twitter Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={`Meet ${dentist.name} | Smile Loft Dental`} />
  <meta 
    name="twitter:description" 
    content={`Meet ${dentist.name}, ${dentist.designation}, at Smile Loft Dental. Discover their journey and commitment to providing exceptional dental care.`}
  />
  <meta name="twitter:image" content={dentist.dentistImage.url || "/assets/TestimonialDentist.png"} />
</Head>
{/* <div className='pt-32 bg-bgtop xl:px-24 px-4' >
<CustomLink
  items={[
    { href: '/', label: 'Home' },
    { href: '/our-dentists', label: 'Meet the Dentists' },
    { href: `/our-dentists/${dentist.slug}`, label: `${dentist.name}` }
  ]}
/>
  </div> */}

    <div className='bg-bgtop pt-40 pb-10 flex flex-col justify-center'>
      <div className='xl:px-24 px-4'>
        <h2 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] leading-[40px] font-semibold mb-5  text-primary uppercase'>
          {dentist.name}
        </h2>
        <p className='text-2xl md:text-3xl font-playfair font-semibold text-toptext md:mb-10 mb-5'>
          {dentist.designation}
        </p>

        <video controls
          // autoPlay={true}
          muted={false}
          className="w-full h-full object-cover"
        >
          <source src={dentist.video.url} type="video/mp4" />
        </video>
        {/* <video width="100%" controls>
        <source src="/path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video> */}

        <div className='text-lg md:text-2xl leading-8 md:leading-10 font-nunito my-6 md:my-10 text-subtext'>
          {Object.values(translatedVideoJson).map((text, index) => (
            <div key={index} className="my-6">
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className='md:mt-20 flex flex-col lg:flex-row h-full w-full py-4 md:py-24 items-center justify-between relative px-4  xl:px-24'>
        <div className='absolute w-full h-[300px] md:w-[481px] md:h-[680px] top-0 left-0 hidden md:block'>
          <Image src={BlackWallpaper} alt='Dentist Image' layout='fill' objectFit='cover' />
        </div>
        <div className='relative mb-8 lg:mb-0'>
          <Image
            src={dentist.dentistImage.url}
            alt={translatedImageDescription}
            className='w-full h-auto md:w-[543px] md:h-[690px] bg-cover rounded-lg'
            placeholder='blur'
            blurDataURL={blurHashToDataURL(dentist.blurHash)}
            width={543}
            height={690}
          />
        </div>
        <div className='flex flex-col items-start justify-start lg:max-w-[50%] lg:ml-10 ml-0 md:mt-20'>
          <h1 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] sm:leading-[44px] leading-[40px] font-semibold mb-5 md:mb-10 text-primary uppercase '>
            {translatedHeading}
          </h1>
          <p className='text-lg md:text-2xl font-nunito lg:max-w-[600px] text-primary mb-5 md:mb-10 leading-8 md:leading-10'>
            {Object.values(translatedImageText).map((text, index) => (
              <div key={index} className="my-6">
                {text}
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Dentists;

export async function getServerSideProps({ params }: { params: any }) {
  const GET_DENTIST_QUERY = gql`
    query GetDentist($slug: String!) {
      dentist(where: { slug: $slug }) {
        name
        designation
        video {
          url
        }
        videoDescription
        imageDescription
        dentistImage {
          url
        }
        videoJson
        slug
        imageText
        blurHash
      }
    }
  `;

  try {
    const dentistResponse = await graphQLClient.request<{ dentist: Dentist }>(
      GET_DENTIST_QUERY,
      {
        slug: params.slug,
      }
    );

    if (!dentistResponse || !dentistResponse.dentist) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        dentist: dentistResponse.dentist,
      },
    };
  } catch (error) {
    console.error("Error fetching dentist data:", error);
    return {
      notFound: true,
    };
  }
}
