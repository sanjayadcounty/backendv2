const mongoose = require('mongoose');
const local_URL = 'mongodb://localhost:27017/CDN';
const connectDB = async () => {
    try {
        await mongoose.connect(local_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;