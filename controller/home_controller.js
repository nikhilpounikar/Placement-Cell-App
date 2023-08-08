const Batch = require("../models/Batch");
const Student = require("../models/Student");
const Inteview = require("../models/Interview");

module.exports.home = async function (req, res) {
  try {
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      .populate({
        // fetching all comments related to the post
        path: "comments",
        populate: {
          // fetching all the user who have made comment on the purticular post
          path: "user",
        },
        populate: {
            path: 'likes'
        }
        
      }).populate('comments')
      .populate('likes');

    let users = await User.find({});

    return res.render("home", {
      title: "Project | Home",
      posts: posts,
      all_users: users,
    });
  } catch (err) {
    console.log("Error in home controller : ", err);
  }
};

