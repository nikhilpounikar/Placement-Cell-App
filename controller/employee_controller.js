const Employee = require("../models/Employee");


exports.signUp = function(req,res){

  return res.render('employee_registration',{title:"Placement Cell | Registration"});
}
// Route to handle registration form submission
exports.register = async (req, res) => {
    try {
      const { name, email, password, confirmPassword, role } = req.body;
      
      if (password !== confirmPassword) {
        return res.render("employee_registration", { error: "Passwords do not match" });
      }
      
      const newEmployee = new Employee({ name, email, password, role });
      await newEmployee.save();
      
      res.redirect("/employee_registration"); // Redirect to registration page after successful registration
    } catch (error) {
      console.error(error);
      res.redirect("/back");
    }
};

exports.signIn = (req,res)=>{
    res.render("employee_login",{
      title:"Emplyee Login"
    });
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      
      const employee = await Employee.findOne({ email });
      if (!employee) {
        req.flash('success','Signed In Successfully!');
        return res.render("employee_login", {title:"Login", error: "Invalid email or password" });
      }
      
      if (employee.password !== password) {
        req.flash('success','Signed In Successfully!');
        return res.render("employee_login", {title:"Login", error: "Invalid email or password" });
      }
      
      // Store employee data in session or create a token for authentication
      
      res.redirect("/dashboard",{
        ttile:"Dashboard"
      }); // Redirect to employee dashboard after successful login
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
};