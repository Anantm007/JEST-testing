const {
  calculateTip,
  fahrenheitToCelsius,
  celsiusToFahrenheit,
  add,
} = require("../math");

// // Test a very basic arithmetic function
test("Calculate tip and new total", () => {
  total = calculateTip(10, 0.3);

  // Assertion to check if received value equals something
  expect(total).toBe(13);
});

// Test a very basic arithmetic function
test("Should Calculate tip and new total with default tip Percentage", () => {
  total = calculateTip(10);

  // Assertion to check if received value equals something
  expect(total).toBe(12);
});

// Test fahrenheit to celsius function
test("Convert fahrenheit to celsius", () => {
  celsius = fahrenheitToCelsius(32);

  expect(celsius).toBe(0);
});

// Test celsius to fahrenheit function
test("Convert to celsiusfahrenheit", () => {
  far = celsiusToFahrenheit(0);

  expect(far).toBe(32);
});

// Promise based Asynchronous code
test("Should add 2 numbers test ", (done) => {
  add(2, 3).then((sum) => {
    expect(sum).toBe(5);
    done();
  });
});

// async await based Asynchronous code - MOST COMMON
test("Should add 2 numbers async/await", async () => {
  const sum = await add(10, 22);
  expect(sum).toBe(32);
});
