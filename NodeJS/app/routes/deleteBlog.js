const express = require("express");
const router = new express.Router();
const Blog = require("../models/blog");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/deleteblog", auth, async (req, res) => {
  try {
    if (req.body.blogId) {
      const blogId = req.body.blogId;
      const blog = await Blog.findByIdAndDelete({ _id: blogId }).exec();
      res.status(200).send({
        code: 200,
        status: "success",
        message: "Blog deleted successfully!",
      });
    } else throw new Error("Give Proper Details!");
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "Failed",
      message: error.message,
    });
    console.log("delete blog error", error);
  }
});

module.exports = router;
