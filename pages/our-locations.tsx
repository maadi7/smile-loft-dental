import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import axios from 'axios';
import { graphQLClient } from "../lib/graphqlClient";
import { gql } from 'graphql-request';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Link from 'next/link';
import useTranslation from '../hooks/useTranslation';
import Head from 'next/head';
import { blurHashToDataURL } from '@/utils/blurhash';

interface Location {
    locationName: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    distance?: number;
    locationImage: {
        url: string
    }
    blurHash: string;
    googleProfileLink: string
}

interface LocationResponse {
    locationDetails: Location[];
}

const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const R = 3958.8;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

const OUR_LOCATION_API_KEY = 'd255032a13634368a96f0d5a039b4d59';

const OurLocations: React.FC = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [locationAllowed, setLocationAllowed] = useState<boolean>(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { translate, language } = useTranslation();
    const [translatedText, setTranslatedText] = useState("miles away from you");

    useEffect(() => {
        const translateText = async () => {
          if (language === "en") {
            setTranslatedText("miles away from you");
            return;
          }
          const translated = await translate(translatedText);
          setTranslatedText(translated.text || translated);
        };
    
        translateText();
    }, [translate, language]);

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
                                googleProfileLink
                            }
                        }
                    `
                );

                if (response && response.locationDetails) {
                    setLocations(response.locationDetails);
                    setFilteredLocations(response.locationDetails);
                }
            } catch (error) {
                console.error("GraphQL Error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const handleSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        setLocation({
            lat: latitude,
            lng: longitude
        });
        setLocationAllowed(true);
    };

    const handleError = (error: GeolocationPositionError) => {
        if (error.message === "User denied Geolocation") {
            setLocationAllowed(false);
            return;
        }
        setError(`Geolocation error: ${error.message}`);
    };

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(handleSuccess, handleError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 0,
            });
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    useEffect(() => {
        if (location) {
            const updatedLocations = locations.map((loc) => {
                const distance = getDistance(location.lat, location.lng, loc.location.latitude, loc.location.longitude);
                return {
                    ...loc,
                    distance
                };
            });
            const sortedLocations = updatedLocations.sort((a, b) => (a.distance! - b.distance!));
            setFilteredLocations(sortedLocations);
        }
    }, [location, locations]);

    const fetchLocationFromZipCode = async (zipCode: string) => {
        try {
            const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json`, {
                params: {
                    q: zipCode,
                    key: OUR_LOCATION_API_KEY
                }
            });
            const results = response.data.results;
            if (results.length > 0) {
                const { lat, lng } = results[0].geometry;
                setLocation({
                    lat,
                    lng
                });
            } else {
                setError('No results found for the provided location.');
            }
        } catch (error) {
            setError('Error fetching location data.');
            console.error(error);
        }
    };
 
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("");
        const searchTerm = event.target.value.toLowerCase();
        setZipCode(searchTerm);

        // Filter locations based on locationName, address, or the entered search term
        const filtered = locations.filter(location =>
            location.locationName.toLowerCase().includes(searchTerm) ||
            location.address.toLowerCase().includes(searchTerm)
        );

        if (location) {
            const updatedLocations = filtered.map((loc) => {
                const distance = getDistance(location.lat, location.lng, loc.location.latitude, loc.location.longitude);
                return {
                    ...loc,
                    distance
                };
            });
            const sortedLocations = updatedLocations.sort((a, b) => (a.distance! - b.distance!));
            setFilteredLocations(sortedLocations);
        } else {
            setFilteredLocations(filtered);
        }
    };

    const handleSearch = () => {
        if (zipCode.trim()) {
            fetchLocationFromZipCode(zipCode);
        } else {
            setError('Please enter a valid zip code or city.');
        }
    };

    const baseUrl = 'https://smileloftdental.com';
    const pageUrl = `${baseUrl}/our-locations`;

    return (
        <>
            <Head>
                <title>Our Locations | Smile Loft Dental</title>
                <meta
                    name="description"
                    content="Find a Smile Loft Dental location near you. Our state-of-the-art dental clinics are conveniently located to serve your oral health needs."
                />
                <link rel="canonical" href={pageUrl} />
                <meta property="og:title" content="Our Locations | Smile Loft Dental" />
                <meta 
                    property="og:description" 
                    content="Find a Smile Loft Dental location near you. Our state-of-the-art dental clinics are conveniently located to serve your oral health needs."
                />
                <meta property="og:image" content="/assets/slider2.png" />
                <meta property="og:url" content={pageUrl} />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Our Locations | Smile Loft Dental" />
                <meta 
                    name="twitter:description" 
                    content="Find a Smile Loft Dental location near you. Our state-of-the-art dental clinics are conveniently located to serve your oral health needs."
                />
                <meta name="twitter:image" content="/assets/slider2.png" />
            </Head>
            <div className='lg:py-20 lg:px-24 pb-10 bg-bgtop !pt-40 flex flex-col w-full !overflow-hidden'>
                <div className="relative w-full px-3 font-nunito mb-10">
                    <input
                        type="text"
                        placeholder="Search by location name, address, or zipcode"
                        value={zipCode}
                        onChange={handleInputChange}
                        className="w-full rounded-lg py-3 px-4 pl-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    />
                    <SearchIcon 
                        className="absolute top-3 right-6 text-gray-500 cursor-pointer"
                        style={{ fontSize: 24 }} 
                        onClick={handleSearch}
                    />
                </div>
                {filteredLocations.length === 0 && !loading && !error && (
                    <p className="text-gray-500 mb-4">No matches found.</p>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-3">
                    {filteredLocations.map((location, index) => (
                        <Link
                            key={index}
                            href={location.googleProfileLink}
                            passHref
                            target='_blank'
                        >
                            <div className="p-4 rounded-lg">
                                <div className="overflow-hidden">
                                    <Image 
                                        src={location.locationImage.url}
                                        placeholder='blur'
                                        blurDataURL={blurHashToDataURL(location.blurHash)} 
                                        alt={location.locationName} 
                                        width={460} 
                                        height={460} 
                                        className="h-[420px] w-[460px] object-cover rounded-lg" 
                                    />
                                </div>
                                <h2 className='text-3xl font-playfair text-primary my-4'>{location.locationName}</h2>
                                <p className='max-w-[400px] font-nunito text-xl text-toptext font-semibold'>{location.address}</p>
                                <div className="flex justify-between items-center mt-2">
                                    {location.distance !== undefined && (
                                        <div className='font-nunito text-lg text-[#000] mt-2 flex items-center gap-x-1 justify-center'>
                                            <span className=''>
                                                <LocationOnIcon/> {location.distance.toFixed(2)}
                                            </span> 
                                            {translatedText}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default OurLocations;