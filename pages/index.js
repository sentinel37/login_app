// pages/index.js

import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <p>
      <Link href="/login">Login</Link>
      </p>
      <p>
      <Link href="/register">Register</Link>
      </p>
    </div>
  );
}
