const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project_nirmaan';
        const conn = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
        });

        console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}/${conn.connection.name}`);
        return conn;
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        console.warn(`⚠️ The server will continue running. Ensure MongoDB service is running at ${process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/project_nirmaan'}`);
    }
};

mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ MongoDB disconnected.');
});

mongoose.connection.on('reconnected', () => {
    console.log('🔄 MongoDB reconnected.');
});

module.exports = connectDB;
