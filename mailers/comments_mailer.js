const nodeMailer = require('../config/nodemailer');


// this is another way of exporting a method
exports.newComment = (comment,user) => {
    console.log('inside newComment mailer', comment);
    let htmlString = nodeMailer.renderTemplate({comment: comment,user:user}, '/comments/new_comment.ejs');
    
    nodeMailer.transporter.sendMail({
       from: 'nikhilptacktile@gmail.com',
       to: user.email,
       subject: "New Comment Published!",
       html: '<h1>Yup, your comment is now published!</h1>' 
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail ************ ', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}