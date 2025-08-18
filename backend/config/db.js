const mongoose = require('mongoose');
let memoryServer = null;

const connectWithUri = async (uri) => {
  const connection = await mongoose.connect(uri);
  console.log(`MongoDB connected: ${connection.connection.host}`);
  return connection;
};

const connectDB = async () => {
  const configuredUri = process.env.MONGO_URI;
  const localUri = 'mongodb://127.0.0.1:27017/codeduo';

  try {
    if (configuredUri) {
      await connectWithUri(configuredUri);
      return;
    }
    // Try local MongoDB first
    await connectWithUri(localUri);
  } catch (firstError) {
    console.warn('Primary MongoDB connection failed:', firstError.message);
    console.warn('Falling back to in-memory MongoDB instance...');
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      memoryServer = await MongoMemoryServer.create();
      const memUri = memoryServer.getUri();
      await connectWithUri(memUri);
    } catch (memErr) {
      console.error('Failed to start in-memory MongoDB:', memErr.message);
      process.exit(1);
    }
  }
};

module.exports = connectDB;

 