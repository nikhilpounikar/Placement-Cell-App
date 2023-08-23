const mongoose = require("mongoose");

// Define the schema for the "Employee" model
const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // The name field is required
    },
    email: {
      type: String,
      required: true, // The email field is required
    },
    password: {
      type: String,
      required: true, // The password field is required
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the "Employee" model using the defined schema
const Employee = mongoose.model("Employee", EmployeeSchema);

// Export the "Employee" model to make it accessible in other parts of the application
module.exports = Employee;
