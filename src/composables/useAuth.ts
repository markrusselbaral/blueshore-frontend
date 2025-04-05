// src/composables/useAuth.ts
import { ref } from 'vue';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export default function useAuth() {
  const user = ref<User | null>(null);
  const isAuthenticated = ref<boolean>(false);
  const isLoading = ref<boolean>(false);
  const error = ref<string | null>(null);

  // Check if user is already authenticated (you can check in localStorage or cookies)
  const checkAuth = () => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      isAuthenticated.value = true;
      // Fetch the user info if you have an endpoint to get the logged-in user details
      getUserInfo(token);
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post<AuthResponse>('http://localhost:8000/api/login', { email, password });
      localStorage.setItem('auth_token', response.data.token); // Store token in localStorage
      user.value = response.data.user;
      isAuthenticated.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed';
    } finally {
      isLoading.value = false;
    }
  };

  const register = async (name: string, email: string, password: string, c_password: string) => {
    isLoading.value = true;
    error.value = null;

    try {
      const response = await axios.post<AuthResponse>('http://localhost:8000/api/register', { name, email, password, c_password });
      localStorage.setItem('auth_token', response.data.token); // Store token in localStorage
      user.value = response.data.user;
      isAuthenticated.value = true;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Register failed';
    } finally {
      isLoading.value = false;
    }
  };

  // Get user info (if needed after login)
  const getUserInfo = async (token: string) => {
    try {
      const response = await axios.get<AuthResponse>('/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user.value = response.data.user;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Failed to fetch user info';
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('auth_token'); // Remove token from localStorage
    user.value = null;
    isAuthenticated.value = false;
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    checkAuth,
  };
}
