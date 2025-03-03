import bcrypt from 'bcryptjs';
import db from '../../db';  // Import the db connection

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      // Check if the user already exists
      const existingUser = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert the user into the database
      await db.none('INSERT INTO users(email, password) VALUES($1, $2)', [email, hashedPassword]);

      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
