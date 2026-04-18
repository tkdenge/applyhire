const mongoose = require("mongoose");
require("dotenv").config();

beforeAll(async () => {
   if (!process.env.MONGO_URI_TEST) {
    throw new Error("MONGO_URI_TEST is missing");
  }
  
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // // clear DB at start of test run
  // await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});