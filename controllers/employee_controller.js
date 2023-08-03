const Employee = require("../models/Employee");

module.exports.register = async function (req, res) {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return   res.status(422).json({
        message:"Password and Confirm password does not match"
    });
    }

    let employee = await Employee.findOne({ email: req.body.email });

    if (!employee) {
      await Employee.create(req.body);

      console.log("Employee Added Successfully");
      return this.createSession(req, res);
    } else {
        return res.status(403).json({
            message:"Employee Already Exits"
        });
    }

  } catch (err) {
    return res.status(500).json({
        message:"Error Registering Employee"
    });
  }
};

module.exports.signIn = async function (req, res) {
  
    try {

        let employee =  await Employee.findOne({email:req.body.email});

        if(employee){

            return res.status(200).json(employee);

        }else{
            return res.status(422).json({
                message:"Invalid Username or Password"
            });
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message:"Internal Server Exception"});
    }
};

module.exports.profile = function (req, res) {
  /* Passport authentication */
  Employee.findById(req.params.id)
    .then((user) => {
      return res.render("profile", {
        title: "Profile",
        employee_profile: employee,
      });
    })
    .catch((err) => {
      console.log("Error Getting User Details : ", err);
      return res.redirect("back");
    });
};

module.exports.update = async function (req, res) {
  try {
    let user = await User.findById(req.params.id);

    if (req.params.id == user.id) {
      // await User.findByIdAndUpdate(user.id, req.body);

      User.uploadAvatar(req, res, function (err) {
        if (err) {
          console.log("************Multer Error", err);
        }

        user.name = req.body.name;
        user.email = req.body.email;

        if (req.file) {
          if (user.avatar) {
            if (fs.existsSync(path.join(__dirname, "..", user.avatar))) {
              console.log("Path Exits");
              fs.unlinkSync(path.join(__dirname, "..", user.avatar));
            }
          }

          user.avatar = User.avatarPath + "/" + req.file.filename;
        }
        user.save();
      });
      console.log("User Updated");
    } else {
      return res.status(401).send("UnAuthorised");
    }

    return res.redirect("back");
  } catch (error) {
    console.log("Error While Updating User Details : ", error);
    return res.redirect("back");
  }
};

// responsible for sign-out
module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error loging Out", err);
      return res.redirect("back");
    }
    req.flash("success", "You have logged out!");
    return res.redirect("/");
  });
};

// responsible for sign-out
module.exports.delete = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("Error loging Out", err);
      return res.redirect("back");
    }
    req.flash("success", "You have logged out!");
    return res.redirect("/");
  });
};

module.exports.createSession = async function (req, res) {
  // manual Authentication
  //find the user

  let employee = await Employee.findOne({ email: req.body.email });

  if(employee){

    //if password doesn't match
    if (employee.password != req.body.password) {
        // handle session Creation
        res.cookie("employee_id", employee.id);
        return res.redirect("back");
    }else{

    }

  }else{

  }
  Employee.findOne({ email: req.body.email })
    .then((employee) => {
      // if employee found
      if (employee != null && employee != undefined) {
        //if password doesn't match
        if (employee.password != req.body.password) {
          return res.redirect("back");
        }

        // handle session Creation
        res.cookie("employee_id", employee.id);

        return res.redirect("/");
      } else {
        // handle employee not found
        console.log("employee Not Found");
        return res.redirect("back");
      }
    })
    .catch((err) => {
      // handle error finding employee
      console.log("Error Finding employee", err);
      return res.redirect("back");
    });
};
