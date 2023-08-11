const mongoose = require("mongoose");
//const AVATAR_PATH = path.join("uploads/users/avatars");

const ResultSchema = new mongoose.Schema(
  {
    student: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      interview: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
      status: {
        type: String,
        enum:["Pass","Fail","On Hold","Abstain","Scheduled"],
        require: true,
      },
  },
  {
    timestamps: true,
  }
);



const Result = mongoose.model("Result", ResultSchema);

module.exports = Result;
