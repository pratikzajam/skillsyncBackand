import express from 'express';
import cors from 'cors';
import { connectDb } from './src/Db/dbconfig.js';
import route from './src/router/user.router.js';

const app = express();
const port = process.env.PORT || 5000; // Fallback port just in case

// ✅ Enable CORS for specific origins
app.use(cors({
  origin: ['http://localhost:5173', 'https://skill-sync-backend-chi.vercel.app'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use("", route);

// DB Connection
connectDb().then(() => {
  console.log("✅ Connected to DB");
}).catch(err => {
  console.error("❌ DB connection failed:", err);
});

// Test Route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start Server
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`);
});
