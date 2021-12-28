const express = require("express");
const router = new express.Router();
const Blog = require("../models/blog");

const app = express();
app.use(router);

router.get("/feedblog", async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $sort: { createdAt: -1 } },
      { $sample: { size: 5 } },
    ]);
    let content;
    blogs.forEach((blog) => {
      content = JSON.parse(Buffer.from(blog.blogContent, "base64")).toString(
        "ascii"
      );
      blog.blogContent = content;
    });
    res.status(200).send({
      code: 200,
      status: "success",
      message: "Blog-Feed is ready!",
      blogs,
    });
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "failed",
      message: error.message,
    });
  }
});

module.exports = router;
