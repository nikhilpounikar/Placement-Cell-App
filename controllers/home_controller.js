module.exports.home =  function (req, res) {
    try {
    //   let posts = await Post.find({})
    //     .sort('-createdAt')
    //     .populate("user")
    //     .populate({
    //       // fetching all comments related to the post
    //       path: "comments",
    //       populate: {
    //         // fetching all the user who have made comment on the purticular post
    //         path: "user",
    //       },
    //       populate: {
    //           path: 'likes'
    //       }
          
    //     }).populate('comments')
    //     .populate('likes');
  
    //   let users = await User.find({});
        console.log('In Home controller')
      return res.render("home", {
        title: "Review | Home",

       // posts: posts,
       // all_users: users,
      });
    } catch (err) {
      console.log("Error in home controller : ", err);
    }
  };