import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import axios from 'axios';
import { getDistance } from '@/utils/distanceFormula';

const cardData = [
    {
        imgSrc: 'https://res.cloudinary.com/dnl96eqgs/image/upload/v1723444340/ojamuogm4vd8vuuaixmm.jpg',
        alt: 'Image 1',
        text: "Smile Loft Affinity",
        subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
        lat: 19.24,
        lng: 72.98,
        
    },
    
    {
        imgSrc: 'https://res.cloudinary.com/dnl96eqgs/image/upload/v1723444340/ojamuogm4vd8vuuaixmm.jpg',
        alt: 'Image 2',
        text: "Smile Loft Affinity",
        subtext: "4 E Rolling Crossroads Suite 205, Catonsville, MD 21228",
        lat: -4,
        lng: -22,
    },
    
];

interface CardProps {
    imgSrc: string;
    alt: string;
    text: string;
    subtext: string;
    lng: number;
    lat: number;
}
interface CardComponetsProps {
    imgSrc: string;
    alt: string;
    text: string;
    subtext: string;
}

const CardComponent: React.FC<CardComponetsProps> = ({ imgSrc, alt, text, subtext }) => {
    return (
        <div className="p-4 rounded-lg shadow-lg bg-white">
            <div className="overflow-hidden">
                <Image src={imgSrc} alt={alt} width={460} height={460} className="w-full h-[420px] object-cover" />
            </div>
            <h2 className='text-3xl font-playfair text-primary my-4'>{text}</h2>
            <p className='max-w-[400px] font-nunito text-xl text-toptext font-semibold'>{subtext}</p>
        </div>
    );
};

const OUR_LOCATION_API_KEY = 'd255032a13634368a96f0d5a039b4d59'; 

const OurLocations = () => {
    const [location, setLocation] = useState<{lat: number, lng: number} | null>(null);
    const [error, setError] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [locationAllowed, setLocationAllowed] = useState<boolean>(false);


    const handleSuccess = (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
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

    useEffect(()=>{
        if(location){
            cardData.map((data)=>{
            const dis =  getDistance(location.lat, location.lng, data.lat, data.lng)
            console.log(dis);
            })
            
        }

        

    }, [location])

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
                    lat: lat,
                    lng: lng
                });
                console.log(lat);
                console.log(lng);
            } else {
                setError('No results found for the provided location.');
            }
        } catch (error) {
            setError('Error fetching location data.');
            console.error(error);
        }
    };


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError("")
        setZipCode(event.target.value);
    };

    // Handle search click
    const handleSearch = () => {
        if (zipCode.trim()) {
            fetchLocationFromZipCode(zipCode);
        } else {
            setError('Please enter a valid zip code or city.');
        }
    };

    return (
        <div className='md:py-20 md:px-24 bg-bgtop !pt-40 flex flex-col w-full !overflow-hidden'>
            <div className="relative w-full px-3 font-nunito mb-10">
                <input
                    type="text"
                    placeholder="City Zip Code"
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
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-3">
                {cardData.map((card, index) => (
                    <CardComponent 
                        key={index}
                        imgSrc={card.imgSrc}
                        alt={card.alt}
                        text={card.text}
                        subtext={card.subtext}
                    />
                ))}
            </div>
        </div>
    );
};

export default OurLocations;
