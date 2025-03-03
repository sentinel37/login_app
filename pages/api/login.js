import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../../db';  // Import the db connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Fetch the user by email
      const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Compare password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate a JWT token
      const token = jwt.sign({ email: user.email, id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ token });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
