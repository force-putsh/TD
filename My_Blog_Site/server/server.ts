import mongoose from 'mongoose';
require('dotenv').config();
const express=require('express');

// Initialize express

const app = express();
const process = require('process');

// Connection to the database function
async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to database successfully');
    } catch (err) {
        console.error('Error connecting to database:', err);
        process.exit(1);
    }
}
 
connectToDatabase()

// Import routes
const postRoutes = require('./Routes/Post');
const commentRoutes = require('./Routes/Comment');

// Middleware
app.use(express.json());

// Routes
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});