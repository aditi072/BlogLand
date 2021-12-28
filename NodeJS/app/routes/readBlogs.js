const express = require("express");
const router = new express.Router();
const Blog = require("../models/blog");

const app = express();
app.use(router);

router.post("/readblogs", async (req, res) => {
  try {
    if (req.body.topic) {
      const topic = req.body.topic;
      const blogs = await Blog.find({ topic }).exec();
      // const userName := await User.find({});
      let content;
      blogs.forEach((blog) => {
        content = JSON.parse(Buffer.from(blog.blogContent, "base64")).toString(
          "ascii"
        );
        blog.blogContent = content;
      });
      console.log(blogs);
      res.status(200).send({
        code: 200,
        status: "success",
        message: "Showing Blogs",
        blogs,
      });
    } else throw new Error("Please give the topic!");
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = router;
