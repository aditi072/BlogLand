const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const Blog = require("../models/blog");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/countlikes", auth, async (req, res) => {
  try {
    if (req.body.blogId && req.body.userName) {
      const userName = req.body.userName;
      const userCheck = await User.exists({ userName });
      if (userCheck) {
        const blog = await Blog.findById({ _id: req.body.blogId }).exec();
        let likesCount;
        const likeCheck = blog.likes.includes(userName);
        if (!likeCheck) {
          blog.likes.push(userName);
          likesCount = blog.likes.length;
          await blog.save();
          res.send({
            code: 200,
            status: "success",
            message: "User liked the Blog!",
            likesCount,
          });
        } else {
          const index = blog.likes.indexOf(userName);
          blog.likes.splice(index, 1);
          likesCount = blog.likes.length;
          await blog.save();
          res.send({
            code: 200,
            status: "success",
            message: "User disliked the Blog!",
            likesCount,
          });
        }
      } else throw new Error("User doesn't exists!");
    } else throw new Error("Incomplete Information.");
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
