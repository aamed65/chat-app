import axios from 'axios';

export const getCsrfToken = async () => {
  try {
    const response = await axios.get('/api/csrf-token', { withCredentials: true });
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};
