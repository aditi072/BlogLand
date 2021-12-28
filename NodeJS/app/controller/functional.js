const generateUsername = async (users, fullName, digit) => {
  try {
    const fName = fullName.split(" ")[0];
    const userName = fName + Math.floor(Math.random() * Math.floor(digit));
    var check = await users.exists({ userName });
    if (!check) {
      return userName.toLowerCase();
    } else await generateUsername(users, fName, digit);
  } catch (error) {
    return false;
  }
};

const nodemailer = require("nodemailer");
async function mail(to, subject, { name, verifyLink }) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "acevvv.blog@gmail.com",
      pass: "Indore@123",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "acevvv.blog@gmail.com",
    to, // list of receivers
    subject,
    name,
    html: `<b>Welcome ${name}</b>
        <br>
        <p>To verify your profile please 
        <a href=${verifyLink}>click here</a></p><br>
        <p>Valid for next 10 minutes.</p>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log(info.response);
}

module.exports.generateUsername = generateUsername;
module.exports.mail = mail;
