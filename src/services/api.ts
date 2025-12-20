import axios, { type AxiosInstance, type AxiosResponse } from 'axios';

// 1. Create the Axios instance
// This is your single point of configuration for all backend requests.
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add Interceptors (Optional but recommended)
// Useful for attaching Auth tokens or logging errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors (e.g., 401 Unauthorized -> Redirect to login)
    console.error('API Error:', error.response || error.message);
    return Promise.reject(error);
  }
);

// 3. Define the Health Check response type
export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

// 4. The Service Object
export const HealthService = {
  check: async (): Promise<HealthResponse> => {
    // If we are mocking, request our local mock file or use a timeout to simulate
    // For now, we assume a real endpoint or handle 404 gracefully in the UI
    try {
        const response: AxiosResponse<HealthResponse> = await apiClient.get('/health');
        return response.data; 
    } catch (error) {
        // Fallback for demo purposes if backend isn't running yet
        console.warn("Backend not found, returning mock health data.");
        return { status: 'mock-ok', timestamp: new Date().toISOString(), version: '1.0.0-mock' };
    }
  },
};

export default apiClient;
