const Employee = require("../models/Employee");

module.exports.register = async function (req, res) {
  try {
  
    if (req.body.password !== req.body.confirm_password) {
      req.flash('error',"Password and Confirm password does not match");
      return res.redirect('back');
    }

    let employee = await Employee.findOne({ email: req.body.email });

    if (!employee) {
      employee=await Employee.create(req.body);

      req.flash('success',"Thanks for registration.");
      return res.redirect('home',{
        'employee':employee,
        title:'Home'
      });
    } else {

      req.flash('error',"This Email Already Exits. Please try login");
      return res.redirect('back');
    }
  } catch (err) {
    req.flash('error',"Error Registering Employee");
    return res.redirect('back');
  }
};

module.exports.login = async function (req, res) {
  // this work will be done by passport
 /* try {
    let employee = await Employee.findOne({ email: req.body.email });

    if (employee) {
      req.flash('success','Signed In Successfully!');
      return res.redirect('home',{
        'employee':employee,
        title:'Home'
      });
    } else {
      req.flash('success',"Invalid Username or Password");
      return res.redirect('back');
    }

  } catch (error) {
    console.log(error);
    req.flash('success',"Interval Server Exception");
    return res.redirect('back');
  }*/
  
  req.flash('error',"Login Successful");
  return res.redirect('home');
};

// redering the singIN page
module.exports.signIn = function(req, res){
  return res.render('sign_in', {
      title : 'Placement | Sign-In'
  });
}

// This function is used for rendering the signUp page
module.exports.signUp = function(req, res){
  return res.render('sign_up', {
      title : 'Placement | Sign-Up'
  });
}