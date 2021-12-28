const express = require("express");
const router = new express.Router();
const validator = require("validator");
const fs = require("fs");
const path = require("path");
const Users = require("../models/user");
var cors = require('cors')

const app = express();
app.use(cors());

app.use(router);

router.post("/signUp/basicInfo", async (req, res) => {
  try {
    if (
      req.body.fullName &&
      validator.isEmail(req.body.email) &&
      validator.isMobilePhone(req.body.contact.toString(), "en-IN") &&
      req.body.DOB &&
      validator.isStrongPassword(req.body.password, {
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
      }) &&
      req.body.confirmPassword
    ) {
      const fullName = req.body.fullName;
      const email = req.body.email;
      const contact = req.body.contact;
      const DOB = req.body.DOB;
      const password = req.body.password;
      const confirmPassword = req.body.confirmPassword;

      const check = await Users.exists({ $or: [{ email }, { contact }] });
      if (check) {
        throw new Error("User already exists!");
      } else {
        const users = new Users({
          fullName,
          email,
          contact,
          DOB,
          password,
        });
        if (password === confirmPassword) {
          await users.save();
          res.status(200).send({
            code: 200,
            status: "Success",
            message: "Basic Information Done!",
            id: users._id,
          });
        } else throw new Error("Check Your Password!");
      }
    } else throw new Error("Enter all the required fields properly!");
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      code: 400,
      status: "Failed",
      message: error.message,
    });
  }
});

router.post("/signUp/personalInfo", async (req, res) => {
  try {
    var topics = [
      "Technology",
      "Music",
      "Self-Help-Therapies",
      "Travel",
      "Food",
      "Finance",
      "Beauty",
      "Poetry",
      "Mythology & History",
      "Politics",
    ];
    if (req.body.id) {
      var users = await Users.findById(req.body.id);
      //console.log(users);
      let userName;
      const { generateUsername } = require("../controller/functional");
      if (req.body.userName) {
        userName = req.body.userName;
      } else userName = await generateUsername(Users, users.fullName, 100);

      var myTopics;
      if (req.body.myTopics) {
        let result;
        req.body.myTopics.forEach((topic) => {
          if (topics.includes(topic)) {
            result = true;
          }
        });
        const unique = new Set(req.body.myTopics);
        if (result && unique && req.body.myTopics.length <= 3) {
          myTopics = req.body.myTopics;
        } else throw new Error("You may select 3 or less than 3 topics only !");
      } else myTopics = undefined;

      var bio;
      if (req.body.bio) {
        bio = req.body.bio;
      } else bio = undefined;
      var statusDetails = await users.genVerificationDetails();
      if (users) {
        users.userName = userName;
        users.myTopics = myTopics;
        users.bio = bio;
        users.emailVerification.verificationTime = statusDetails.time;
        users.emailVerification.verificationCode = statusDetails.code;
      }
      const to = users.email;
      const subject = "Verify Your Email!";
      const mailOptions = {
        name: users.fullName,
        verifyLink: `http://localhost:3000/verifyemail/${to}?verifycode=${statusDetails.code}`,
      };
      const { mail } = require("../controller/functional");
      await mail(to, subject, mailOptions);
      await users.save();
      res.status(200).send({
        code: 200,
        status: "Success",
        message: "User Successfully Signed-UP!",
        username: users.userName,
      });
    } else throw new Error("Something went wrong!");
  } catch (error) {
    console.log("error", error);
    res.status(400).send({
      code: 400,
      status: "Failed",
      message: error.message,
    });
  }
});

router.get("/verifyemail/:email", async (req, res) => {
  const email = req.params.email;
  const verifyCode = req.query.verifycode;
  const param = req.query.param; // to identify forget pwd or signup
  const check = validator.isEmail(email);
  try {
    if (check){
      const user = await Users.findOne({ email }).exec();
      const time = user.emailVerification.verificationTime;
      if (
        Date.now() <= time &&
        verifyCode === user.emailVerification.verificationCode
      ) {
        user.emailVerification.verificationStatus = "verified";
        user.emailVerification.verificationTime = undefined;
        user.emailVerification.verificationCode = undefined;
        await user.save();
        if (!param) {
          res.status(200).send("E-mail successfully verified");
        } else if (param === "forgetpassword") {
          fs.readFile("./public/index.html", "utf-8", (err, data) => {
            if (data) {
              let fileData = data.toString().replace("userEmail", user.email);
              res.status(200).send(fileData);
            } else throw new Error("fileData");
          });
        } else throw new Error("Oops! Something went wrong.");
      } else if (Date.now() > time) {
        user.emailVerification.verificationTime = undefined;
        user.emailVerification.verificationCode = undefined;
        await user.save();
        throw new Error("Session Expired");
      } else {
        throw new Error("Invalid Link");
      }
    } else throw new Error("Please send email");
  } catch (error) {
    res.status(400).send({
      code: 400,
      status: "Failed",
      message: error.message,
    });
    console.log("error", error);
  }
});

router.get("/logo", (req, res) => {
  const { join } = require("path");
  res.sendFile(join(__dirname, "../../public/logo.jpg"));
});

module.exports = router;
