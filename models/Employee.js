const mongoose = require("mongoose");
//const AVATAR_PATH = path.join("uploads/users/avatars");

const employeeSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require:true
    },
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  }
);



const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
