import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    setLoading(false);  // Stop loading once response is received
    if (res.ok) {
      // Store the token in localStorage or a cookie
      localStorage.setItem('token', data.token);
      alert('Login successful');
      
      // Redirect to dashboard after successful login
      router.push('/dashboard');
    } else {
      alert('Error: ' + data.message);
    }
  };

  const goToHome = () => {
    router.push('/');  // Redirect to home page (login/register options)
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
      
      {/* Button to go to the home page */}
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}
