process.env.NODE_TLS_REJECT_UNAUTHORIZED='0'

const env = require("dotenv");
env.config();
const express = require("express");
require("./config/db");
const signUp = require("./app/routes/signUp");
const userRoute = require("./app/routes/userName");
const loginRoute = require("./app/routes/login");
const forgetPassword = require("./app/routes/forgotPassword");
const addBlog = require("./app/routes/addBlog");
const deleteBlog = require("./app/routes/deleteBlog");
const updateBlog = require("./app/routes/updateBlog");
const addComment = require("./app/routes/addComment");
const deleteComment = require("./app/routes/deleteComment");
const countLikes = require("./app/routes/likes");
const addFollowInfo = require("./app/routes/addFollowInfo");
const showFollowInfo = require("./app/routes/showFollowInfo");
const myBlogs = require("./app/routes/myBlogs");
const readBlogs = require("./app/routes/readBlogs");
const feedBlogs = require("./app/routes/feedBlogs");
const bodyParser = require("body-parser");
const PORT = process.env.SERVER_PORT;
const app = express();
app.use(express.json()); 
app.use(express.json({ limit: "1mb" }));
var cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(signUp);
app.use(userRoute);
app.use(loginRoute);
app.use(forgetPassword);
app.use(addBlog);
app.use(deleteBlog);
app.use(updateBlog);
app.use(addComment);
app.use(deleteComment);
app.use(countLikes);
app.use(addFollowInfo);
app.use(showFollowInfo);
app.use(myBlogs);
app.use(readBlogs);
app.use(feedBlogs);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

// C:/Users/LATIKA/MongoDB/bin/mongod.exe --dbpath=C:/Users/LATIKA/MongoDB-Data

