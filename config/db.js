const mongoose = require("mongoose");
const colors = require("colors");
const MONGODB_URL ="mongodb://localhost:27017/Scheme";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log(`Mongodb connected ${mongoose.connection.host}`.bgGreen.white);
  } catch (error) {
    console.log(`Mongodb Server Issue ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
