const mongoose = require("mongoose");
//const AVATAR_PATH = path.join("uploads/users/avatars");

const interviewSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    date:{
        type: Date,
        require:true
    },
    results:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result",
    }]
  },
  {
    timestamps: true,
  }
);



const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
