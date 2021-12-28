const express = require("express");
const router = new express.Router();
const validator = require("validator");
const Users = require("../models/user");
const app = express();
app.use(router);

router.post("/forgetpassword/emaillink", async (req, res) => {
  try {
    // const filepath = path.join(__dirname, '..', '../')
    if (req.body.email) {
      const email = req.body.email;
      const user = await Users.findOne({ email });
      var statusDetails = await user.genVerificationDetails();
      user.emailVerification.verificationTime = statusDetails.time;
      user.emailVerification.verificationCode = statusDetails.code;
      const to = user.email;
      const subject = "Before Login Please Verify Your Email!";
      const mailOptions = {
        name: user.fullName,
        verifyLink: `http://localhost:3000/verifyemail/${to}?verifycode=${statusDetails.code}&param=forgetpassword`,
      };
      console.log(mailOptions.verifyLink);
      const {mail} = require("../controller/functional");
      await mail(to, subject, mailOptions);
      await user.save();
      res.status(200).send({
        code: 200,
        status: "success",
        message: "E-mail verification resend successful",
      });
    } else throw new Error("Enter Your Email First!");
  }catch (error){
    console.log(error.message);
  }
});

router.post("/forgetpassword/updatepwd",async (req,res) => {
  try{
    if(req.body.email &&
       req.body.pwd &&
       req.body.cnfpwd
       ){
      const email = req.body.email;
      const password = req.body.pwd;
      const confirmPassword = req.body.cnfpwd;
      const user = await Users.findOne({email}).exec()
      if(user && password === confirmPassword){
        user.password = password
      }else throw new Error("<h1>Match the passwords!</h1>")
      await user.save();
      res.status(200).send(`<h1> Password Updates Successfully. You can now <a href="login.html">login</a></h1>`)
    }else throw new Error("<h1>Oops something went wrong!</h1>")
  }catch(error){
    res.send({
      message : error.message
    })
    console.log(error);
  }
})

module.exports = router;
