
import axios from 'axios';

export const fetchCsrfToken = async () => {
  try {
    const response = await axios.patch('https://chatify-api.up.railway.app/csrf', {}, {
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error; 
  }
};
