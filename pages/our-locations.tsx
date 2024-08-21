import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Image from 'next/image';
import axios from 'axios';
import { getDistance } from '@/utils/distanceFormula';
import { graphQLClient } from "../lib/graphqlClient";
import { gql } from 'graphql-request';

interface Location {
    locationName: string;
    address: string;
    location: {
        latitude: number;
        longitude: number;
    };
    distance?: number; // Optional field to store calculated distance
}

interface LocationResponse {
    locationDetails: Location[];
}

const CardComponent: React.FC<Location> = ({ locationName, address, location }) => {
    return (
        <div className="p-4 rounded-lg">
            <div className="overflow-hidden">
                <Image src="https://res.cloudinary.com/dnl96eqgs/image/upload/v1723444340/ojamuogm4vd8vuuaixmm.jpg" alt={locationName} width={460} height={460} className="w-full h-[460px] object-cover" />
            </div>
            <h2 className='text-3xl font-playfair text-primary my-4'>{locationName}</h2>
            <p className='max-w-[400px] font-nunito text-xl text-toptext font-semibold'>{address}</p>
        </div>
    );
};

const OUR_LOCATION_API_KEY = 'd255032a13634368a96f0d5a039b4d59'; 

const OurLocations = () => {
    const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
    const [error, setError] = useState<string>('');
    const [zipCode, setZipCode] = useState<string>('');
    const [locationAllowed, setLocationAllowed] = useState<boolean>(false);
    const [locations, setLocations] = useState<Location[]>([]);
    const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

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
                            }
                        }
                    `
                );

                if (response && response.locationDetails) {
                    setLocations(response.locationDetails);
                    setFilteredLocations(response.locationDetails); // Initialize filtered locations
                    console.log(response.locationDetails);
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

            // Sort locations by distance (ascending)
            const sortedLocations = updatedLocations.sort((a, b) => (a.distance! - b.distance!));

            // Only update the state if the sorted locations are different
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
        setZipCode(event.target.value);

        // Filter locations based on the entered zip code
        const filtered = locations.filter(location =>
            location.address.includes(event.target.value)
        );
        setFilteredLocations(filtered);
    };

    const handleSearch = () => {
        if (zipCode.trim()) {
            fetchLocationFromZipCode(zipCode);
        } else {
            setError('Please enter a valid zip code or city.');
        }
    };

    return (
        <div className='lg:py-20 lg:px-24 bg-bgtop !pt-40 flex flex-col w-full !overflow-hidden'>
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
            {filteredLocations.length === 0 && !loading && !error && (
            <p className="text-gray-500 mb-4">No matches found.</p>
        )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-3">
                {filteredLocations.map((location, index) => (
                    <CardComponent 
                        key={index}
                        locationName={location.locationName}
                        address={location.address}
                        location={location.location}
                    />
                ))}
            </div>
        </div>
    );
};

export default OurLocations;
