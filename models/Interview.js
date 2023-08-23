const mongoose = require("mongoose");

// Define the schema for the "Interview" model
const interviewSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true, // The company name field is required
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // Reference to the "Student" model for populating students
      },
    ],
    date: {
      type: Date,
      required: true, // The date field is required
    },
    results: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result", // Reference to the "Result" model for populating results
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the "Interview" model using the defined schema
const Interview = mongoose.model("Interview", interviewSchema);

// Export the "Interview" model to make it accessible in other parts of the application
module.exports = Interview;
