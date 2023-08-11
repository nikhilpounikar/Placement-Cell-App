const Employee = require("../models/Employee");


exports.signUp = function(req,res){

  return res.render('employee_registration',{title:"Placement Cell | Registration"});
}
// Route to handle registration form submission
exports.register = async (req, res) => {
    try {
      const { name, email, password, confirmPassword, role } = req.body;
      
      if (password !== confirmPassword) {
        req.flash('error', "Passwords do not match");
        return res.redirect('back');
      }
      
      const newEmployee = new Employee({ name, email, password, role });
      await newEmployee.save();
      req.flash('success', "Thanks for Registration");
      return res.redirect("/"); // Redirect to registration page after successful registration
    } catch (error) {
      console.error(error);
      req.flash('error', "Interval Server Error");
      return res.redirect('back');
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
      if (!employee || employee.password !== password) {
       
        req.flash('error','Invalid email or password');
        return res.redirect('back');
      }
      
      // Store employee data in session or create a token for authentication
      req.flash('success','Signed In Successfully!');
      return res.redirect("/");
    } catch (error) {
      console.error(error);
      req.flash('error', "Interval Server Error");
      return res.redirect('back');
    }
};