const request = require("supertest");
const { set } = require("../app");
const app = require("../app");

// Models and imports
const Task = require("../models/task");
const {
  userOneId,
  userOne,
  userTwo,
  userTwoId,
  taskOne,
  setUpDatabase,
} = require("./fixtures/db");

beforeEach(setUpDatabase);

// Add a new task
test("Should create task for user", async () => {
  const response = await request(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "anant test",
    })
    .expect(201);

  const task = await Task.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toBeFalsy();
});

// Get all of tasks of a particular user
test("Should get all tasks of a user", async () => {
  const response = await request(app)
    .get(`/tasks`)
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .expect(200);

  expect(response.body.length).toEqual(2);
});

// Task delete security
test("Should not delete task by wrong user", async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set("Authorization", `Bearer ${userTwo.tokens[0].token}`)
    .expect(404);

  const task = await Task.findById(taskOne._id);
  expect(task).not.toBeNull();
});
