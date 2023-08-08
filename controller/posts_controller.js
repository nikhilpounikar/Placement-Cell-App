const Post = require("../models/Post");
const Comment = require("../models/Comments");
const Like = require('../models/like');

module.exports.create = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => {

      if(req.xhr){

        return res.status(200).json({

          data:{
            post:post
          },
          message:"Post Created."
        })
        
      }

      console.log("Post Created.");
      return res.redirect("back");
    })
    .catch((err) => {
      console.log("error creating post ", err);
      res.redirect("back");
    });
};

module.exports.destoy = async function (req, res) {
  try {
    let post = await Post.findById({ _id: req.params.id });

    if (post.user == req.user.id) {
      await Post.findByIdAndDelete({ _id: post._id });

      // CHANGE :: delete the associated likes for the post and all its comments' likes too
      await Like.deleteMany({likeable: post, onModel: 'Post'});
      await Like.deleteMany({_id: {$in: post.comments}});

      console.log("Post Delete Successfully");

      await Comment.deleteMany({ post: post._id });

      if(req.xhr){

        return res.status(200).json({

          data:{
            post_id:req.params.id
          },
          message:"Post Deleted"
        })
      }

      console.log("Comments Delete Successfully");
    } else {
      console.log("Invalid User, Your are not allowed to delete this post");
    }

    return res.redirect("back");
  } catch (err) {
    console.log("Error in post destroy method  : ", err);
    return res.redirect("back");
  }
};
