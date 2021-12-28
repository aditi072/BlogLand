const express = require("express");
const router = new express.Router();
const Blog = require("../models/blog");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/updateblog", auth, async (req, res) => {
  try {
    if (req.body.blogId) {
      const blogId = req.body.blogId;
      const updatedHtmlContent = req.body.updatedHtmlContent;
      const updatedHtmlMessage = JSON.stringify(updatedHtmlContent);
      const blog = await Blog.findByIdAndUpdate({
        _id: blogId,
        blogContent: updatedHtmlMessage,
        function(err, success) {
          if (err) throw new Error(err);
        },
      }).exec();
      res.status(200).send({
        code: "200",
        status: "success",
        message: "Blog updated successfully!",
        blog,
      });
    } else throw new Error("Invalid User");
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
