const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const noteRoutes = require('./routes/noteRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// DB Connect
connectDB();

// Middleware
app.use(cors({
  origin: 'https://notesapp-frontend-s6bv.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/notes', noteRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
