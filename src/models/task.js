const mongoose = require("mongoose");
const validator = require("validator");

const Task = mongoose.model("Task", {
  description: {
    type: String,
    trim: true,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

// const task = new Task({
//     description: "",
//     // completed: false,
//   });

//   task
//     .save()
//     .then((task) => {
//       console.log(task);
//     })
//     .catch((error) => {
//       console.log(error);
//     });

module.exports = Task;
