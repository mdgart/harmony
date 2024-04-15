// utils/axiosWithAuth.ts
import axios from 'axios';
import { auth } from '@/auth';


// Singleton promise to store the session retrieval
let sessionPromise: Promise<any> | null = null;

function fetchSession() {
  if (!sessionPromise) {  // Only create a new promise if one doesn't already exist
    sessionPromise = auth();  // Fetch the session asynchronously
  }
  return sessionPromise;
}


const axiosWithAuth = axios.create({
  baseURL: process.env.HARMONY_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosWithAuth.interceptors.request.use(async (config) => {
    const session = await fetchSession();  // Wait for the session promise to resolve
    const token = session?.user?.accessToken;
  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  }, error => {
    return Promise.reject(error);
  });

export default axiosWithAuth;
