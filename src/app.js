const express = require("express");
require("./db/mongoose");

const User = require("./models/user");
const Task = require("./models/task");

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server run port : ${port}`);
});

// const Task = require("./models/task");

// const main = async () => {
// const task = await Task.findById("61a6384757c4f80388995da7");
// await task.populate("user_id");
// console.log(task.user_id.toString());

// const user = await User.findById("61a6383c57c4f80388995d9c");
// await user.populate("tasks");
// console.log(user.tasks);
// };

// main();
