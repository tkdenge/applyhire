const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

beforeEach(async () => {
  await User.deleteMany();
});

describe("Auth - Signup", () => {

  // Success test
  it("should register a user successfully", async () => {
    const res = await request(app)
    .post("/api/auth/register")
    .send({
      name: "Marcelo",
      email: "marcelo@test.com",
      password: "123456"
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe("User created successfully");
    expect(res.body.data.email).toBe("marcelo@test.com");
    expect(res.body.data.token).toBeDefined();
  });

  // Failure test
  it("should fail if fields are missing", async () => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({
      email: "marcelo@test.com"
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe("All fields are required");
  });

  // Duplicate User
  it("should not allow duplicate users", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Marcelo",
        email: "marcelo@test.com",
        password: "123456"
      });

    const res = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Marcelo",
        email: "marcelo@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(409);
    expect(res.body.message).toBe("User already exists");
  });
});

describe("Auth - Login", () => {

  // helper user
  const userData = {
    name: "Marcelo",
    email: "marcelo@test.com",
    password: "123456"
  };

  // Success login
  it("should login successfully with correct credentials", async () => {

    // first create user
    await request(app)
      .post("/api/auth/register")
      .send(userData);

    // then login
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: userData.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.message).toBeDefined();
  });

  // Failure - wrong password
  it("should fail with wrong password", async () => {

    await request(app)
      .post("/api/auth/register")
      .send(userData);

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: userData.email,
        password: "wrongpassword"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

  // Failure User not found
  it("should fail if user does not exist", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "notfound@test.com",
        password: "123456"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Invalid credentials");
  });

});

