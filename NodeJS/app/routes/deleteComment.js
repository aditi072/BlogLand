const express = require("express");
const router = new express.Router();
const Blog = require("../models/blog");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/deletecomment", auth, async (req, res) => {
  try {
    if (req.body.blogId && req.body.commentId) {
      const blogId = req.body.blogId;
      const commentId = req.body.commentId;
      const blog = await Blog.findByIdAndUpdate(
        { _id: blogId },
        { $pull: { comments: { _id: commentId } } }
      ).exec();
      if (blog) {
        res.status(200).send({
          code: 200,
          status: "success",
          message: "Comment deleted successfully!",
        });
      } else throw new Error("Incorrect blogId OR userId!");
    } else throw new Error("Give complete information!");
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = router;
