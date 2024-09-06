// src/hooks/useFetch.js
import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url, token) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };
    if (token) {
      fetchData();
    }
  }, [url, token]);

  return { data, error };
};
