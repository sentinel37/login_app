import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    // Register the user first
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (res.ok) {
      // After successful registration, log the user in
      const loginRes = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const loginData = await loginRes.json();
      if (loginRes.ok) {
        // Store the token and redirect to the dashboard
        localStorage.setItem('token', loginData.token);
        alert('Registration and login successful');
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        alert('Login failed: ' + loginData.message);
      }
    } else {
      alert('Registration error: ' + data.message);
    }
  };

  const goToHome = () => {
    router.push('/');  // Redirect to home page (login/register options)
  };

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={handleRegister}>Register</button>

      {/* Button to go to the home page */}
      <button onClick={goToHome}>Go to Home</button>
    </div>
  );
}
