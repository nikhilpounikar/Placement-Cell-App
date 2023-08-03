const mongoose = require("mongoose");
//const AVATAR_PATH = path.join("uploads/users/avatars");

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);

module.exports = Employee;
