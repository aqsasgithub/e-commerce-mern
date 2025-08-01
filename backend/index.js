import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import formidable from 'express-formidable';


dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
console.log("MONGO_URI:", process.env.MONGO_URI);

const port = process.env.PORT || 3000;

connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/orders', orderRoutes);
const __dirname = path.resolve();
app.use('/uploads', formidable(),  express.static(path.join(__dirname + "/uploads")));

app.listen(port, ()=> console.log(`Server is listening on port: ${port}`)); 