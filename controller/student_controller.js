const Student = require("../models/Student");


exports.getRegisterForm = function(req,res){

  return res.render('student_form',{title:"Placement Cell | Registration"});
}
// Route to handle registration form submission
exports.register = async (req, res) => {
    try {
      const { name, email, password, confirmPassword, role } = req.body;
      
      if (password !== confirmPassword) {
        req.flash('error', "Passwords do not match");
        return res.render("employee_registration", { error: "Passwords do not match" });
      }
      
      const newEmployee = new Employee({ name, email, password, role });
      await newEmployee.save();
      req.flash('error', "Thanks for Registration");
      return res.redirect("/"); // Redirect to registration page after successful registration
    } catch (error) {
      console.error(error);
      req.flash('error', "Interval Server Error");
      res.render("employee_registration");
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
       
        req.flash('error','Invalid email or password');
        return res.render("employee_login", {title:"Login", error: "Invalid email or password" });
      }
      
      if (employee.password !== password) {
       
        req.flash('success','Signed In Successfully!');
        return res.render("employee_login", {title:"Login", error: "Invalid email or password" });
      }
  
      // Store employee data in session or create a token for authentication
      req.flash('success','Signed In Successfully!');
      return res.render("/",{
        "employee":employee
      });
    } catch (error) {
      console.error(error);
      req.flash('error', "Interval Server Error");
      return res.status(500).send("Internal Server Error");
    }
};