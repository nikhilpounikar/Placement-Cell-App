const Post = require("../models/Post");
const User = require("../models/User");

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

/* Wihout Asyc await */
/* module.exports.home = function (req, res) {
  // console.log(req.cookies);
  // res.cookie('user_id',17);
  // return res.render('home',{

  //  title:"Views",
  //  person:"Lucky"
  // })

 Post.find({})
    .populate("user")
    .populate({
      // fetching all comments related to the post
      path: "comments",
      populate: {
        // fetching all the user who have made comment on the purticular post
        path: "user",
      },
    })
    .exec()
    .then((posts) => {
      User.find({})
        .then((users) => {
          return res.render("home", {
            title: "Project | Home",
            posts: posts,
            all_users: users,
          });
        })
        .catch((err) => {
          console.log("Error Fetching Users in Home", err);
          return res.redirect("/user/sign-in");
        });
    })
    .catch((err) => {
      console.log("Error Fetching Post", err);
      return res.redirect("/user/sign-in");
    });
};
*/
