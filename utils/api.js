// /utils/api.js

export const handleRequest = async (url, options) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      window.location.href = '/login'; // If there's no token, redirect to login page
      return;
    }
  
    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...options?.headers,
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (res.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else {
        return await res.json();
      }
    } catch (error) {
      console.error('Request failed:', error);
    }
  };
  