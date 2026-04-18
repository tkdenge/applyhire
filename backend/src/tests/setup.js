const mongoose = require("mongoose");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);

  // // clear DB at start of test run
  // await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});