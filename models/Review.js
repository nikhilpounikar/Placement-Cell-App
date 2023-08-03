const mongoose = require("mongoose");
//const AVATAR_PATH = path.join("uploads/users/avatars");

const reviewSchema = new mongoose.Schema(
  {
     // the user who sent this request
     from_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    // the Employee who accepted this request, the naming is just to understand, otherwise, the Employees won't see a difference
    to_employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
},{
    timestamps: true
});



const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
