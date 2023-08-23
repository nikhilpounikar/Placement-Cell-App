const mongoose = require("mongoose");

// Define the schema for the "Result" model
const ResultSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", // Reference to the "Student" model for populating student
    },
    interview: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Interview", // Reference to the "Interview" model for populating interview
    },
    status: {
      type: String,
      enum: ["Pass", "Fail", "On Hold", "Abstain", "Scheduled"], // Enumerated field for possible status values
      required: true, // The status field is required
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the "Result" model using the defined schema
const Result = mongoose.model("Result", ResultSchema);

// Export the "Result" model to make it accessible in other parts of the application
module.exports = Result;
