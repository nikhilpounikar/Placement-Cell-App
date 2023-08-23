const mongoose = require("mongoose");

// Define the schema for the "Student" model
const studentSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true, // The email field is required
      unique: true, // The email must be unique
    },
    name: {
      type: String,
      required: true, // The name field is required
    },
    collage: {
      type: String,
      required: true, // The collage field is required
    },
    status: {
      type: String,
      enum: ["Placed", "Not Placed"], // Enumerated field for possible status values
      required: true, // The status field is required
    },
    reactScore: {
      type: Number,
      required: true, // The React score field is required
    },
    webDevelopmentScore: {
      type: Number,
      required: true, // The web development score field is required
    },
    dsaScore: {
      type: Number,
      required: true, // The DSA score field is required
    },
    interviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Interview", // Reference to the "Interview" model for populating interviews
      },
    ],
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch", // Reference to the "Batch" model for populating batch
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

// Create the "Student" model using the defined schema
const Student = mongoose.model("Student", studentSchema);

// Export the "Student" model to make it accessible in other parts of the application
module.exports = Student;
