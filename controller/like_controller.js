const Like = require("../models/like");
const Post = require("../models/Post");
const Comment = require("../models/Comments");

module.exports.toggleLike = async function(req, res) {
  try {
    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id
    });

    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();

      //if (existingLike.remove) {
        // Check if remove function exists before calling it
        //existingLike.remove();
        await Like.deleteOne({_id:existingLike._id})
        deleted = true;
      //}
    } else {
      let newLike = await Like.create({
        user: req.user._id,
        likeable: req.query.id,
        onModel: req.query.type
      });

      likeable.likes.push(newLike._id);
      likeable.save();
    }

    return res.status(200).json({
      message: "Request successful!",
      data: {
        deleted: deleted
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error"
    });
  }
};
