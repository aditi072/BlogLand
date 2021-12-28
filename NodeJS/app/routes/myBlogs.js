const express = require("express");
const mongoose = require("mongoose");
const router = new express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/myblogs", auth, async (req, res) => {
  try {
    if (req.body.userId) {
      const user = mongoose.Types.ObjectId(req.body.userId);
      const blogs = await Blog.find({ user }).exec();
      let content;
      blogs.forEach((blog) => {
        content = JSON.parse(Buffer.from(blog.blogContent, "base64")).toString(
          "ascii"
        );
        blog.blogContent = content;
      });
      res.status(200).send({
        code: "200",
        status: "success",
        message: "Displaying all blogs of users!",
        blogs,
      });
    } else throw new Error("Time Out!");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: "400",
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = router;
