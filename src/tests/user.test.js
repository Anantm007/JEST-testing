const request = require("supertest");
const app = require("../app");

// Models
const User = require("../models/user");

const { userOneId, userOne, setUpDatabase } = require("./fixtures/db");

/*
 * This runs (again and again) before EACH test case in this file (suite)
 * There is also an beforeAll lifecycle method that runs ONCE before all the test cases run
 */
beforeEach(setUpDatabase);

// This runs after each test case (again and again) in this file (suite)
afterEach(() => {
  // console.log("after each");
});

// Register a new user
test("Should signup new user", async () => {
  const response = await request(app)
    .post("/users")
    .send({
      name: "Anant",
      email: "test@test.com",
      password: "MyPass1212323@@",
    })
    .expect(201);

  // Assert that the database was changed correctly
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assertions about the response, it can have extra properties but those present should be there exactly
  expect(response.body).toMatchObject({
    user: {
      name: "Anant",
      email: "test@test.com",
    },
    token: user.tokens[0].token,
  });
  expect(user.password).not.toBe("MyPass1212323@@"); // Encrypted pwd
});

// Login an existing user
test("Should login an existing user", async () => {
  const response = await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  // Fetch user from DB
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  // Assert that token in response matches users second token
  expect(response.body.token).toBe(user.tokens[1].token);
});

// Not login non-existent user
test("Should not login a non-existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: `incorrect pass`,
    })
    .expect(400);
});

// Get a user's profile (authenticated)
test("Should get profile for authenticated user", async () => {
  await request(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

// Don't get profile if not authenticated
test("Should not get profile for unauthenticated user", async () => {
  await request(app).get("/users/me").send().expect(401);
});

// Delete a user's account (authentication required)
test("Should delete a user's account", async () => {
  await request(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  // Assert that user was deleted
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

// Dont' Delete a user's account if not authenticated authenticated
test("Should not delete a user's account", async () => {
  await request(app).delete("/users/me").send().expect(401);
});

// Send file to supertest
// test("Should upload avatar image", async () => {
//   await request(app)
//     .post("/users/me/avatar")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .attach("avatar", "tests/fixtures/profile-pic.jpg")
//     .expect(200);
// });

// Test user updates
test("Should update valid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: "UPDATED NAME",
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual("UPDATED NAME");
});

test("Should not update invalid user fields", async () => {
  await request(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      loction: "UPDATES",
    })
    .expect(400);
});
