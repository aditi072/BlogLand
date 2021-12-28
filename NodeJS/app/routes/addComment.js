const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/addcomment", auth, async (req, res) => {
  try {
    if (req.body.blogId && req.body.whoCommented && req.body.comment) {
      const whoCommented = req.body.whoCommented;
      const comment = req.body.comment;
      const usernameCheck = await User.exists({ userName: whoCommented });
      if (usernameCheck) {
        const blog = await Blog.findById({ _id: req.body.blogId }).exec();
        blog.comments.push({
          whoCommented,
          comment,
        });
        const showComment = blog.comments.slice(
          blog.comments.length - 1,
          blog.comments.length
        );
        await blog.save();
        res.status(200).send({
          code: 200,
          status: "success",
          message: "Comment added successfully!",
          commentAdded: showComment,
        });
      } else throw new Error("User doesn't exists. You cann't comment!");
    } else throw new Error("Enter Blog Id!");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = router;
