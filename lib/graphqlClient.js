// lib/graphqlClient.js
import { GraphQLClient } from 'graphql-request';
import { api_content_endpoint } from '../constants';
const token = process.env.HYGRAPH_API_TOKEN || 'dd';
// console.log(token)

export const graphQLClient = new GraphQLClient(api_content_endpoint);