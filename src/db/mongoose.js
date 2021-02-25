const mongoose = require("mongoose");
// Config variables
require("dotenv").config();

//Connecting to the database
mongoose.promise = global.Promise;
mongoose.connect(
  process.env.MONGODB_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  (err, db) => {
    if (err) console.log(err);
    // else console.log("Database Connected...");
  }
);
