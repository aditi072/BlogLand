const mongoose = require("mongoose");

const blogsSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    topic: String,
    blogContent: String,
    likes: [String],
    comments: [
      {
        whoCommented: String,
        comment: String,
      },
    ],
  },
  { timestamps: true }  
);

const Blog = mongoose.model("blogs", blogsSchema);

module.exports = Blog;
