const Employee = require("../models/Employee");


// Route to handle registration form submission
exports.register = async (req, res) => {
    try {
      const { name, email, password, confirmPassword, role } = req.body;
      
      if (password !== confirmPassword) {
        return res.render("registration", { error: "Passwords do not match" });
      }
      
      const newEmployee = new Employee({ name, email, password, role });
      await newEmployee.save();
      
      res.redirect("/register"); // Redirect to registration page after successful registration
    } catch (error) {
      console.error(error);
      res.redirect("/back");
    }
};

exports.signIn = (req,res)=>{
    res.render("login");
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const employee = await Employee.findOne({ email });
      if (!employee) {
        return res.render("login", { error: "Invalid email or password" });
      }
      
      if (employee.password !== password) {
        return res.render("login", { error: "Invalid email or password" });
      }
      
      // Store employee data in session or create a token for authentication
      
      res.redirect("/dashboard"); // Redirect to employee dashboard after successful login
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
};