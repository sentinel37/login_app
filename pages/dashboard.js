import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const router = useRouter();

  useEffect(() => {
    // Get the token from localStorage
    const token = localStorage.getItem('token');
    
    // If no token, redirect to login
    if (!token) {
      router.push('/login');
    } else {
      // Decode the JWT token to get the user's email
      try {
        const decodedToken = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
        setUserEmail(decodedToken.email); // Assuming email is in the token payload
      } catch (error) {
        console.error('Invalid token', error);
        router.push('/login');
      }
    }
  }, [router]);

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem('token');
    // Redirect to login page
    router.push('/login');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {userEmail ? (
        <>
          <p>Welcome, {userEmail}!</p>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
