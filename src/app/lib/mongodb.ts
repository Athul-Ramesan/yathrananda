import mongoose from "mongoose";

const connectMongo = async () => {
    if (mongoose.connections[0].readyState) return;
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log('MongoDB Connected');
  };