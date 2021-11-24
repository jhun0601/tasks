const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");
const { ObjectId } = require("bson");

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server run port : ${port}`);
});
