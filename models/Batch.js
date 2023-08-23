const mongoose = require("mongoose");

// Define the schema for the "Batch" model
const batchSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // The name field is required
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student", // Reference to the "Student" model for populating students
      },
    ],
    startDate: {
      type: Date,
      required: true, // The start date field is required
    },
    endDate: {
      type: Date,
      required: true, // The end date field is required
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the "Batch" model using the defined schema
const Batch = mongoose.model("Batch", batchSchema);

// Export the "Batch" model to make it accessible in other parts of the application
module.exports = Batch;
