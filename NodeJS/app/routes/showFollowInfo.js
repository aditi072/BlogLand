const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../controller/auth");
const app = express();
app.use(router);

router.get("/showfollowinfo/:id", auth, async (req, res) => {
  try {
    if (req.params.id) {
      const _id = req.params.id;
      const user = await User.findById({ _id }).exec();
      if (user) {
        const followersCount = user.followers.length;
        const followingCount = user.following.length;
        res.status(200).send({
          code: 200,
          status: "success",
          message: "showing follow info of user",
          followersCount,
          followers: user.followers,
          followingCount,
          following: user.following,
        });
      } else throw new Error("User does not exists!");
    } else throw new Error("Enter id!");
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
