const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.post("/addfollowinfo", auth, async (req, res) => {
  try {
    if (req.body.userIdOne && req.body.userIdTwo) {
      const userIdOne = req.body.userIdOne;
      const userIdTwo = req.body.userIdTwo;
      const user1 = await User.findById({ _id: userIdOne }).exec();
      const user2 = await User.findById({ _id: userIdTwo }).exec();
      if (user1 && user2) {
        const userCheck = user1.followers.includes(user2.userName);
        if (userCheck) {
          user1.followers.push(user2.userName);
          user2.following.push(user1.userName);
          await user1.save();
          await user2.save();
          res.status(200).send({
            code: 200,
            status: "success",
            message: `${user2} strated following ${user1}.`,
          });
        } else {
          const index1 = user1.followers.indexOf(user2.userName);
          const index2 = user2.following.indexOf(user1.userName);
          user1.followers.splice(index1, 1);
          user2.following.splice(index2, 1);
          await user1.save();
          await user2.save();
          res.status(200).send({
            code: 200,
            status: "success",
            message: `${user2} unfollowed ${user1}.`,
          });
        }
      } else throw new Error("User does not exists. Enter correct user id!");
    } else throw new Error("Give Full Information!");
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
