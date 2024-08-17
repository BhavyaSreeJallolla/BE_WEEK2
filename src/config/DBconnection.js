const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Get the MongoDB URI from environment variables
    const MONGO_URI = process.env.MONGO_URI;

    // Connect to MongoDB
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true, // Deprecated but useful for some versions
      useFindAndModify: false // Optional for some versions
    });

    console.log('MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with failure code
  }
};

module.exports = connectDB;
