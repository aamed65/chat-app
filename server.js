import express from 'express';
import cors from 'cors';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5175', // Din frontend URL
  credentials: true
}));
app.use(express.json());

// CSRF skydd
const csrfProtection = csrf({ cookie: true });

// Route för att hämta CSRF-token
app.get('/csrf-token', csrfProtection, (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

// Exempel på en skyddad route
app.post('/auth/token', csrfProtection, (req, res) => {
  // Hantera autentisering och generera JWT här
  res.json({ message: 'Autentisering lyckades!' });
});

// Starta servern
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
