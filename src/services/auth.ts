import api from './api'

export interface User {
  id: number
  name: string
  email: string
}

export interface AuthResponse {
  token: string
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  try {

    const response = await api.post('/users/login', { 
      user_name: email, 
      user_password: password 
    });
    
    if (!response.data.token && response.data.data && response.data.data.token) {
      response.data.token = response.data.data.token;
    }
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
    } else if (error.request) {
      console.error('No response received, request was:', error.request);
    }
    throw error;
  }
}

export async function register(email: string, password: string): Promise<AuthResponse> {
  try {
    const response = await api.post('/users/register', { 
      user_name: email, 
      user_password: password 
    });
    
    if (!response.data.token && response.data.data && response.data.data.token) {
      response.data.token = response.data.data.token;
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Register request failed:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
    throw error;
  }
}