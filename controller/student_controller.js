const Student = require("../models/Student");


exports.getRegisterForm = function(req,res){

  return res.render('student_form',{title:"Placement Cell | Registration"});
}

exports.register = async function(req,res){

    try {

        let student = await Student.findOne({email:req.email});

        if(student){
            req.flash('error',"Student Already registered");
            return res.redirect('back');
        }
        
        await Student.create(req.body);

        req.flash('success',"Student registered successfully");
        return res.redirect('back');



    } catch (error) {
        
        console.log(error);
        req.flash('error','Internal Server Error');
        return res.redirect('back');
    }
}