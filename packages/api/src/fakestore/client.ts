import axios from 'axios';

export const fakestoreClient = axios.create({
  baseURL: 'https://fakestoreapi.com',
});
