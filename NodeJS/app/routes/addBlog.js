const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/addblog", auth, async (req, res) => {
  try {
    if (req.body.userId && req.body.topic && req.body.htmlContent) {
      const user = req.body.userId;
      const userCheck = await User.findById({ _id: user });
      if (userCheck) {
        const topic = req.body.topic;
        const topicCheck = userCheck.myTopics.includes(topic);
        if (topicCheck) {
          const htmlContent = JSON.stringify(req.body.htmlContent);
          const htmlMessage = Buffer.from(htmlContent).toString("base64");
          const blog = new Blog({
            user,
            topic,
            blogContent: htmlMessage,
          });
          const showBlog = {
            user: blog.user,
            topic: blog.topic,
            blogContent: JSON.parse(
              Buffer.from(blog.blogContent, "base64")
            ).toString("ascii"),
          };
          await blog.save();
          res.status(200).send({
            code: "200",
            status: "success",
            message: "Blog Added Successfully!",
            showBlog,
            blogId : blog._id
          });
        } else
          throw new Error(
            "Topic doesn't match your selected at the time of signup"
          );
      } else throw new Error("User Doesn't exists!");
    } else throw new Error("Please enter the required Feilds!");
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
