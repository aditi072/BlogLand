const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const app = express();
var cors = require('cors')
app.use(cors());
app.use(router);

const generateAuthToken = (id, userName) => {
  //const _id = id.toString()
  const token = jwt.sign({ id, userName }, "thisissoconfusing", {
    expiresIn: "1800s",
  });
  return token;
};

router.post("/login", async (req, res) => {
  try {
    if (req.body.userCredential && req.body.password) {
      const user = await User.findByCredentials(
        req.body.userCredential,
        req.body.password
      );
      const status = user.emailVerification.verificationStatus;
      if (user && status === "verified") {
        const token = generateAuthToken(User._id, User.userName);
        res.status(200).send({
          code: 200,
          status: "success",
          message: `${user.fullName} Login Successful!`,
          token,
          id: user._id,
          userName: user.userName,
        });
      } else if (user && status === "unverified") {
        var statusDetails = await user.genVerificationDetails();
        user.emailVerification.verificationTime = statusDetails.time;
        user.emailVerification.verificationCode = statusDetails.code;
        const to = users.email;
        const subject = "Before Login Please Verify Your Email!";
        const mailOptions = {
          name: usesrs.fullName,
          verifyLink: `https://localhost:2700/verifyemail/${to}?verifycode=${statusDetails.code}`,
        };
        const { mail } = require("../controller/functional");
        await mail(to, subject, mailOptions);
        await user.save();
        res.status(200).send({
          code: 200,
          status: "success",
          message: "E-mail verification resend successful",
        });
      }
    } else throw new Error("Enter proper details!");
  } catch (error) {
    console.log(error);
    res.status(400).send({
      code: 400,
      status: "fail",
      message: error.message,
    });
  }
});

module.exports = router;
