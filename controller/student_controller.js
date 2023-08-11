const Student = require("../models/Student");
const Interview = require("../models/Interview");

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
        return res.redirect('/');



    } catch (error) {
        
        console.log(error);
        req.flash('error','Internal Server Error');
        return res.redirect('back');
    }
}

exports.getInterviews = async function(req,res){

    
    try {

        let student = await Student.findById(req.param.id).populate('interviews');

        if(!student){
            req.flash('error',"Student does not exits");
            return res.redirect('/');
        }
        
        let interviews = await Interview.find();

        return res.render('student_interview_page',{
            student,
            interviews
        });

    } catch (error) {
        
        console.log(error);
        req.flash('error','Internal Server Error');
        return res.redirect('back');
    }
}