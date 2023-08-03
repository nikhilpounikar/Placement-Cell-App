const mongoose = require("mongoose");
//const AVATAR_PATH = path.join("uploads/users/avatars");

const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    startDate:{
        type: Date,
        require:true
    },
    endDate:{
        type: Date,
        require:true
    }
  },
  {
    timestamps: true,
  }
);



const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;
