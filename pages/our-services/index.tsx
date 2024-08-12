import React, { useEffect, useState } from 'react';
import { graphQLClient } from "../../lib/graphqlClient";
import { gql } from 'graphql-request';

// Define TypeScript interfaces for the data structure
interface Service {
  name: string;
  description: string;
  slug: string;
  subSection: { [key: string]: string[] };
}

interface ServiceResponse {
  ourServices: Service[];
}

const Ourservices: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

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
                subSection
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

  console.log(services);

  return (
    <div className='h-[80vh] flex justify-center items-center'>
      {loading ? (
        <p className='font-nunito font-bold md:text-7xl text-4xl'>Loading...</p>
      ) : (
        <p className='font-nunito font-bold md:text-7xl text-4xl'>
          404 Not Found
        </p>
      )}
    </div>
  );
}

export default Ourservices;
