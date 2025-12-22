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
// 2. Add Interceptors
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle global errors
    if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        // Optional: Redirect to login page here or trigger an event
        // window.location.href = '/login'; 
    }
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
// 3b. Auth Service Types
export interface LoginResponse {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

// 4. The Service Object
export const HealthService = {
  check: async (): Promise<HealthResponse> => {
    try {
        const response: AxiosResponse<HealthResponse> = await apiClient.get('/health');
        return response.data; 
    } catch (_error) {
        console.warn("Backend not found, returning mock health data.");
        return { status: 'mock-ok', timestamp: new Date().toISOString(), version: '1.0.0-mock' };
    }
  },
};

export const AuthService = {
    login: async (_email: string, _password: string): Promise<LoginResponse> => {
        // NOTE: In a real app, this is a POST request.
        // For JSON Server mock, we often make a GET to the entity unless using custom middleware.
        // However, we mapped /api/auth/login -> /login in routes.json, which returns the object.
        // const response = await apiClient.post<LoginResponse>('/auth/login', { email, password });
        
        // Simulating the mock behavior (usually GET for json-server default or POST if using middleware)
        // We will assume the backend accepts GET for this specific mock setup to keep it simple without middleware
        const response = await apiClient.get<LoginResponse>('/auth/login');
        
        if (response.data.token) {
            localStorage.setItem('auth_token', response.data.token);
        }
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('auth_token');
        // Optional: call backend logout endpoint
    },
    isAuthenticated: () => {
        return !!localStorage.getItem('auth_token');
    },
    loginWithGoogle: async (): Promise<LoginResponse> => {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock success response
        const mockResponse: LoginResponse = {
            token: "mock-google-token-" + Math.random().toString(36).substring(7),
            user: {
                id: 999,
                name: "Google User",
                email: "google@example.com"
            }
        };
        
        localStorage.setItem('auth_token', mockResponse.token);
        return mockResponse;
    },
    getCurrentUser: async (): Promise<LoginResponse['user'] | null> => {
        // In a real app, this would verify token and fetch /me
        // For mock, we'll return a user if token exists
        const token = localStorage.getItem('auth_token');
        if (!token) return null;
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return {
            id: 1,
            name: "Admin User",
            email: "admin@example.com"
        };
    }
};

// 5. Workflow Service
export interface WorkflowResponse {
    status: string;
    message?: string;
}

export const WorkflowService = {
  trigger: async (slug: string, payload: Record<string, unknown> = {}): Promise<WorkflowResponse> => {
      const response = await apiClient.post<WorkflowResponse>('/workflows/trigger/', {
          slug,
          payload
      });
      return response.data;
  }
};

export default apiClient;
