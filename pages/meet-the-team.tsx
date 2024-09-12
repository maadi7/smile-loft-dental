import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import image from "../assets/dentist.png";
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';

interface TeamMember {
    name: string;
    employeeImage: {
        url: string;
    };
    designation: string;
}

interface TeamSection {
    teamName: string;
    member: TeamMember[];
}

interface TeamListings {
    teamListings: TeamSection[];
}

const Team = () => {
    const [openSection, setOpenSection] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [teamSections, setTeamSections] = useState<TeamSection[]>([]);
    const [translatedTeamSections, setTranslatedTeamSections] = useState<TeamSection[]>([]);
    const [translatedHeader, setTranslatedHeader] = useState<string>("Meet the Smile Loft Team");
    const [translatedParagraph, setTranslatedParagraph] = useState<string>("At Smile Loft, we believe that every smile tells a story, and our team is dedicated to making sure yours shines its brightest. Each member of our team brings passion, expertise, and a personal touch to ensure your dental experience is comfortable, friendly, and—most importantly—fun!");
    const { translate, language } = useTranslation();

    const toggleSection = (section: string) => {
        setOpenSection(openSection === section ? null : section);
    };

    useEffect(() => {
        const fetchAllDepartments = async () => {
            try {
                const response = await graphQLClient.request<TeamListings>(
                    gql`
                        query MyQuery {
                            teamListings {
                                teamName
                                member {
                                    designation
                                    employeeImage {
                                        url
                                    }
                                    name
                                }
                            }
                        }
                    `
                );

                if (response && response.teamListings) {
                    setTeamSections(response.teamListings);
                }
            } catch (error) {
                console.error("GraphQL Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllDepartments();
    }, []);

    useEffect(() => {
        const translateContent = async () => {
            if (language === 'en') {
                setTranslatedTeamSections(teamSections);
                setTranslatedHeader("Meet the Smile Loft Team");
                setTranslatedParagraph("At Smile Loft, we believe that every smile tells a story, and our team is dedicated to making sure yours shines its brightest. Each member of our team brings passion, expertise, and a personal touch to ensure your dental experience is comfortable, friendly, and—most importantly—fun!");
            } else {
                const translatedSections = await Promise.all(
                    teamSections.map(async (section) => {
                        const translatedTeamName = await translate(section.teamName);
                        return {
                            ...section,
                            teamName: translatedTeamName.text || section.teamName,
                        };
                    })
                );
                setTranslatedTeamSections(translatedSections);

                const headerTranslation = await translate("Meet the Smile Loft Team");
                setTranslatedHeader(headerTranslation.text || "Meet the Smile Loft Team");

                const paragraphTranslation = await translate("At Smile Loft, we believe that every smile tells a story, and our team is dedicated to making sure yours shines its brightest. Each member of our team brings passion, expertise, and a personal touch to ensure your dental experience is comfortable, friendly, and—most importantly—fun!");
                setTranslatedParagraph(paragraphTranslation.text || "At Smile Loft, we believe that every smile tells a story, and our team is dedicated to making sure yours shines its brightest. Each member of our team brings passion, expertise, and a personal touch to ensure your dental experience is comfortable, friendly, and—most importantly—fun!");
            }
        };

        translateContent();
    }, [teamSections, translate, language]);

    const renderSection = (section: TeamSection) => (
        <div className="mb-4 w-full" key={section.teamName}>
            <button
                className="w-full flex justify-between items-center p-2 sm:p-4 rounded-lg border-none my-3 sm:my-5"
                onClick={() => toggleSection(section.teamName)}
            >
                <span className='font-playfair text-2xl text-start sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-primary uppercase'>
                    {section.teamName}
                </span>
                <span className={`transition-transform duration-500 ${openSection === section.teamName ? 'rotate-180' : ''}`}>
                    {openSection === section.teamName ? (
                        <Image src={minus} alt='open' className='w-[28px] sm:w-[40px] md:w-[48px] lg:w-[56px]' />
                    ) : (
                        <Image src={plus} alt='collapse' className='w-[28px] sm:w-[40px] md:w-[48px] lg:w-[56px]' />
                    )}
                </span>
            </button>
            <div
                className={`overflow-hidden transition-all duration-500 ${openSection === section.teamName ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="my-0 sm:my-10 p-2 sm:p-4 rounded-lg">
                    <ul className="list-none flex flex-wrap md:space-x-12 space-x-6">
                        {section.member.map((member, idx) => (
                            <li className='flex flex-col  transition-all duration-300 items-start mb-5 w-24 sm:w-32 md:w-[180px] md:h-[200px] rounded-lg cursor-pointer hover:scale-105' key={idx}>
                                <Image 
                                    src={member.employeeImage.url} 
                                    alt={member.name} 
                                    width={180}  
                                    height={200}  
                                    className='w-full h-auto rounded-lg'  
                                    quality={100}  
                                />
                                <div>
                                    <p className='mt-2 text-primary !pl-0 text-start text-xs sm:text-sm md:text-[20px] md:leading-6 font-playfair md:!min-w-[150px]'>{member.name}</p>
                                    <p className='text-[10px] sm:text-[12px] md:text-[14px] text-start text-toptext font-playfair mt-1'>{member.designation}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="border-t border-toptext mt-2 sm:mt-4"></div>
        </div>
    );
    const pageUrl = `https://smileloft.com/meet-our-team`; 
    return (
        <>
        <Head>
            <title>Meet Our Team | Smile Loft Dental</title>
            <meta
                name="description"
                content="Get to know the dedicated professionals at Smile Loft Dental. Our team of experienced dentists and staff are committed to providing you with the best dental care."
            />
            <link rel="canonical" href={pageUrl} />
            
            {/* OG Tags */}
            <meta property="og:title" content="Meet Our Team | Smile Loft Dental" />
            <meta 
                property="og:description" 
                content="Get to know the dedicated professionals at Smile Loft Dental. Our team of experienced dentists and staff are committed to providing you with the best dental care."
            />
            <meta property="og:image" content="/assets/dentist.png" />
            <meta property="og:url" content={pageUrl} />
            <meta property="og:type" content="website" />
            
            {/* Twitter Tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Meet Our Team | Smile Loft Dental" />
            <meta 
                name="twitter:description" 
                content="Get to know the dedicated professionals at Smile Loft Dental. Our team of experienced dentists and staff are committed to providing you with the best dental care."
            />
            <meta name="twitter:image" content="/assets/dentist.png" />
        </Head>
        <div className='bg-bgtop pb-10 px-4 2xl:px-24 pt-40 '>
            {loading ? (
                <div className="min-h-[80vh] flex items-center justify-center space-x-4 z-50">
                    <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce"></div>
                    <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
            ) : (
                <>
                    <div className='flex flex-col w-full justify-start items-start'>
                        <h2 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] leading-[40px] font-semibold mb-5 md:mb-10 text-primary uppercase'>
                            {translatedHeader}
                        </h2>
                        <p className='text-lg md:text-2xl leading-8 md:leading-10 font-nunito text-subtext'>
                            {translatedParagraph}
                        </p>
                        <div className='md:mt-10 mt-5'>
                            <Image src={image} alt='our-team ' />
                        </div>
                    </div>
                    <div className='bg-bgtop pb-10 md:pt-20 sm:pt-10 pt-5'>
                        {translatedTeamSections.map(section => renderSection(section))}
                    </div>
                </>
            )}
        </div>
    </>
    );
};

export default Team;