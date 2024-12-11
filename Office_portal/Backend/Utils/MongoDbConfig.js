const mongoose = require("mongoose");
let bucket;
exports.mongodbConfig = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sapra7112:Iamphenomenol1@office-portal.itxbw.mongodb.net/?retryWrites=true&w=majority&appName=office-portal"
    );
    console.log("MongoDB Connected");

    // Create a GridFS bucket after successful connection
    const db = mongoose.connection.db;
    bucket = new mongoose.mongo.GridFSBucket(db, { bucketName: "uploads" });
  } catch (err) {
    console.log(err);
  }
};

exports.getBucket = () => {
  if (!bucket) {
    throw new Error(
      "Bucket is not initialized. Make sure to call mongodbConfig first."
    );
  }
  return bucket;
};
