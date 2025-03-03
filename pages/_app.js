// import '../../styles/globals.css';  //Import global CSS if you have it
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Example: Global setup, if any (like analytics, or other side-effects)
  }, []);

  return (
    <Component {...pageProps} />  // Renders the current page (e.g., login, register, index)
  );
}

export default MyApp;
