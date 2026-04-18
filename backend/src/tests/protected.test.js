const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
jest.setTimeout(10000);

beforeEach(async () => {
  await User.deleteMany();
});

describe("Protected Routes", () => {
  let token;

  beforeAll(async () => {
    console.log("Starting setup...");

    // await User.deleteMany();
    // console.log("DB cleared");

    // register user
    await request(app)
      .post("/api/auth/register")
      .send({
        name: "Marcelo",
        email: "marcelo@test.com",
        password: "123456"
      });

    console.log("User registered");

    // login user
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "marcelo@test.com",
        password: "123456",
      });

    console.log("Login response:", res.body);  

    token = res.body.data.token;

    console.log("Token:", token);
  });

  // Failure - No Token
  it("should reject request without token", async () => {
    const res = await request(app).get("/api/profile");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("No token, not authorized");
  });

  // Failure - Invalid token
  it("should reject invalid token", async () => {
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", "Bearer invalidtoken123");

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe("Token failed");
  });

  // Success - Valid Token
  it("should allow access with valid token", async () => {
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toBeDefined();
    expect(res.body.message).toBe("Access granted");
  });
});