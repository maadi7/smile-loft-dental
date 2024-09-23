import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import plus from "../assets/plus.png";
import minus from "../assets/minus.png";
import { graphQLClient } from "@/lib/graphqlClient";
import { gql } from 'graphql-request';
import LocationIcon from "../assets/location.png"
import useTranslation from '@/hooks/useTranslation';
import Head from 'next/head';

interface BenefitsAndPerks {
    [key: string]: string;
}

interface JobListing {
    jobDomain: string;
    jobTitle: string;
    jobLocation: string;
    profileResponsibilities: string;
    teamandCulture: string;
    benefitsAndPerks: BenefitsAndPerks;
    contact: string;
    remark: string;
}

interface AllJobs {
    jobListings: JobListing[];
}

const Careers = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [allJobs, setAllJobs] = useState<JobListing[]>([]);
    const [translatedJobs, setTranslatedJobs] = useState<JobListing[]>([]);
    const [openSections, setOpenSections] = useState<Set<string>>(new Set());
    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
    const [translatedHeader, setTranslatedHeader] = useState<string>("Join the Smile Loft Dental Family");
    const [translatedParagraph, setTranslatedParagraph] = useState<string>("At Smile Loft Dental, we’re more than just a dental practice. We’re a team of dedicated professionals driven by a shared passion for patient care, innovation, and a positive work culture. Our mission is to create beautiful, healthy smiles while fostering an environment that’s supportive, inclusive, and fun. Whether you’re a dental professional, administrative expert, or someone starting your journey in healthcare, Smile Loft is the place to grow, learn, and make a meaningful impact.");
    const { translate, language } = useTranslation();

    useEffect(() => {
        const fetchAllJobs = async () => {
            try {
                const response = await graphQLClient.request<AllJobs>(
                    gql`
                        query MyQuery {
                            jobListings {
                                jobDomain
                                benefitsAndPerks
                                jobTitle
                                jobLocation
                                profileResponsibilities
                                teamandCulture
                                contact
                                remark
                            }
                        }
                    `
                );

                if (response && response.jobListings) {
                    setAllJobs(response.jobListings);
                }
            } catch (error) {
                console.error("GraphQL Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllJobs();
    }, []);

    useEffect(() => {
        const translateContent = async () => {
            if (language === 'en') {
                setTranslatedJobs(allJobs);
                setTranslatedHeader("Join the Smile Loft Dental Family");
                setTranslatedParagraph("At Smile Loft Dental, we’re more than just a dental practice. We’re a team of dedicated professionals driven by a shared passion for patient care, innovation, and a positive work culture. Our mission is to create beautiful, healthy smiles while fostering an environment that’s supportive, inclusive, and fun. Whether you’re a dental professional, administrative expert, or someone starting your journey in healthcare, Smile Loft is the place to grow, learn, and make a meaningful impact.");
            } else {
                const safeTranslate = async (text: string) => {
                    try {
                        const result = await translate(text);
                        return result?.text || text;
                    } catch (error) {
                        console.error('Translation error:', error);
                        return text;
                    }
                };

                const translatedJobListings = await Promise.all(
                    allJobs.map(async (job) => {
                        const translatedJob: JobListing = {
                            jobDomain: await safeTranslate(job.jobDomain || ''),
                            jobTitle: await safeTranslate(job.jobTitle || ''),
                            jobLocation: await safeTranslate(job.jobLocation || ''),
                            profileResponsibilities: await safeTranslate(job.profileResponsibilities || ''),
                            teamandCulture: await safeTranslate(job.teamandCulture || ''),
                            benefitsAndPerks: {},
                            contact: await safeTranslate(job.contact || ''),
                            remark: await safeTranslate(job.remark || ''),
                        };

                        if (job.benefitsAndPerks) {
                            for (const [key, value] of Object.entries(job.benefitsAndPerks)) {
                                translatedJob.benefitsAndPerks[key] = await safeTranslate(value || '');
                            }
                        }

                        return translatedJob;
                    })
                );

                setTranslatedJobs(translatedJobListings);

                setTranslatedHeader(await safeTranslate("Join the Smile Loft Dental Family"));
                setTranslatedParagraph(await safeTranslate("At Smile Loft Dental, we’re more than just a dental practice. We’re a team of dedicated professionals driven by a shared passion for patient care, innovation, and a positive work culture. Our mission is to create beautiful, healthy smiles while fostering an environment that’s supportive, inclusive, and fun. Whether you’re a dental professional, administrative expert, or someone starting your journey in healthcare, Smile Loft is the place to grow, learn, and make a meaningful impact."));
            }
        };

        translateContent();
    }, [allJobs, translate, language]);

    const toggleSection = (jobTitle: string) => {
        setOpenSections(prev => {
            const newOpenSections = new Set(prev);
            if (newOpenSections.has(jobTitle)) {
                newOpenSections.delete(jobTitle);
            } else {
                newOpenSections.add(jobTitle);
            }
            return newOpenSections;
        });
    };

    const handleDomainSelection = (domain: string) => {
        setSelectedDomains(prevSelected => 
            prevSelected.includes(domain)
                ? prevSelected.filter(d => d !== domain)
                : [...prevSelected, domain]
        );
    };

    const handleViewAll = () => {
        setSelectedDomains([]);
    };

    const renderBenefitsAndPerks = (benefitsAndPerks: BenefitsAndPerks) => {
        return (
            <ul className="list-none md:pl-56 pl-0 mt-4">
                {benefitsAndPerks && Object.entries(benefitsAndPerks).map(([key, benefit]) => (
                    <li key={key} className="flex items-center md:mb-2 mb-1">
                        <span className="mr-2 mt-1 text-primary">•</span>
                        <span>{benefit}</span>
                    </li>
                ))}
            </ul>
        );
    };

    const renderSection = (job: JobListing) => (
        <div className="mb-4 w-full h-full" key={job.jobTitle}>
            <button
                className="w-full flex justify-between items-center p-2 sm:p-4 rounded-lg border-none my-3 sm:my-5"
                onClick={() => toggleSection(job.jobTitle)}
            >
                <span className='font-playfair text-2xl text-start sm:text-4xl md:text-5xl lg:text-[50px] font-semibold text-primary uppercase'>
                    {job.jobTitle}
                </span>
                <span className={`transition-transform duration-500 ${openSections.has(job.jobTitle) ? 'rotate-180' : ''}`}>
                    {openSections.has(job.jobTitle) ? (
                        <Image src={minus} alt='open' className='w-[28px] sm:w-[40px] md:w-[48px] lg:w-[50px]' />
                    ) : (
                        <Image src={plus} alt='collapse' className='w-[28px] sm:w-[40px] md:w-[48px] lg:w-[50px]' />
                    )}
                </span>
            </button>
            {openSections.has(job.jobTitle) && (
                <div className="my-0 sm:my-10 p-2 sm:p-4 rounded-lg font-nunito font-semibold text-primary md:text-2xl text-lg md:space-y-14 space-y-7">
                    <div className="mb-4  text-toptext ">
                        <div className='flex items-start' >
                        <Image src={LocationIcon} className='md:w-7 md:h-7 w-6 h-6 mr-1' alt='locpin'  />
                        <p className='' >
                        {job.jobLocation}
                        </p>
                        </div>
                      <p className='ml-2 md:text-lg text-sm' >{job.jobDomain}</p>
                    </div>
                    

                    <h3 className='font-bold' >{job.remark}</h3>

                    <div>
                        <p className='md:leading-10' >
                        <span className='font-bold ' >Profile Responsibilities - </span>
                        {job.profileResponsibilities}
                        </p>
                    </div>

                    <div>
                    <p className=''>
                    <span className="font-bold">Benefits and Perks - </span> Smile Loft Dental offers:
                    {renderBenefitsAndPerks(job.benefitsAndPerks)}
                    </p>
                    </div>

                    <div>
                        <p className='md:leading-10  max-w-[1280px]' >
                        <span className='font-bold' >Team-Building and Culture - </span>
                        {job.teamandCulture}
                        </p>
                    </div>

                    <div>
                        <p className='md:leading-10  max-w-[1280px]' >
                        <span className='font-bold' >Contact - </span>
                        {job.contact}
                        </p>
                    </div>
                </div>
            )}
            <div className="border-t border-toptext mt-2 sm:mt-4"></div>
        </div>
    );

    const renderJobSelection = () => (
        <div className="font-nunito font-semibold md:text-[22px] text-[16px] max-w-[1100px] capitalize">
            <div className="flex flex-wrap md:gap-6 gap-4 mb-4">
                <button
                    onClick={handleViewAll}
                    className={`px-4 py-1 rounded-lg transition-colors duration-300 border border-primary ${
                        selectedDomains.length === 0
                            ? 'bg-primary text-white'
                            : ''
                    }`}
                >
                    View All
                </button>
                {Array.from(new Set(translatedJobs.map(job => job.jobDomain))).map((domain) => (
                    <button
                        key={domain}
                        onClick={() => handleDomainSelection(domain)}
                        className={`px-4 py-1 rounded-lg transition-colors capitalize duration-300 border border-primary ${
                            selectedDomains.includes(domain)
                                ? 'bg-primary text-white'
                                : ''
                        }`}
                    >
                        {domain}
                    </button>
                ))}
            </div>
        </div>
    );

    const pageUrl = `https://smileloft.com/careers`;

    return (
        <>
            <Head>
                <title>Careers | Smile Loft Dental</title>
                <meta
                    name="description"
                    content="Join our team at Smile Loft Dental. We're looking for passionate professionals to help us create beautiful smiles and provide exceptional dental care."
                />
                <link rel="canonical" href={pageUrl} />
                
                {/* OG Tags */}
                <meta property="og:title" content="Careers | Smile Loft Dental" />
                <meta 
                    property="og:description" 
                    content="Join our team at Smile Loft Dental. We're looking for passionate professionals to help us create beautiful smiles and provide exceptional dental care."
                />
                <meta property="og:image" content="/assets/careers.png" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                
                {/* Twitter Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Careers | Smile Loft Dental" />
                <meta 
                    name="twitter:description" 
                    content="Join our team at Smile Loft Dental. We're looking for passionate professionals to help us create beautiful smiles and provide exceptional dental care."
                />
                <meta name="twitter:image" content="/assets/careers.png" />
            </Head>
            <div className='bg-bgtop pb-10 px-4 2xl:px-24 pt-40'>
                {loading ? (
                    <div className="min-h-[80vh] flex items-center justify-center space-x-4 z-50">
                        <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce"></div>
                        <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-5 h-5 bg-[#b2b1b1] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                ) : (
                    <div className='flex flex-col w-full justify-start items-start'>
                        <h2 className='text-3xl text-[40px] sm:text-[56px] lg:text-[56px] font-playfair md:leading-[50px] leading-[40px] font-semibold mb-5 md:mb-10 text-primary uppercase'>
                            {translatedHeader}
                        </h2>
                        <p className='text-lg md:text-2xl leading-8 md:leading-10 font-nunito text-subtext mb-8'>
                            {translatedParagraph}
                        </p>
                        {renderJobSelection()}
                        <div className='bg-bgtop pb-10 md:pt-20 sm:pt-10 pt-5 w-full'>
                            {(selectedDomains.length === 0 
                                ? translatedJobs 
                                : translatedJobs.filter(job => selectedDomains.includes(job.jobDomain)))
                                .map(job => renderSection(job))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Careers;