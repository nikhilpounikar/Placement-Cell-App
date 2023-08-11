const mongoose = require("mongoose");
//const AVATAR_PATH = path.join("uploads/users/avatars");

const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    collage: {
      type: String,
      require: true,
    },
    status: {
      type: String,
      enum:["Placed","Not Placed"],
      require: true,
    },
    reactScore:{
        type:Number,
        require: true,
    },
    webDevelopmentScore:{
        type:Number,
        require: true,
    },
    dsaScore:{
        type:Number,
        require: true,
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview",
      },
    ],
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
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

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
