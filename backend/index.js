import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import cors from 'cors';
import { fileURLToPath } from 'url';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import formidable from 'express-formidable';

dotenv.config();
const port = process.env.PORT || 3000;

connectDB();
const app = express();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://mern-e-commercee.netlify.app',     
      'http://localhost:5173',                      
    ];

    const isAllowed =
      !origin ||
      allowedOrigins.includes(origin) ||
      /^https:\/\/[a-z0-9]+--mern-e-commercee\.netlify\.app$/.test(origin);

    if (isAllowed) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed for origin: ' + origin));
    }
  },
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
