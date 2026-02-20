const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://mohamedelghool671_db_user:MWEdHrfCRrwo8RYp@cluster0.tnees5j.mongodb.net/?appName=Cluster0");

    console.log("MongoDB connected");
  } catch (error) {
    console.error("DB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
